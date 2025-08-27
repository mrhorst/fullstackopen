import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    dispatch(setFilter(e.target.value))
  }

  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
