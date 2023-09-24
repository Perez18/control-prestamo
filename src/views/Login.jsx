import React from 'react'
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography
} from '@material-tailwind/react'
import { useForm } from '../hooks/useForm'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const { values, handleInputChange } = useForm({
    user: '',
    password: ''
  })
  const navigate = useNavigate()

  const { user, password } = values

  const submit = (e) => {
    e.preventDefault()
    if (user.toUpperCase() === import.meta.env.VITE_USER.toUpperCase() && password === import.meta.env.VITE_PASS) {
      navigate(`/prestamos/${import.meta.env.VITE_HASH_PERMITIDO}`)
    } else {
      // eslint-disable-next-line no-undef
      alert('password invalida')
    }
  }

  return (
    <section className='flex justify-center items-center h-screen'>
      <Card className='w-96 shadow-2xl'>
        <CardBody className='flex flex-col gap-4'>
          {import.meta.env.VITE_TEST}
          <form className='mt-12 flex flex-col gap-4' onSubmit={submit}>
            <Typography variant='h3' color='blue-gray' className='p-3'>
              Control Préstamo Arias
            </Typography>
            <div className='mb-4 flex flex-col gap-6'>
              <Input type='text' name='user' value={user} onChange={handleInputChange} size='lg' label='Usuario' />
              <Input type='password' size='lg' name='password' value={password} onChange={handleInputChange} label='contraseña' />
            </div>
            <Button type='submit' className='mt-6' fullWidth>
              Iniciar Sesión
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  )
}
