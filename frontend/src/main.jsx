import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#061428',
          color: '#e2f4ff',
          border: '1px solid #0c2340',
          borderRadius: '4px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          padding: '12px 20px',
        },
        success: {
          iconTheme: { primary: '#0ea5e9', secondary: '#061428' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#061428' },
        },
      }}
    />
  </StrictMode>
)