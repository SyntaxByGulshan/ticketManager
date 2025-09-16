import { BrowserRouter,Routes,Route } from 'react-router-dom'
import PageLayout from './PageLayout'
import TicketDetailsPage from './pages/TicketDetailsPage'
import App from './App'
import DashboardPage from './pages/DashboardPage'
import DefaultPage from './pages/DefaultPage'
export default function PageRouting() {
  return (
    <>
      <BrowserRouter>
      <Routes>
       <Route path='' element={<PageLayout/>}>
       <Route path='' element={<App/>}/>
       <Route path='/ticket/:id' element={<TicketDetailsPage/>}/>
       <Route path='/dashboard' element={<DashboardPage/>}/>
       <Route path='*' element={<DefaultPage/>}/>
       </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}
