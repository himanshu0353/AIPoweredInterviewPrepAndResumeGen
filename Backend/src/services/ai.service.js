const { GoogleGenAI } = require("@google/genai");
const { z } = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema')

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

/*
*this is not a mongodb schema, it is a zod schema(it return a expected structure output of data.)
*/
const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile match the job description"),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach should take etc"),
    })).describe("Technical question can be asked in the interview and how to answer them"),

    behavioralQuestion: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach should take etc"),
    })).describe('Behavioral question that can be asked in the interview along with their intention and how to answer them'),

    skillGap: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(['low', 'medium', 'high']).describe("The severity of skill gap, i.e.")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structure, system design, mock interviews"),
        tasks: z.array(z.string()).describe("List of tasks to be on this day to follow the preparation plan,e.g. read a specific book")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for interview effective.")
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Act as a senior interviewer at a product-based company and Generate an interview report for a candidate with the following details:
                    Resume:${resume},
                    self Description:${selfDescription},
                    job Description:${jobDescription}`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        content: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }})

    return JSON.parse(response.text)
}

module.exports = generateInterviewRbe