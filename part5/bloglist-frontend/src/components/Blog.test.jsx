import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('blog renders only author and title by default', () => {
  const blog = {
    id: 1,
    author: 'Test1 author',
    title: 'Test1 title',
    url: 'Test1 url',
    user: '123',
  }

  const user = {
    token: 'dummy',
    name: 'dummy user',
    id: '123',
  }

  render(<Blog blogs={[blog]} user={user} />)

  const element = screen.getByText('Test1 author', { exact: false })
  const element2 = screen.getByText('Test1 title', { exact: false })
  const element3 = screen.queryByText('Test1 url', { exact: false })
  const element4 = screen.queryByText('likes', { exact: false })
  expect(element).toBeDefined()
  expect(element2).toBeDefined()
  expect(element3).toBeNull()
  expect(element4).toBeNull()
})
