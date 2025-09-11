import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PageRouting from './PageRouting.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <PageRouting/>
    </Provider>
  </StrictMode>,
)
