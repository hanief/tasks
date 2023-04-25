import { test, expect } from '@playwright/test';
import db from '~/utils/msw/test.json'

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have header', async ({ page }) => {
    await expect(page.getByRole('heading')).toBeVisible();
    await expect(page.getByRole('heading')).toContainText(/multitask/i);
  });

  // test('should have list of uncomplete tasks', async ({ page }) => {
  //   const uncompleteTasks = db.tasks.filter(task => !task.isDone)
  //   const inputList = page.getByRole('listitem').getByLabel(/task-item-input/i)
  //   await expect(inputList).toHaveCount(uncompleteTasks.length);

  //   const texts = await inputList.evaluateAll<string[], HTMLInputElement>(rows => rows.map(item => item.value))
  //   await expect(texts).toEqual(uncompleteTasks.map(task => task.text));

  //   const toggleCompleteButtonList = page.getByRole('listitem').getByRole('button')
  //   await expect(toggleCompleteButtonList).toHaveCount(uncompleteTasks.length);
  // })

  test('should have add new task input', async ({ page }) => {
    const addNewInput = page.getByPlaceholder(/add new task/i)
    await expect(addNewInput).toHaveCount(1);
    await expect(addNewInput).toBeVisible();
  })

  // test('should be able to add new task', async ({ page }) => {
  //   const uncompleteTasks = db.tasks.filter(task => !task.isDone).map(task => task.text)
  //   const inputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
  //   await expect(inputList).toHaveCount(uncompleteTasks.length);

  //   const addNewInput = await page.getByPlaceholder(/add new task/i)
  //   await addNewInput.fill('New task')

  //   const secondInputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
  //   await expect(secondInputList).toHaveCount(uncompleteTasks.length);

  //   await addNewInput.press('Enter')
  //   await page.waitForLoadState('networkidle')
  //   const thirdInputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
  //   const newUncompleteTasks = [...uncompleteTasks, 'New task']
  //   await expect(thirdInputList).toHaveCount(newUncompleteTasks.length);

  //   const texts = await thirdInputList.evaluateAll<string[], HTMLInputElement>(rows => rows.map(item => item.value))
  //   await expect(texts).toEqual(newUncompleteTasks);
  // })

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

  // test('should have delete button', async ({ page }) => {
  //   const editButton = await page.getByText(/edit/i)
  //   await editButton.click()

  //   const uncompleteTasks = db.tasks.filter(task => !task.isDone).map(task => task.text)

  //   const deleteButtons = await page.getByLabel(/delete-button/i)
  //   await expect(deleteButtons).toHaveCount(uncompleteTasks.length);
  //   await expect(deleteButtons.first()).toBeVisible();
  // })

  // test('should be able to delete task', async ({ page }) => {
  //   const editButton = await page.getByText(/edit/i)
  //   await editButton.click()

  //   const uncompleteTasks = db.tasks.filter(task => !task.isDone).map(task => task.text)

  //   const deleteButtons = await page.getByLabel(/delete-button/i)
  //   await expect(deleteButtons).toHaveCount(uncompleteTasks.length);

  //   await deleteButtons.first().click()

  //   const secondDeleteButtons = await page.getByLabel(/delete-button/i)
  //   await expect(secondDeleteButtons).toHaveCount(uncompleteTasks.length - 1);
  // })

  // test('should be able to update task', async ({ page }) => {
  //   const uncompleteTasks = db.tasks.filter(task => !task.isDone).map(task => task.text)

  //   const inputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
  //   await expect(inputList).toHaveCount(uncompleteTasks.length);

  //   const texts = await inputList.evaluateAll<string[], HTMLInputElement>(rows => rows.map(item => item.value))
  //   await expect(texts).toEqual(uncompleteTasks);

  //   await inputList.first().fill('Updated task')

  //   const secondInputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
  //   const newUncompleteTasks = [...uncompleteTasks]
  //   newUncompleteTasks[0] = 'Updated task'
  //   await expect(secondInputList).toHaveCount(newUncompleteTasks.length);

  //   const secondTexts = await secondInputList.evaluateAll<string[], HTMLInputElement>(rows => rows.map(item => item.value))
  //   await expect(secondTexts).toEqual(newUncompleteTasks);
  // })
})