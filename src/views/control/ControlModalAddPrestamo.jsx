import React from 'react'
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Input
} from '@material-tailwind/react'
import { useForm } from '../../hooks/useForm'
import { usePrestamo } from '../../store'

const ControlModalAddPrestamo = ({
  handleOpen,
  open
}) => {
  const postPrestamo = usePrestamo(state => state.postPrestamo)

  const { values, handleInputChange } = useForm({
    nombre: ' ',
    prestamo: 0,
    interes: 0
  })

  const { nombre, prestamo, interes } = values

  const submitAddPrestamo = (e) => {
    e.preventDefault()
    console.log({ nombre, prestamo, interes })
    postPrestamo({ nombre, prestamo, interes })
  }

  return (
    <>
      <Dialog
        size='xs'
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 }
        }}
        className='bg-transparent shadow-none'
      >
        <form onSubmit={submitAddPrestamo}>
          <Card className='mx-auto w-full max-w-[24rem]'>
            <CardBody className='flex flex-col gap-4'>
              <Input type='text' name='nombre' value={nombre} onChange={handleInputChange} label='Nombre' size='lg' />
              <Input type='number' name='prestamo' value={prestamo} onChange={handleInputChange} label='Cantidad a prestar' size='lg' />
              <Input type='number' name='interes' value={interes} onChange={handleInputChange} label='Interes' size='lg' />
            </CardBody>
            <CardFooter className='pt-0'>
              <Button type='submit' variant='gradient' onClick={handleOpen} fullWidth>
                Registrar prestamo
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  )
}

export default ControlModalAddPrestamo
