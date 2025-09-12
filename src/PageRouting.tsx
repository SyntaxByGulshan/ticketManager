import { BrowserRouter,Routes,Route } from 'react-router-dom'
import PageLayout from './PageLayout'
import TicketDetailsPage from './pages/TicketDetailsPage'
import App from './App'
import DashbordPage from './pages/DashboardPage'
export default function PageRouting() {
  return (
    <>
      <BrowserRouter>
      <Routes>
       <Route path='' element={<PageLayout/>}>
       <Route path='' element={<App/>}/>
       <Route path='/ticket/:id' element={<TicketDetailsPage/>}/>
       <Route path='/report' element={<DashbordPage/>}/>
       </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}
