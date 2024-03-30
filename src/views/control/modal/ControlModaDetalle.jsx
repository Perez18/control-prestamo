/* eslint-disable camelcase */
import React from 'react'
import {
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogHeader
} from '@material-tailwind/react'
import { getFecha } from '../../../helpers'
// import dayjs from 'dayjs'

const ControlModalDetalle = ({
  prestamo,
  pagos,
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
            <DialogBody className='h-full w-full overflow-scroll' divider>
              <div className='flex justify-center gap-16'>
                <p className='text-lg font-bold'>Deuda pendiente : {parseFloat(prestamo?.deuda_pendiente || 0).toFixed(2)}</p>
                <p className='text-lg font-bold'>Ganancias : {parseFloat(prestamo?.ganancia || 0).toFixed(2)}</p>
              </div>
              <br />
              <div className='flex justify-center'>
                <div>
                  <h1 className='text-lg font-bold'>Historial de pagos</h1>
                </div>
              </div>
              <table className='mt-4 w-full min-w-max table-auto text-left'>
                <thead>
                  <tr>
                    <th
                      className='cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'
                    ># Pago
                    </th>
                    <th
                      className='cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'
                    >Monto pagado
                    </th>
                    <th
                      className='cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'
                    >Fecha
                    </th>
                  </tr>

                </thead>
                <tbody>
                  {
                      // eslint-disable-next-line camelcase
                      pagos?.map(({ monto, fecha_creacion }, index) => (
                        <tr key={index}>
                          <td key={index} className='p-4 border-b border-blue-gray-50'>
                            {index + 1}
                          </td>
                          <td key={index} className='p-4 border-b border-blue-gray-50'>
                            {parseFloat(monto).toFixed(2)}
                          </td>
                          <td className='p-4 border-b border-blue-gray-50'>
                            {getFecha(fecha_creacion.toDate())}
                          </td>
                        </tr>
                      ))
                    }
                </tbody>
              </table>
              {/* <Button>Anadir pago</Button> */}
              <br />
              {/* {JSON.stringify(prestamo, null, 2)} */}

            </DialogBody>
          </CardBody>
        </Card>
      </Dialog>
    </>
  )
}

export default ControlModalDetalle
