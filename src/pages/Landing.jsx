import React,{useEffect,useState} from 'react'
import { Row,Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjets } from '../services/allApis'

function Landing() {

   const [token,setToken] = useState("")
   const [projects,setProjects]=useState([])
   useEffect(() =>{
       setToken(sessionStorage.getItem("token"))
       gethomeProjects()
   }, [])

   const gethomeProjects=async()=>{
    const result=await homeProjets()
    if(result.status==200){
      setProjects(result.data)
    }
    else{
      console.log(result.response.data);
    }
   }

   console.log(projects);

  return (
    <>
    <div className='w-100 p-5 align-items-center d-flex' style={{height:'100vh', backgroundColor:'rgb(202, 169, 209)'}}>
         <Row>
            <Col className='align-items-center d-flex'>
                <div>
            <h1 className='display-4 mb-2 text-light'>Project Fair 2024</h1>
            <p style={{textAlign:'justify', color:'black'}}> It is a long established fact that a reader will be distracted by the readable content of a
                 page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less 
                 normal distribution of letters, as opposed to using 'Content here, content here'
                , making it look like readable English. </p>
                {/* <button className='btn btn-success'>Start to Explore</button> */}

                {
                  token ?
                  <Link className='btn btn-info' to={'./dash'}> Manage Your Projects</Link>
                  :
                  <Link className='btn btn-success' to={"/auth"}>Start to Explore</Link>
                }
                
                </div>
            </Col>
            <Col>
            <img src='https://cdn-ifood.nitrocdn.com/EUEUXjUpsHdTALOQQuOhjeDqHFWPSzUn/assets/images/optimized/rev-726f402/mackmediagroup.com/wp-content/uploads/2018/01/web-design.png' alt="" />
            </Col>
         </Row>
    </div>
    <div className='p-5 w-100'>
          <h2 className='text-center mt-4 mb-3'> Projects For You...</h2>
    
      <marquee behavior="" direction="">
        <div className='d-flex justify-content-evenly mt-2'>
          {
            projects.length>0 ?
            projects.map(item=>(
              <ProjectCard project={item}/>
            ))
            :
            <h5> No Projects Available</h5>
          }
            
            
    
        </div>
     </marquee>

     <div className='text-center'>
        <Link to={'/projects'}>Click For More </Link>
     </div>
    </div>
    </>
  )
}

export default Landing