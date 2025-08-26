const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlogWith = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'show form' }).click()
  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)
  await page.getByRole('button', { name: 'add blog' }).click()
  const locator = await page.getByText(`Title:${title} -${author}`)
  return locator
}

const createUser = async (request, url, name, username, password) => {
  await request.post(url, {
    data: {
      name,
      username,
      password,
    },
  })
}

export { loginWith, createBlogWith, createUser }
