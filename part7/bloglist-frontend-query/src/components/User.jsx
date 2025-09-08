import { useQueryClient, useQuery } from '@tanstack/react-query'
import { getUsers } from '../requests'

const User = () => {
  const queryClient = useQueryClient()
  const query = useQuery({
    // initialData: [],
    queryKey: ['users'],
    queryFn: getUsers,
  })

  const users = query.data

  console.log(users)
  return <div>User</div>
}

export default User
