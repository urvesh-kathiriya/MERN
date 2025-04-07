import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './store/auth.jsx'
import { AdminProvider } from './store/AdminUserStore.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AdminProvider>
  </BrowserRouter>,
)
