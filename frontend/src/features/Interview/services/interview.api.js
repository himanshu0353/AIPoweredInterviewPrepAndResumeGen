import axios from 'axios';


const Api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://aipoweredinterviewprepandresumegen.onrender.com',
    withCredentials: true
})

export const generateInterviewReport = async({resume, selfDescription, jobDescription}) =>{
    
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('selfDescription', selfDescription);
    formData.append('jobDescription', jobDescription);

    try{
        const response =  await Api.post('/api/interview', formData,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
        return response.data
    }catch(err){
        if(err.response?.status === 503){
            console.error("Backend server unavailable (503) - the server may be restarting or down")
        }else if(err.response?.status === 401){
            console.error("Authentication failed (401) - token may be expired or invalid")
        }
        throw err
    }
} 

export const getInterviewReportById = async(interviewId) => {
    const response = await Api.get(`/api/interview/report/${interviewId}`)

    return response.data
 }

export const getAllInterviewReports = async() => {
    const response = await Api.get('/api/interview/report') 
    return response.data
}

export const generateResumePdf = async({interviewReportId}) => {
    const response = await Api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })
    return response.data
}