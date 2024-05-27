import React, { useState , useContext } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { userRegister,userLogin } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../Context Api/AuthContext';



function Auth() {

    const {authStatus,setAuthStatus}=useContext(TokenAuthContext)

    const [status, setStatus] = useState(true)
    const [data,setData]=useState({
        username:"",password:"",email:""
    })
    console.log(data)
    const navigate=useNavigate()
    const changeStatus = () => {
        setStatus(!status)
    }
    const handleRegister =async()=>{
        console.log(data);
        const {username, password, email} = data
        if (!username || !password ||!email){
            toast.warning("Invalid Details")
        }
        else{
            const result=await userRegister(data)
            console.log(result);
            if(result.status==201){
                toast.success("User Registration Success!")
                setData({username:"",password:"",email:""})
                setStatus(true)
                

            }
            else{
                toast.error(result.response.data)
            }

        }

    }

    const handleLogin=async()=>{
        const {email,password}=data
        if (!email || !password){
            toast.warning("Invalid Details!!")
        }
        else{
            const result=await userLogin({email,password})
            console.log(result)
            if(result.status=200){
                console.log(result);
            sessionStorage.setItem('token',result.data.token)
            sessionStorage.setItem("username",result.data.user)
            sessionStorage.setItem("userDetails",JSON.stringify(result.data.userDetails))
            toast.success("Login Successfull!")
            navigate('/')
            setAuthStatus(true)

            }
            else{
                toast.error(result.response.data)
            }
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center w-100' style={{ height: '100vh', backgroundColor: '#ffffff' }}>
                <div className='shadow w-50 p-4'>
                    <Row>
                        <Col sm={12} md={6}>
                            <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?size=626&ext=jpg&ga=GA1.1.1308399985.1713158738&semt=sph" className='img-fluid' alt="" />
                        </Col>
                        <Col sm={12} md={6}>
                            {
                                status ?
                                    <h3>LOGIN</h3>
                                    :
                                    <h3>REGISTER</h3>

                            }

                            <div className='mt-4'>
                                {
                                    !status &&
                                    <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                                        <Form.Control type="text" placeholder="Username" onChange={(e)=>{setData({...data,username:e.target.value})}}/>
                                    </FloatingLabel>
                                }
                                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                    <Form.Control type="email" placeholder="name@example.com" onChange={(e)=>{setData({...data,email:e.target.value})}}/>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control type="password" placeholder="Password" onChange={(e)=>{setData({...data,password:e.target.value})}}/>
                                </FloatingLabel>
                            </div>
                            <div className='mt-3 d-flex justify-content-between'>
                                <button className='btn btn-success'>
                                    {
                                        status?
                                        <button className='btn btn-info' onClick={handleLogin}>

                                        <span>LOGIN</span>

                                        </button>
                                        :
                                        <button className='btn btn-info' onClick={handleRegister}>

                                        <span>REGISTER</span>

                                        </button>
                                    }
                                </button>
                                <button className='btn btn-link' onClick={changeStatus}>
                                    {
                                        status?
                                        <span>New User?</span>
                                        :
                                        <span>Already a User?</span>
                                    }
                                </button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        
        </>
    )
}

export default Auth