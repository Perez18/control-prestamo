import React from 'react'
import {
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogHeader
} from '@material-tailwind/react'

const ControlModalDetalle = ({
  prestamo,
  handleOpen,
  open
}) => {
  return (
    <>
      <Dialog
        size='lg'
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 }
        }}
        className='bg-transparent shadow-none'
      >
        <Card>
          <CardBody>
            <DialogHeader>Prestamo de {prestamo?.nombre}</DialogHeader>
            <DialogBody divider>
              {/* {JSON.stringify(prestamo, null, 2)} */}
              The key to more success is to have a lot of pillows. Put it this way,
              it took me twenty five years to get these plants, twenty five years of
              blood sweat and tears, and I&apos;m never giving up, I&apos;m just
              getting started. I&apos;m up to something. Fan luv.
            </DialogBody>
          </CardBody>
        </Card>
      </Dialog>
    </>
  )
}

export default ControlModalDetalle
