
import './bootstrap.min.css'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Reg from './pages/Reg'
import Footer from './components/Footer'
import Auth from './pages/Auth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react'
import { TokenAuthContext } from './Context Api/AuthContext'


function App() {

  const {authStatus,setAuthStatus}=useContext(TokenAuthContext)  

  return (
    <>
     <Routes>
      <Route path='/' element={<Landing/>}></Route>
      <Route path='/dash' element={authStatus?<Dashboard/>:<Landing/>}></Route>
      <Route path='/projects' element={authStatus?<Projects/>:<Landing/>}></Route>
      <Route path='/log' element={<Login/>}></Route>
      <Route path='/reg' element={<Reg/>}></Route>
      <Route path='/auth' element={<Auth/>}></Route>

     </Routes>
     <Footer/>
     <ToastContainer/>
    </>
  )
}

export default App
