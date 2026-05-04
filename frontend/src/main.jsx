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
          background: '#111111',
          color: '#ffffff',
          border: '1px solid #222222',
          borderRadius: '2px',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '13px',
          letterSpacing: '0.02em',
          padding: '12px 20px',
        },
        success: {
          iconTheme: {
            primary: '#c9a84c',
            secondary: '#111111',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#111111',
          },
        },
      }}
    />
  </StrictMode>
)