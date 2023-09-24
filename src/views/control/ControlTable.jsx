/* eslint-disable camelcase */
import React from 'react'
import {
  ChevronUpDownIcon
} from '@heroicons/react/24/outline'
import { FolderIcon } from '@heroicons/react/24/solid'
import {
  Typography,
  IconButton,
  Tooltip,
  Chip
} from '@material-tailwind/react'
import { usePrestamo } from '../../store'
import dayjs from 'dayjs'
import { getFecha, redondearNumero } from '../../helpers'

const headers = ['Nombre', 'Prestado', 'Capital', 'interes', 'deuda pendiente', 'pagada', 'ganacia', 'estado', 'fecha hora', 'ver']
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
  const prestamo = usePrestamo(state => state.prestamo)

  return (
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
        {prestamo.map(
          ({ nombre, deuda_inicial, deuda_capital, deuda_interes, deuda_pendiente, deuda_pagada, ganancias, estado, fecha_creacion }, index) => {
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
                <td className={classes}>
                  <div className='flex flex-col'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      B/ {redondearNumero(deuda_capital)}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <div className='flex flex-col'>
                    <Typography
                      variant='small'
                      color='blue-gray'
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
                      B/ {redondearNumero(ganancias)}
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
                    {/* {dayjs(fecha_creacion.toDate(), 'YYYY-MM-DD')} */}
                  </Typography>
                </td>
                <td className={classes}>
                  <Tooltip content='Edit User'>
                    <IconButton variant='text'>
                      <FolderIcon className='h-4 w-4' />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            )
          }
        )}
      </tbody>
    </table>
  )
}

export default ControlTable
