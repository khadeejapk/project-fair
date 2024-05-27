import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import server_url from'../services/server_url'
import { useState , useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateProfile } from '../services/allApis';


function Profile() {
   
   const [user, setUser] = useState({
      id: "", username: "", email: "", password: "", github: "", linkdin: "", profile: ""
  })

  const[open, setOpen] = useState(false)
  const[preview,setPreview]=useState("")
  const[existingProfile,setExisitingProfile]=useState("")
  useEffect(() => {
      if (sessionStorage.getItem('token')) {
          const userDetails=JSON.parse(sessionStorage.getItem('userDetails'))
          console.log(userDetails)

          setUser({
            id: userDetails._id, username: userDetails.username, email: userDetails.email, password: userDetails.password,
              github: userDetails.github, linkdin: userDetails.linkdin,profile:""})
              setExisitingProfile(userDetails.profile)
      }
  },[open])

  useEffect(()=>{
      if(user.profile){
          setPreview(URL.createObjectURL(user.profile))
      }
      else{
          setPreview("")
      }
  },[user.profile])
  console.log(user);

  const handleProfileUpdate=async()=>{
   console.log(user);
   const{username,password,email,github,linkdin,profile}=user
   if(!username || !password || !email || !github || !linkdin ){
      toast.warning("Enter Valid Inputs")
   }
   else{
      const formData=new FormData()
      formData.append("username",username)
      formData.append("password",password)
      formData.append("email",email)
      formData.append("github",github)
      formData.append("linkdin",linkdin)
      preview?formData.append("profile",profile):formData.append("profile",existingProfile)

   const header={
      "Authorization":`Bearer ${sessionStorage.getItem('token')}`,
      "Content-Type":preview?"multipart/form-data":"application/json"
   }
   const result=await updateProfile(header,formData)
  if(result.status==200){
      console.log(result.data);
      toast.success("Profile Successfully Updated!!!")
      sessionStorage.setItem("userDetails",JSON.stringify(result.data))
      setOpen(!open)
  }
  else{
      toast.error(result.response.data)
  }



  }
  }

  return (
   <>
   <div className='p-5 border shadow border-3 m-3'>
       <div className='d-flex justify-content-between'>
           <h1>PROFILE</h1>
           <button className='btn' onClick={()=>{ setOpen(!open)}} >
               <i className="fa-solid fa-down-long" size="xl" style={{ color: "#00ff1e", }} />
           </button>
       </div>
       {
         open &&
       <div>
           <label>
               <input type="file" name="" onChange={(e)=>setUser({...user,profile:e.target.files[0]})}       id="in" style={{ display: 'none' }} />
               {
                   existingProfile==""?
                         <img className="img-fluid"  width={'200px'} src={preview?preview:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpmMLA8odEi8CaMK39yvrOg-EGJP6127PmCjqURn_ssg&s"} alt="" />
                    :
                         <img className="img-fluid"  width={'200px'} src={preview?preview:`${server_url}/uploads/${existingProfile}`} alt="in"/>
               }
           </label>
           <FloatingLabel controlId="username" label="UserName" className="mb-3">
               <Form.Control type="text" placeholder="Username"  value={user?.username} onChange={(e)=>setUser({...user,username:e.target.value})}/>
           </FloatingLabel>
           <FloatingLabel controlId="git" label="GitHub " className="mb-3">
               <Form.Control type="text" placeholder="Git Account Url"  value={user?.github} onChange={(e)=>setUser({...user,github:e.target.value})} />
           </FloatingLabel>
           <FloatingLabel controlId="Linkedin" label="Linkedin Url" className="mb-3">
               <Form.Control type="text" placeholder="Linkedin Url"  value={user?.linkdin} onChange={(e)=>setUser({...user,linkdin:e.target.value})} />
           </FloatingLabel>
           <div className='d-grid mt-3'>
            <button className='btn btn-block btn-warning' onClick={handleProfileUpdate}>Update</button>
           </div>

       </div>
}

   </div>
   </>
   

)
}

export default Profile