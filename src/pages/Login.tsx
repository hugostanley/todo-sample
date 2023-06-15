import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { globals } from '../config/globals';
import Button from '../components/Button';
import Input from '../components/Input';
import { Label } from '../components/Label';

export interface UserDetails {
  email: string;
  username: string;
  password: string;
  id: string;
}

export default function Login() {
  const [loginDetails, setLoginDetails] = useState<Pick<UserDetails, "email" | "password">>({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  function handleInputOnChange(key: keyof UserDetails, value: string) {
    setLoginDetails(state => {
      return { ...state, [`${key}`]: value }
    })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const users: UserDetails[] = JSON.parse(localStorage.getItem("users") || "false")

    if (users) {
      const existingUser = users.find(user => user.email === loginDetails.email)
      if (existingUser) {
        const isPasswordCorrect = existingUser.password === loginDetails.password
        if (isPasswordCorrect) {
          alert('Login successful')
          localStorage.setItem('isLoggedIn', "true")
          localStorage.setItem('currentUser', JSON.stringify(existingUser))
          navigate('/')
        } else {
          alert('Password is incorrect')
        }
      } else {
        alert('User email not existing')
      }
    } else {
      alert('No users registered, please create one')
      navigate(globals.FE_ENDPOINTS.REGISTER)
    }

    setLoginDetails({
      email: "",
      password: ""
    })
  }


  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='w-[375px]'>
        <section className='w-[80%]'>
          <h1 className='text-4xl font-bold'>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col py-2'>
              <Label htmlFor='email-login'>Email</Label>
              <Input id="email-login" type="email" value={loginDetails.email} onChange={e => handleInputOnChange("email", e.target.value)} />
            </div>

            <div className='flex flex-col py-2'>
              <Label htmlFor='password-login'>Password</Label>
              <Input id="password-login" type="password" value={loginDetails.password} onChange={e => handleInputOnChange("password", e.target.value)} />
            </div>
            <Button type='submit' className='mt-2'>Login</Button>
          </form>
          <p className='text-sm italic mt-5'>
            Don't have an account yet?
            <Link to={globals.FE_ENDPOINTS.REGISTER} className='text-indigo-700'> Create an account</Link>.
          </p>
        </section>
      </div>
    </div>
  )
}
