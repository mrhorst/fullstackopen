import { useQuery } from '@apollo/client/react'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const filteredBooks = books.filter((b) =>
    filter ? b.genres.includes(filter) : b
  )
  const genres = books.map((b) => b.genres).flat()

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setFilter(g)}>
            {g}
          </button>
        ))}
      </div>
      <button onClick={() => setFilter(null)}>reset selection</button>
    </div>
  )
}

export default Books
