import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              border: '2px solid #0A0A0A',
              borderRadius: '10px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: '600',
              boxShadow: '4px 4px 0 #0A0A0A',
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)