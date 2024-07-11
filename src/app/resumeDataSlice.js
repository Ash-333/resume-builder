import { createSlice } from "@reduxjs/toolkit";

const resumeSlice=createSlice({
    name:"resume",
    initialState:{
        info:{
            personalInfo:{
                name: "",
                email: "",
                phone: "",
                website: "",
                linkedin:"",
                address: "",
              },
            professionalSummary:"",
            experience:[{ role: "", company: "", duration: "", details: "" }],
            education:[{ degree: "", institution: "", duration: "" }],
            skills:[""],
            projects:[{ name: "", description: [], technologies: "" }]
        }
    },
    reducers:{
        addData:(state,action)=>{
            state.info=action.payload
        }
    }    
})

export const {addData}=resumeSlice.actions
export default resumeSlice.reducer