import { createLazyFileRoute } from '@tanstack/react-router'
import { useUser } from '../hooks/useUser'
import { Loading } from '../components/Loading'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { loading, user } = useUser()

  return (
    <div className="p-2">
      <h3>{loading
        ? <Loading />
        : `Welcome, ${user?.username || 'Guest'}!`
      }</h3>
    </div>
  )
}
