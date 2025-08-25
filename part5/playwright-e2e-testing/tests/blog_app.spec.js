const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3000/api/testing/reset')
    await request.post('http://localhost:3000/api/users', {
      data: {
        name: 'root user',
        username: 'root',
        password: 'password',
      },
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('log in to application')
    const usernameInput = page.getByLabel('username')
    const passwordInput = page.getByLabel('password')
    const btnLocator = page.getByRole('button')
    await expect(locator).toBeVisible()
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(btnLocator).toBeVisible()
  })

  describe('Login', () => {
    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'wrong')
      const errorDiv = page.locator('.failure')
      await expect(errorDiv).toContainText('invalid username or password')
    })

    test('succeed with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'password')
      const successDiv = page.locator('.success')
      await expect(successDiv).toContainText('Welcome, root user!')
    })
  })
})
