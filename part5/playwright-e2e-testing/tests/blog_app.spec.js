const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'password')
    })

    test('a new blog can be created', async ({ page }) => {
      const locator = await createBlog(
        page,
        'my title',
        'my author',
        'myurl.com'
      )
      await expect(locator).toBeVisible()
    })

    test('the blog created can be liked', async ({ page }) => {
      await createBlog(page, 'my title', 'my author', 'myurl.com')
      await page.getByRole('button', { name: 'show info' }).click()
      await expect(page.getByText('Likes: 0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('Likes: 1')).toBeVisible()
    })

    test('user can delete their own blogs', async ({ page }) => {
      await createBlog(
        page,
        'will be deleted',
        'deleted author',
        'mydeletedurl.com'
      )
      await page.getByRole('button', { name: 'show info' }).click()
      await expect(page.getByText('User: root user')).toBeVisible()

      page.once('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm')
        expect(dialog.message()).toBe(
          'remove blog will be deleted by deleted author ?'
        )
        await dialog.accept()
      })

      await page.getByRole('button', { name: 'delete' }).click()
      await expect(
        page.getByText('blog will be deleted deleted successfully')
      ).toBeVisible()
    })
  })
})
