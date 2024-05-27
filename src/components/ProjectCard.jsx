import React from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Row,Col } from 'react-bootstrap';
import server_url from '../services/server_url'


function ProjectCard({project}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(project);
  
  return (
    <>
     <Card style={{ width: '18rem' }}>
      <Card.Img onClick={handleShow} variant="top" src={project.image?`${server_url}/upload/${project.image}`:"https://ceblog.s3.amazonaws.com/wp-content/uploads/2021/03/10114044/image2-8.png"} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
       
      </Card.Body>
    </Card>

    

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
            <img className='img-fluid' src={project.image?`${server_url}/upload/${project.image}`:"https://ceblog.s3.amazonaws.com/wp-content/uploads/2021/03/10114044/image2-8.png"} alt="" />
            </Col>
            <Col>
            <h4>{project.title}</h4>
            <p>{project.overview}</p>
            <h6>{project.languages}</h6>
            <div className='mt-3 p-3 d-flex justify-content-between'>
                  <a href="">{project.github}
                  <i className="fa-brands fa-github fa-xl"></i>
                  </a>
                  <a href="">{project.demo}
                  <i className="fa-solid fa-link fa-xl"></i>
                  </a>
            </div>
            </Col>
          </Row>
        </Modal.Body>
       
      </Modal>
    </>
  )
}

export default ProjectCard