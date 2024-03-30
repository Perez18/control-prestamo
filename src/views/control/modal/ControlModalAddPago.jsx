import React from 'react'
import { useForm } from '../../../hooks/useForm'
import { Button, Card, CardBody, CardFooter, Dialog, DialogHeader, Input } from '@material-tailwind/react'
import { usePrestamo } from '../../../store'

const ControlModalPago = ({
  pagos,
  prestamo,
  handleOpen,
  open
}) => {
  const { values, handleInputChange } = useForm({
    montopagar: 0
  })

  const postPago = usePrestamo(state => state.postPago)

  const { montopagar } = values

  const submitAddPago = (e) => {
    e.preventDefault()
    postPago({ idPrestamo: prestamo.id, montopagar, ...prestamo })
    handleOpen()
  }

  return (
    <div>
      <Dialog
        size='sm'
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 }
        }}
        className='bg-transparent shadow-none'
      >
        <form onSubmit={submitAddPago}>
          <Card className='mx-auto w-full max-w-[24rem]'>
            <CardBody className='flex flex-col gap-4'>
              <DialogHeader className='text-center p-0 m-0'>
                Prestamo de {prestamo?.nombre}
              </DialogHeader>
              <h1 className='text-base text-center'>Monto pendiente:
                {parseFloat(prestamo?.deuda_pendiente).toFixed(2)}
              </h1>
              <Input
                type='number'
                name='montopagar'
                value={montopagar}
                onChange={handleInputChange}
                label='Cantidad a pagar'
                size='lg'
                // min={0.01}
                max={prestamo?.deuda_pendiente}
              />
            </CardBody>
            <CardFooter className='pt-0'>
              <Button type='submit' variant='gradient' color='green' fullWidth>
                Añadir pago
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </div>
  )
}

export default ControlModalPago
