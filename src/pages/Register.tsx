import { FormEvent, useState } from 'react'
import { UserDetails } from './Login'
import generateId from '../utils/generateId'
import { Link, useNavigate } from 'react-router-dom'
import { globals } from '../config/globals'
import { Label } from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Register() {
  const [newUser, setNewUser] = useState<UserDetails>({
    id: "",
    email: '',
    password: '',
    username: "",
  })
  const navigate = useNavigate()

  function handleInputOnChange(key: keyof UserDetails, value: string) {
    setNewUser(state => {
      return { ...state, [`${key}`]: value }
    })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newId = generateId("user")
    const users: UserDetails[] | null = JSON.parse(localStorage.getItem("users") || "null")

    if (users) {
      localStorage.setItem("users", JSON.stringify([...users, { ...newUser, id: newId }]))
    } else {
      localStorage.setItem("users", JSON.stringify([{ ...newUser, id: newId }]))
    }

    setNewUser({
      id: "",
      email: '',
      password: '',
      username: "",
    })

    navigate(globals.FE_ENDPOINTS.LOGIN)
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='w-[375px]'>
        <section className='w-[80%]'>
          <h1 className='text-4xl font-bold'>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col py-2'>
              <Label htmlFor='username-register'>Username</Label>
              <Input id='username-register' type="text" value={newUser.username} onChange={e => handleInputOnChange("username", e.target.value)} />
            </div>
            <div className='flex flex-col py-2'>
              <Label htmlFor='email-register'>Email</Label>
              <Input id='email-register' type="email" value={newUser.email} onChange={e => handleInputOnChange("email", e.target.value)} />
            </div>
            <div className='flex flex-col py-2'>
              <Label htmlFor='password-register'>Password</Label>
              <Input id='password-register' type="password" value={newUser.password} onChange={e => handleInputOnChange("password", e.target.value)} />
            </div>
            <Button type='submit' className='mt-2'>Sign up</Button>
          </form>
          <p className='text-sm italic mt-5'>
            Already have an account?
            <Link to={globals.FE_ENDPOINTS.LOGIN} className='text-indigo-700'> Login</Link>.
          </p>
        </section>
      </div>
    </div>
  )
}
