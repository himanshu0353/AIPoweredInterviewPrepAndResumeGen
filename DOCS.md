# Resume Gen-AI Project Documentation

## Problem Statement

### What problem were you trying to solve?

The traditional interview preparation process is inefficient and generic. Candidates often struggle with:
- **Lack of personalized preparation**: Generic interview questions don't address specific job requirements or candidate backgrounds
- **Time-consuming research**: Manually researching company-specific questions and preparing answers
- **Skill gap identification**: Difficulty in identifying what skills they lack for specific roles
- **Resume optimization**: Not knowing how to tailor resumes for specific job applications
- **Unstructured preparation**: No clear roadmap for interview preparation timeline

### Why did you choose this problem?

- **High impact**: Interview preparation affects career advancement and job placement for millions of professionals
- **Market gap**: While there are generic interview prep platforms, few offer AI-powered personalized analysis
- **Scalable solution**: The problem can be solved with current AI capabilities and has broad applicability
- **Measurable outcomes**: Success can be measured through improved interview performance and job placement rates

## Your Approach & Thought Process

### How did you break down the problem?

1. **Core Functionality Analysis**:
   - Input processing (resume parsing, job description analysis)
   - AI-powered content generation (questions, analysis, recommendations)
   - Output presentation (structured reports, actionable insights)

2. **User Experience Flow**:
   - Authentication and user management
   - Data input collection
   - Processing and AI generation
   - Results presentation and export capabilities

3. **Technical Architecture**:
   - Frontend: Interactive web application for data input and results display
   - Backend: API server handling business logic and AI integration
   - Database: Persistent storage for user data and generated reports
   - AI Service: Integration with Google Gemini for content generation

### What made your approach unique or different?

- **End-to-end AI integration**: From resume parsing to customized resume generation
- **Structured output validation**: Using Zod schemas to ensure AI responses meet quality standards
- **Dual-purpose platform**: Serves both interviewers (generating questions) and candidates (preparation materials)
- **PDF generation capability**: Automated resume tailoring and PDF export
- **Comprehensive analysis**: Combines technical, behavioral, and strategic preparation elements

## Tech Stack

### Tools, frameworks, and platforms used

**Frontend:**
- **React 18** with Vite for fast development and building
- **React Router** for client-side routing
- **SCSS** for component styling
- **ESLint** for code quality

**Backend:**
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM for data persistence
- **JWT** for authentication
- **bcryptjs** for password hashing
- **multer** for file uploads
- **cors** for cross-origin requests

**AI & Automation:**
- **Google Gemini AI (gemini-2.5-flash)** for content generation
- **Zod** for schema validation and type safety
- **zod-to-json-schema** for AI response structuring
- **Puppeteer** for PDF generation from HTML

**Development Tools:**
- **Nodemon** for backend development server
- **Vite** for frontend development server
- **npm** for package management

### Any agentic/automation tools involved

- **Google Gemini AI**: Primary AI agent for generating interview questions, analysis, and resume content
- **Puppeteer**: Automated browser automation for PDF generation
- **Nodemon**: Development automation for server restarts
- **Vite**: Build automation and hot module replacement

## Build Explanation

### How does your solution work?

The application follows a three-tier architecture:

1. **Frontend Layer** (React):
   - User authentication (login/register)
   - Data input forms (resume upload, job description, self-description)
   - Results display with interactive navigation
   - PDF download functionality

2. **Backend API Layer** (Node.js/Express):
   - RESTful API endpoints for authentication and interview operations
   - File upload handling and processing
   - AI service integration
   - Database operations

3. **AI Processing Layer**:
   - Resume text extraction from PDF using pdf-parse
   - Structured prompt engineering for Google Gemini
   - Response validation and cleaning
   - PDF generation from AI-generated HTML

### Key features or workflows

**Core Workflow:**
1. **User Registration/Login**: JWT-based authentication system
2. **Report Generation**:
   - Upload resume (PDF format)
   - Input job description (required)
   - Add self-description (optional)
   - AI processes inputs and generates comprehensive report
3. **Report Analysis**:
   - Match score (0-100) between candidate and job
   - 5 technical interview questions with intentions and model answers
   - 3 behavioral interview questions with intentions and model answers
   - Skill gap analysis with severity levels
   - 7-day preparation roadmap with daily tasks
4. **Resume Generation**: AI-tailored resume PDF based on job requirements
5. **Report Management**: View previous reports, download PDFs

**Technical Highlights:**
- **AI Response Validation**: Zod schemas ensure structured, high-quality outputs
- **Error Handling**: Comprehensive error catching and user feedback
- **File Processing**: Secure PDF parsing and upload handling
- **Data Persistence**: MongoDB storage with user-specific report history
- **Security**: Password hashing, JWT tokens, CORS configuration

**User Experience Features:**
- Responsive design for mobile and desktop
- Loading states and progress indicators
- Interactive question cards with expandable answers
- Navigation between different report sections
- PDF export functionality for offline access