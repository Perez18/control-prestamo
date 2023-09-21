import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { Control } from './views/Control'

export default createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <p>error page</p>
  },
  {
    path: '/prestamos/:hash',
    element: <Control />,
    errorElement: <p>error page</p>
  }
])
