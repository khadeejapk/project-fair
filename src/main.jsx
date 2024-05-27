import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextApi from './Context Api/ContextApi.jsx'
import AuthContext from './Context Api/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContext>
    <ContextApi>
    <App />
    </ContextApi>
    </AuthContext>
    </BrowserRouter>
  </React.StrictMode>,
)
