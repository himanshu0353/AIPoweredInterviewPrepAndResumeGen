import { getAllInterviewReports, generateInterviewReport, getInterviewReportById , generateResumePdf} from "../services/interview.api";
import { useCallback, useContext } from 'react';
import { InterviewContext } from "../interviewContext";

export const useInterview = () => {

    const context = useContext(InterviewContext)

    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const {loading, setLoading, report, setReport, reports, setReports} = context

    const generateReport = useCallback(async ({resume, selfDescription, jobDescription}) => {
        setLoading(true)
        let response = null
        try{
            response = await generateInterviewReport({resume, selfDescription, jobDescription })
            if(response?.interviewReport){
                setReport(response.interviewReport)
                return response.interviewReport
            }else{
                console.error("No interview report in response:", response)
                return null
            }
        }catch(err){
            console.error("Error generating report:", err.response?.status, err.message)
            alert(`Failed to generate report: ${err.response?.status === 503 ? 'Backend server is unavailable' : err.message}`)
            return null
        }finally{
            setLoading(false)
        }
    }, [setLoading, setReport])

    const getReportById = useCallback(async (interviewId) => {
        setLoading(true)
        let response = null
        try{
            response = await getInterviewReportById(interviewId)
            if(response?.interviewReport){
                setReport(response.interviewReport)
                return response.interviewReport
            }else{
                console.error("No interview report in response:", response)
                return null
            }
        }catch(err){
            console.error("Error fetching report:", err.response?.status, err.message)
            return null
        }finally{
            setLoading(false)
        }
    }, [setLoading, setReport])

    const getReports = useCallback(async () => {
        setLoading(true)
        let response = null
        try{
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
        return response?.interviewReports
    }, [setLoading, setReports])

    const getResumePdf = useCallback(async (interviewReportId) => {
        setLoading(true)
        let response = null
        try{
            response = await generateResumePdf({ interviewReportId})
            const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `resume_${interviewReportId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }, [setLoading])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }


}
