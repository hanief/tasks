import { test, expect } from '@playwright/test';
import db from '~/mocks/test.json'

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/tasks', route => {
      if (route.request().method() === 'GET') {
        route.fulfill({ json: db.tasks })
      } else if (route.request().method() === 'POST') {
        const task = JSON.parse(route.request().postData() as string)
        const json = { ...task, id: db.tasks.length + 1 }
        route.fulfill({ json })
      } else {
        route.continue();
      }
    })
    await page.goto('/');
  });

  test('should have header', async ({ page }) => {
    await expect(page.getByRole('heading')).toBeVisible();
    await expect(page.getByRole('heading')).toContainText(/tasks/i);
  });

  test('should have list of uncomplete tasks', async ({ page }) => {
    const uncompleteTasks = db.tasks.filter(task => !task.isDone)
    const inputList = page.getByRole('listitem').getByLabel(/task-item-input/i)
    await expect(inputList).toHaveCount(uncompleteTasks.length);

    const texts = await inputList.evaluateAll<string[], HTMLInputElement>(rows => rows.map(item => item.value))
    await expect(texts).toEqual(uncompleteTasks.map(task => task.text));

    const toggleCompleteButtonList = page.getByRole('listitem').getByRole('button')
    await expect(toggleCompleteButtonList).toHaveCount(uncompleteTasks.length);
  })

  test('should have add new task input', async ({ page }) => {
    const addNewInput = page.getByPlaceholder(/add new task/i)
    await expect(addNewInput).toHaveCount(1);
    await expect(addNewInput).toBeVisible();
  })

  test('should be able to add new task', async ({ page }) => {
    const uncompleteTasks = db.tasks.filter(task => !task.isDone).map(task => task.text)
    const inputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
    await expect(inputList).toHaveCount(uncompleteTasks.length);

    const addNewInput = await page.getByPlaceholder(/add new task/i)
    await addNewInput.fill('New task')

    const secondInputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
    await expect(secondInputList).toHaveCount(uncompleteTasks.length);

    await addNewInput.press('Enter')
    await page.waitForLoadState('networkidle')
    const thirdInputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
    const newUncompleteTasks = [...uncompleteTasks, 'New task']
    await expect(thirdInputList).toHaveCount(newUncompleteTasks.length);

    const texts = await thirdInputList.evaluateAll<string[], HTMLInputElement>(rows => rows.map(item => item.value))
    await expect(texts).toEqual(newUncompleteTasks);
  })

  test('should have show completed button', async ({ page }) => {
    const showCompletedButton = page.getByText(/show completed/i)
    await expect(showCompletedButton).toHaveCount(1);
    await expect(showCompletedButton).toBeVisible();
  })

  test('should have edit button', async ({ page }) => {
    const editButton = page.getByText(/edit/i)
    await expect(editButton).toHaveCount(1);
    await expect(editButton).toBeVisible();
  })
})