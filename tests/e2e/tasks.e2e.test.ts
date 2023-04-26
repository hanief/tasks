import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/tasks', route => {
      route.fulfill({
        json: []
      })
    })

    await page.addInitScript(() => {
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('tasks')
    });

    await page.goto('/')
  })

  async function addNewTask(page: Page, text: string = 'New task', isDone: boolean = false) {
    const addNewInput = await page.getByPlaceholder(/add new task/i)
    await expect(addNewInput).toHaveValue('')
    await addNewInput.fill(text)
    await addNewInput.press('Enter')

    if (isDone) {
      const listItem = await page
        .getByRole('listitem', { name: 'task-item' })
        .last()
      const toggleButton = listItem.getByRole('button', { name: 'toggle-button' })
      await expect(toggleButton).toBeVisible()
      await toggleButton.click()
    }

    await page.waitForLoadState('networkidle')
  }

  test('should have header', async ({ page }) => {
    await expect(page.getByRole('heading')).toBeVisible()
    await expect(page.getByRole('heading')).toContainText(/multitask/i)
  })

  test('should be able to add new task', async ({ page }) => {
    const addNewInput = page.getByPlaceholder(/add new task/i)
    await expect(addNewInput).toHaveCount(1)
    await expect(addNewInput).toBeVisible()

    let inputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
    await expect(inputList).toHaveCount(0)

    await addNewTask(page)

    inputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
    await expect(inputList).toHaveCount(1)
    await expect(page.getByPlaceholder(/add new task/i)).toHaveValue('')

    await addNewTask(page)

    inputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
    await expect(inputList).toHaveCount(2)
    await expect(page.getByPlaceholder(/add new task/i)).toHaveValue('')
  })

  test('should be able to see list of tasks', async ({ page }) => {
    await addNewTask(page, 'Task 1')
    await addNewTask(page, 'Task 2')
    await addNewTask(page, 'Task 3', true)

    const inputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
    await expect(inputList).toHaveCount(2)

    const texts = await inputList.evaluateAll<string[], HTMLInputElement>(rows => rows.map(item => item.value))
    await expect(texts).toEqual(['Task 1', 'Task 2'])

    const toggleCompleteButtonList = await page.getByRole('listitem').getByRole('button')
    await expect(toggleCompleteButtonList).toHaveCount(2)
  })

  test('should be able to toggle complete, show and hide completed tasks', async ({ page }) => {
    await addNewTask(page, 'Task 1')
    await addNewTask(page, 'Task 2')
    await addNewTask(page, 'Task 3', true)

    let inputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
    await expect(inputList).toHaveCount(2)

    let toggleCompletedButtons = await page.getByRole('button', { name: /toggle-button/i })
    await toggleCompletedButtons.first().click()

    inputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
    await expect(inputList).toHaveCount(1)

    let showCompletedButton = page.getByText(/show completed/i)
    await expect(showCompletedButton).toBeVisible()
    await showCompletedButton.click()

    inputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
    await expect(inputList).toHaveCount(3)

    const hideCompletedButton = page.getByText(/hide completed/i)
    await expect(hideCompletedButton).toBeVisible()
    await hideCompletedButton.click()

    inputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
    await expect(inputList).toHaveCount(1)

    showCompletedButton = page.getByText(/show completed/i)
    await expect(showCompletedButton).toBeVisible()
  })

  test('should be able to delete task', async ({ page }) => {
    await addNewTask(page, 'Task 1')
    await addNewTask(page, 'Task 2')
    await addNewTask(page, 'Task 3', true)
    await addNewTask(page, 'Task 4', true)

    const editButton = await page.getByText(/edit/i)
    await expect(editButton).toHaveCount(1)
    await expect(editButton).toBeVisible()
    await editButton.click()

    const doneButton = await page.getByText(/done/i)
    await expect(doneButton).toHaveCount(1)
    await expect(doneButton).toBeVisible()

    let deleteButtons = await page.getByRole('button', { name: /delete-button/i })
    await expect(deleteButtons).toHaveCount(2)

    await deleteButtons.last().click()

    deleteButtons = await page.getByRole('button', { name: /delete-button/i })
    await expect(deleteButtons).toHaveCount(1)

    let showCompletedButton = page.getByText(/show completed/i)
    await showCompletedButton.click()
    deleteButtons = await page.getByRole('button', { name: /delete-button/i })
    await expect(deleteButtons).toHaveCount(3)

    await deleteButtons.last().click()

    deleteButtons = await page.getByRole('button', { name: /delete-button/i })
    await expect(deleteButtons).toHaveCount(2)

    doneButton.click()
    deleteButtons = await page.getByRole('button', { name: /delete-button/i })
    await expect(deleteButtons).toHaveCount(0)
  })

  test('should be able to update task', async ({ page }) => {
    await addNewTask(page, 'Task 1')
    await addNewTask(page, 'Task 2')
    await addNewTask(page, 'Task 3', true)
    await addNewTask(page, 'Task 4', true)

    let inputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
    await expect(inputList).toHaveCount(2)

    let texts = await inputList.evaluateAll<string[], HTMLInputElement>(rows => rows.map(item => item.value))
    await expect(texts).toEqual(['Task 1', 'Task 2'])

    const firstInput = await inputList.first()
    await firstInput.fill('Updated Task 1')
    await firstInput.press('Enter')

    inputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
    await expect(inputList).toHaveCount(2)

    texts = await inputList.evaluateAll<string[], HTMLInputElement>(rows => rows.map(item => item.value))
    await expect(texts).toEqual(['Updated Task 1', 'Task 2'])

    let showCompletedButton = page.getByText(/show completed/i)
    await showCompletedButton.click()

    inputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
    await expect(inputList).toHaveCount(4)

    texts = await inputList.evaluateAll<string[], HTMLInputElement>(rows => rows.map(item => item.value))
    await expect(texts).toEqual(['Updated Task 1', 'Task 2', 'Task 3', 'Task 4'])

    const lastInput = await inputList.last()
    await lastInput.fill('Updated Task 4')
    await lastInput.press('Enter')

    inputList = await page.getByRole('listitem').getByLabel(/task-item-input/i)
    await expect(inputList).toHaveCount(4)

    texts = await inputList.evaluateAll<string[], HTMLInputElement>(rows => rows.map(item => item.value))
    await expect(texts).toEqual(['Updated Task 1', 'Task 2', 'Task 3', 'Updated Task 4'])
  })
})