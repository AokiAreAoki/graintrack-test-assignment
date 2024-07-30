import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useSignIn } from '../hooks/useSignIn'
import { useCallback } from 'react'
import { Loading } from '../components/Loading'

export const Route = createLazyFileRoute('/login')({
  component: Login,
})

function Login() {
  const navigate = useNavigate()

  const {
    loading,
    username,
    onUsernameChange,
    password,
    onPasswordChange,
    signUp,
    signIn,
    error,
  } = useSignIn()

  const signInAndNav = useCallback(async () => {
    if (await signIn()) {
      navigate({ to: '/' })
    }
  }, [signIn, navigate])

  const signUpAndNav = useCallback(async () => {
    if (await signUp()) {
      navigate({ to: '/' })
    }
  }, [signUp, navigate])

  return (
    <div className='flex flex-col gap-2 min-w-32'>
      <input className='border border-solid border-black focus:outline-double' type='email' value={username} onChange={onUsernameChange} />
      <input className='border border-solid border-black focus:outline-double' type='password' value={password} onChange={onPasswordChange} />

      <div className='flex flex-row justify-between gap-2'>
        <button onClick={signUpAndNav} disabled={loading}>Sign Up</button>
        <button onClick={signInAndNav} disabled={loading}>Sign In</button>
      </div>

      {loading && (
        <div className='text-sky-600'>
          <Loading />
        </div>
      )}

      {(error && !loading) && (
        <div className='text-red-600'>{error}</div>
      )}
    </div>
  )
}
