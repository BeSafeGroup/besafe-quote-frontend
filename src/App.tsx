import React from 'react'
import QuotePage from './pages/QuotePage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from './store'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

dayjs.extend(relativeTime)
import 'dayjs/locale/it'
import 'dayjs/locale/de'
import 'dayjs/locale/en'
import 'dayjs/locale/es'
import 'dayjs/locale/fr'
import 'react-toggle/style.css' 
import QuoteCheckout from './pages/QuoteCheckout'
import GeneralLayout from './GeneralLayout'

dayjs.locale('it')

const router = createBrowserRouter([
  {
    path: "/:id",
    element: <QuotePage />,
  },
  {
    path: "/:id/:optionid/checkout",
    element: <QuoteCheckout />,
  }
])

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <GeneralLayout>
          <RouterProvider router={router} />
        </GeneralLayout>
      </Provider>
    </React.StrictMode>
  )
}

export default App
