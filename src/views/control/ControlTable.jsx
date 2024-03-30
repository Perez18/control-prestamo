/* eslint-disable camelcase */
import React from 'react'
import {
  ChevronUpDownIcon,
  TrashIcon,
  // CurrencyDollarIcon,
  TableCellsIcon,
  // PlusCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import {
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Spinner
} from '@material-tailwind/react'
import { usePrestamo } from '../../store'
import dayjs from 'dayjs'
import { getFecha, redondearNumero } from '../../helpers'
import ControlModalDetalle from './modal/ControlModaDetalle'
import ControlModalPago from './modal/ControlModalAddPago'

const headers = ['Nombre', 'Prestado', 'interes', 'deuda pendiente', 'pagada', 'ganacia', 'estado', 'fecha hora', 'Opciones']
const rows = [
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
    name: 'John Michael',
    email: 'john@creative-tim.com',
    job: 'Manager',
    org: 'Organization',
    online: true,
    date: '23/04/18'
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg',
    name: 'Alexa Liras',
    email: 'alexa@creative-tim.com',
    job: 'Programator',
    org: 'Developer',
    online: false,
    date: '23/04/18'
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg',
    name: 'Laurent Perrier',
    email: 'laurent@creative-tim.com',
    job: 'Executive',
    org: 'Projects',
    online: false,
    date: '19/09/17'
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg',
    name: 'Michael Levi',
    email: 'michael@creative-tim.com',
    job: 'Programator',
    org: 'Developer',
    online: true,
    date: '24/12/08'
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
    name: 'Richard Gran',
    email: 'richard@creative-tim.com',
    job: 'Manager',
    org: 'Executive',
    online: false,
    date: '04/10/21'
  }
]

const ControlTable = () => {
  const loading = usePrestamo(state => state.loading)
  const prestamo = usePrestamo(state => state.prestamo)
  const getFindPrestamo = usePrestamo(state => state.getFindPrestamo)
  const fetchPagos = usePrestamo(state => state.fetchPagos)
  const updateDeletePrestado = usePrestamo(state => state.updateDeletePrestado)

  // state local
  const [findPrestamo, setFindPrestamo] = React.useState(null)
  const [pagos, setPagos] = React.useState(null)

  // modal
  const [openDetalle, setOpenDetalle] = React.useState(false)
  const [openPago, setOpenPago] = React.useState(false)

  // open modal detalle de pagos
  const handleOpenDetalle = async (id) => {
    // find prestamo
    setFindPrestamo(getFindPrestamo(id))

    // pagos
    const data = await fetchPagos(id)
    setPagos(data)

    setOpenDetalle((cur) => !cur)
  }

  // open modal add pagos
  const handleOpenAddPago = (id) => {
    setFindPrestamo(getFindPrestamo(id))
    setOpenPago((cur) => !cur)
  }

  const handleDeletePrestamo = (id) => {
    const nombre = getFindPrestamo(id).nombre
    const resp = window.confirm(`Desea eliminar el prestamo de ${nombre}`)
    if (resp) updateDeletePrestado(id)
  }

  function CustomSpinner () {
    return (
      <Spinner className='h-10 text-gray-900/50' />
    )
  }

  return (
    <>
      <table className='mt-4 w-full min-w-max table-auto text-left'>
        <thead>
          <tr>
            {headers.map((head, index) => (
              <th
                key={head}
                className='cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'
              >
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='flex items-center justify-between gap-2 font-normal leading-none opacity-70'
                >
                  {head}{' '}
                  {index !== head.length - 1 && (
                    <ChevronUpDownIcon strokeWidth={2} className='h-4 w-4' />
                  )}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            !loading
              ? (
                  prestamo.map(
                    ({ id, nombre, deuda_inicial, deuda_capital, deuda_interes, deuda_pendiente, deuda_pagada, ganancias, estado, fecha_creacion }, index) => {
                      const isLast = index === rows.length - 1
                      const classes = isLast
                        ? 'p-4'
                        : 'p-4 border-b border-blue-gray-50'

                      return (
                        <tr key={nombre}>
                          <td className={classes}>
                            <div className='flex items-center gap-3'>
                              <div className='flex flex-col'>
                                <Typography
                                  variant='small'
                                  color='blue-gray'
                                  className='font-normal'
                                >
                                  {nombre}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className='flex flex-col'>
                              <Typography
                                variant='small'
                                color='blue-gray'
                                className='font-bold'
                              >
                                B/ {redondearNumero(deuda_inicial)}
                              </Typography>
                            </div>
                          </td>
                          {/* <td className={classes}>
                            <div className='flex flex-col'>
                              <Typography
                                variant='small'
                                color='orange'
                                className='font-normal'
                              >
                                B/ {redondearNumero(deuda_capital)}
                              </Typography>
                            </div>
                          </td> */}
                          <td className={classes}>
                            <div className='flex flex-col'>
                              <Typography
                                variant='small'
                                color='orange'
                                className='font-normal'
                              >
                                B/ {redondearNumero(deuda_interes)}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className='flex flex-col'>
                              <Typography
                                variant='small'
                                color={deuda_pendiente > 0 ? 'red' : 'green'}
                                className='font-normal'
                              >
                                B/ {redondearNumero(deuda_pendiente)}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className='flex flex-col'>
                              <Typography
                                variant='small'
                                color={deuda_pendiente > 0 ? 'green' : 'red'}
                                className='font-normal'
                              >
                                B/ {redondearNumero(deuda_pagada)}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className='flex flex-col'>
                              <Typography
                                variant='small'
                                color={deuda_pendiente > 0 ? 'green' : 'red'}
                                className='font-normal'
                              >
                                + B/ {redondearNumero(ganancias)}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className='w-max'>
                              <Chip
                                variant='ghost'
                                size='sm'
                                value={estado ? 'Pendiente' : 'Pagado'}
                                color={estado ? 'red' : 'green'}
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal'
                            >
                              {getFecha(dayjs(fecha_creacion.toDate()))}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Tooltip content='ver detalle'>
                              <IconButton variant='text' onClick={(rest) => handleOpenDetalle(id, rest)}>
                                <TableCellsIcon className='h-4 w-4' />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content='añadir pago'>
                              <IconButton variant='text' onClick={(rest) => handleOpenAddPago(id, rest)}>
                                <PlusIcon className='h-4 w-4' />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content='eliminar'>
                              <IconButton variant='text' onClick={(rest) => handleDeletePrestamo(id, rest)}>
                                <TrashIcon className='h-4 w-4' />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      )
                    }
                  )
                )
              : (
                <tr>
                  <td colSpan={12}>
                    {CustomSpinner()}
                  </td>
                </tr>
                )
          }

        </tbody>
      </table>
      <ControlModalDetalle
        prestamo={findPrestamo}
        pagos={pagos}
        handleOpen={handleOpenDetalle}
        open={openDetalle}
      />
      <ControlModalPago
        prestamo={findPrestamo}
        handleOpen={handleOpenAddPago}
        open={openPago}
      />
    </>
  )
}

export default ControlTable
