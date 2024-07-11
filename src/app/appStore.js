import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from './resumeDataSlice'

const appStore=configureStore({
    reducer:{
        resume:resumeReducer
    }
})

export default appStore