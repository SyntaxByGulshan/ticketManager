import { BrowserRouter,Routes,Route } from 'react-router-dom'
import PageLayout from './PageLayout'
import DetailsPage from './pages/DetailsPage'
import App from './App'
import Report from './pages/Report'
export default function PageRouting() {
  return (
    <>
      <BrowserRouter>
      <Routes>
       <Route path='' element={<PageLayout/>}>
       <Route path='' element={<App/>}/>
       <Route path='/ticket/:id' element={<DetailsPage/>}/>
       <Route path='/report' element={<Report/>}/>
       </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}
