import { BrowserRouter,Routes,Route } from 'react-router-dom'
import PageLayout from './PageLayout'
import TicketDetailsPage from './pages/TicketDetailsPage'
import App from './App'
import DashboardPage from './pages/DashboardPage'
import DefaultPage from './pages/DefaultPage'
import LoginPage from './auth/pages/LoginPage'
import SignupPage from './auth/pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import AuthPage from './auth/pages/AuthPage'
export default function PageRouting() {
  return (
    <>
      <BrowserRouter>
      <Routes>
       <Route path='' element={<PageLayout/>}>
       <Route path='' element={<App/>}/>
       <Route path='/ticket/:id' element={<TicketDetailsPage/>}/>
       <Route path='/dashboard' element={<DashboardPage/>}/>
       <Route path='/profile' element={<ProfilePage/>}/>
       <Route path='*' element={<DefaultPage/>}/>
       <Route path='/login' element={<LoginPage/>}/>
       <Route path='/signup' element={<SignupPage/>}/>
       <Route path='/auth' element={<AuthPage/>}/>
       </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}
