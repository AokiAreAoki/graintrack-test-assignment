import { createLazyFileRoute } from '@tanstack/react-router'
import { Navigate } from '@tanstack/react-router'
import { useUser } from '../hooks/useUser'
import { useMemo } from 'react'
import { Loading } from '../components/Loading'
import useSession from '../hooks/useSession'

export const Route = createLazyFileRoute('/profile')({
  component: Profile
})

function Profile() {
  const { isLoggedIn } = useSession()
  const { loading, user } = useUser()

  const content = useMemo(() => {
    if (loading || !user) {
      return <Loading />
    }

    return (
      <>
        <div>Hello, {user.username}</div>
        <div>Username: {user.username}</div>
      </>
    )
  }, [loading, user])

  if (!isLoggedIn) {
    return <Navigate to='/login' />
  }

  return (
    <div className='flex flex-col p-4'>
      {content}
    </div>
  )
}
