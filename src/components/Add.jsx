import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import  Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addProject } from '../services/allApis';
import { addProjectResponseContext } from '../Context Api/ContextApi';




function Add() {
      
    const [addProjectResponse,setAddProjectResponse] = useContext(addProjectResponseContext)
    console.log(useContext(addProjectResponseContext));
    const [show, setShow] = useState(false)
    const [preview, setPreview] = useState("")
    const[projectData, setProjectData]=useState({
        title:"",overview:"",language:"",github:"",demo:"",projectImage:""
    })

    const[imageStatus, setImageStatus]=useState(false)
    
    useEffect(()=>{
        console.log(projectData);
        if(projectData.projectImage.type=="image/jpg" || projectData.projectImage.type=="image/jpeg" || projectData.projectImage.type=="image/png"){
            // console.log("Image is in the correct format");
            setImageStatus(false)
            setPreview(URL.createObjectURL(projectData.projectImage))
        }
        else{
            console.log("Invalid file format!! Image should be in jpg,jpeg or png format!");
            setImageStatus(true)
            setPreview("")
        }
    },[projectData.projectImage,projectData])

    const handleAddProject=async()=>{
        const {title,overview,language,github,demo,projectImage}=projectData
        if(!title || !overview || !language || !github || !demo || !projectImage){
            toast.warning("Invalid details")
        }
        else{
            const formData=new FormData()
            formData.append("title",title)
            formData.append("overview",overview)
            formData.append("language",language)
            formData.append("github",github)
            formData.append("demo",demo)
            formData.append("image",projectImage)


            const token=sessionStorage.getItem("token")
            const reqHeader={
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token} `
            }
            const result=await addProject(formData,reqHeader)
            if(result.status==200){
                toast.success("Project Added Successfully")
                setProjectData({
                    title:"",overview:"",language:"",github:"",demo:"",projectImage:""
                })
                handleClose()
                setAddProjectResponse()
            }else{
                toast.error(result.response.data)
            }
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button className='btn btn-success mb-4' onClick={handleShow}>
                ADD PROJECT
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col>
                            <label >
                                <input type="file" name="" id="" style={{display:"none"}} onChange={(e)=>{setProjectData({...projectData,projectImage:e.target.files[0]})}} />
                                <img className='img-fluid' src={preview?preview:"https://media.istockphoto.com/id/1207512129/vector/camera-solid-icon-professional-photocamera-with-flash-festive-event-and-show-vector-design.jpg?s=612x612&w=0&k=20&c=-WVu1M2h9ksYEvnbhRxCghfWwBq88XVS0eFp8bkK8Ek="} alt="" />
                            </label>
                            {
                                imageStatus &&
                                <p className='text-danger'>Invalid file format!! Image should be in jpg,jpeg or png format!</p>
                            }
                            </Col>
                            <Col>
                                <div>
                                    <FloatingLabel controlId="titleinp" label="Title" className="mb-3">
                                        <Form.Control type="text" placeholder="Project title" onChange={e=>setProjectData({...projectData,title:e.target.value})}/>
                                    </FloatingLabel>
                                    <FloatingLabel controlId="overviewinp" label="Overview">
                                        <Form.Control type="text" placeholder="Brief about Project" onChange={e=>setProjectData({...projectData,overview:e.target.value})}/>
                                    </FloatingLabel>
                                    <FloatingLabel controlId="langinp" label="Languages">
                                        <Form.Control type="text" placeholder="Languages Used" onChange={e=>setProjectData({...projectData,language:e.target.value})}/>
                                    </FloatingLabel>
                                    <FloatingLabel controlId="githubinp" label="GitHub Url">
                                        <Form.Control type="text" placeholder="GitHub Url" onChange={e=>setProjectData({...projectData,github:e.target.value})}/>
                                    </FloatingLabel>
                                </div>
                            </Col>
                            <FloatingLabel controlId="demoinp" label="Demo Url">
                                <Form.Control type="text" placeholder="Demo Url" onChange={e=>setProjectData({...projectData,demo:e.target.value})}/>
                            </FloatingLabel>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        CLOSE
                    </Button>
                    <Button variant="primary" onClick={handleAddProject}>SAVE</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add