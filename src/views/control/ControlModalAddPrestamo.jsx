import React from 'react'
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Input
} from '@material-tailwind/react'

const ControlModal = ({
  handleOpen,
  open
}) => {
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
        <Card className='mx-auto w-full max-w-[24rem]'>
          <CardBody className='flex flex-col gap-4'>
            <Input label='nombre' size='lg' />
            <Input type='number' label='cantidad a prestar' size='lg' />
            <Input type='number' label='interes' size='lg' />
          </CardBody>
          <CardFooter className='pt-0'>
            <Button variant='gradient' onClick={handleOpen} fullWidth>
              Registrar prestamo
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  )
}

export default ControlModal
