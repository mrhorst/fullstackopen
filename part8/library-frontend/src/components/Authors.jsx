import { useQuery, useMutation } from '@apollo/client/react'

import { ALL_AUTHORS } from '../queries'
import { EDIT_BIRTHYEAR } from '../mutations'
import { useState } from 'react'
import { useEffect } from 'react'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateBirthyear setMessage={props.setMessage} />
    </div>
  )
}

const UpdateBirthyear = ({ setMessage }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor, result] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = (e) => {
    e.preventDefault()

    editAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setMessage('could not locate author!')
      setTimeout(() => setMessage(null), 3000)
    }
  }, [result.data, setMessage])

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <label>name</label>
          <input onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div>
          <label>born</label>
          <input
            type='number'
            onChange={(e) => setBorn(Number(e.target.value))}
            value={born}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
