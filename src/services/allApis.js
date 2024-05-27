import { commonApi } from "./commonApi";
import base_url from "./server_url";

//Register
export const userRegister=async(data)=>{

    return await commonApi("POST",`${base_url}/register`,data,"")
}

//login

export const userLogin=async(data)=>{

    return await commonApi("POST",`${base_url}/login`,data,"")
}

//add project

export const addProject=async(data,header)=>{
    return await commonApi("POST",`${base_url}/addproject`,data,header)
}

//home-projects

export const homeProjets=async()=>{
    return await commonApi("GET",`${base_url}/home-projects`,"","")
}

//All projects

export const allProjets=async(header,search)=>{
    return await commonApi("GET",`${base_url}/all-projects?search=${search}`,"",header)
}

//user-projects

export const userProjets=async(header)=>{
    return await commonApi("GET",`${base_url}/user-projects`,"",header)
}

//edit-project

export const editProjects=async(id,data,header)=>{
    return await commonApi("PUT",`${base_url}/edit-projects/${id}`,data,header)
}

//delete-project

export const deleteProjects=async(id,header)=>{
    return await commonApi("DELETE",`${base_url}/delete-project/${id}`,{},header)
}

//update-profile

export const updateProfile=async(header,data)=>{
    return await commonApi("PUT",`${base_url}/profile-update`,data,header)
}








