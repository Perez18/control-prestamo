import React, { useEffect } from 'react'
import {
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import {
//   Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab
} from '@material-tailwind/react'
import { useNavigate, useParams } from 'react-router-dom'
import ControlTable from './ControlTable'
import { usePrestamo } from '../../store'
import ControlModalAddPrestamo from './ControlModalAddPrestamo'

const TABS = [
  {
    label: 'prestamos',
    value: 'all'
  },
  {
    label: 'graficos',
    value: 'monitored'
  }
]

export const Control = () => {
  const { hash } = useParams()
  const navigate = useNavigate()
  const fetchPrestamo = usePrestamo(state => state.fetchPrestamo)
  const [openAddPrestamo, setOpenAddPrestamo] = React.useState(false)

  useEffect(() => {
    if (hash !== import.meta.env.VITE_HASH_PERMITIDO) {
      return navigate('/')
    }
  }, [hash])

  useEffect(() => {
    fetchPrestamo()
  }, [])

  const handleOpenPrestamo = () => setOpenAddPrestamo((cur) => !cur)

  return (
    <div className='h-full w-full p-5'>
      <h3 className='text-current'>Bienvenido Chomba</h3>
      <CardHeader floated={false} shadow={false} className='rounded-none'>
        <div className='mb-8 flex items-center justify-between gap-8'>
          <div>
            <Typography variant='h5' color='blue-gray'>
              Lista de prestamos
            </Typography>
            {/* <Typography color='gray' className='mt-1 font-normal'>
              See information about all members
            </Typography> */}
          </div>
          <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
            <Button variant='outlined' size='sm'>
              view all
            </Button>
            <Button className='flex items-center gap-3' size='sm' onClick={handleOpenPrestamo}>
              <UserPlusIcon strokeWidth={2} className='h-4 w-4' />
              Añadir prestamo
            </Button>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <Tabs value='all' className='w-full md:w-max'>
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className='w-full md:w-72'>
            <Input
              label='Search'
              icon={<MagnifyingGlassIcon className='h-5 w-5' />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className='overflow-scroll px-0'>
        <ControlTable />
      </CardBody>
      <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          Page 1 of 10
        </Typography>
        <div className='flex gap-2'>
          <Button variant='outlined' size='sm'>
            Previous
          </Button>
          <Button variant='outlined' size='sm'>
            Next
          </Button>
        </div>
      </CardFooter>
      <ControlModalAddPrestamo
        open={openAddPrestamo}
        handleOpen={handleOpenPrestamo}
      />
    </div>
  )
}
