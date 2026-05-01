# Troubleshooting Guide

## Error: 401 Unauthorized on `/api/auth/get-me`

### Symptoms:
- "Failed to load resource: the server responded with a status of 401"
- "Cannot read properties of undefined (reading 'user')"

### Root Causes:
1. **Token not being sent**: Cookies not being transmitted with requests
2. **Token expired**: JWT token has expired (default: 1 day)
3. **Database connection failure**: User lookup fails in MongoDB
4. **CORS misconfiguration**: Cookies blocked by CORS policy

### Solutions:

#### 1. Verify Backend is Running
```bash
# Test if backend is accessible
curl https://aipoweredinterviewprepandresumegen.onrender.com/api/health
```
Expected response: `{ "status": "Server is running ✅" }`

#### 2. Check Environment Variables
Ensure your backend has these env vars:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Set to 'production' for Render
- `GOOGLE_GENAI_API_KEY` - Google Gemini API key

#### 3. Verify Cookies Are Being Sent
In your browser DevTools:
1. Go to Application → Cookies
2. Look for a `token` cookie for your domain
3. Ensure it's not marked as httpOnly (it should be)
4. Check the cookie's `secure` and `sameSite` flags

#### 4. Check CORS Headers
In browser DevTools → Network tab:
1. Look for response headers on failed requests
2. Verify `Access-Control-Allow-Credentials: true`
3. Verify `Access-Control-Allow-Origin` includes your frontend domain

---

## Error: 503 Service Unavailable on `/api/interview`

### Symptoms:
- "Failed to load resource: the server responded with a status of 503"
- Backend is not responding

### Root Causes:
1. **Backend crashed or not running**
2. **Database connection failed** - MongoDB unreachable
3. **Memory exhausted** - Server ran out of memory
4. **Google Gemini API error** - AI service unavailable
5. **Render server restarting** - Cold startup

### Solutions:

#### 1. Check Backend Logs (Render)
1. Go to your Render dashboard
2. Select your backend service
3. Click "Logs" tab
4. Look for error messages

#### 2. Restart Backend (Render)
1. Go to Render dashboard
2. Select your backend service
3. Click "Manual Restart"
4. Wait 1-2 minutes for it to start

#### 3. Verify MongoDB Connection
Test locally:
```bash
# Install mongo shell if you don't have it
# Connect to your MongoDB
mongosh "your_mongo_connection_string"
# If you see a cursor, connection works
```

#### 4. Check Google Gemini API
1. Verify API key is valid at https://aistudio.google.com/app/apikey
2. Ensure API key is set in backend env vars
3. Check if API has quota limits

#### 5. Verify Backend Logs on Render
Look for these common errors:
```
❌ Failed to start server: ECONNREFUSED
❌ Error connecting to database: MongoError
❌ GOOGLE_GENAI_API_KEY not set
```

---

## Error: Cannot read properties of undefined (reading '_id')

### Symptoms:
- "Uncaught (in promise) TypeError: Cannot read properties of undefined (reading '_id')"
- Happens when clicking "Generate Interview Report"

### Root Cause:
The API response is `null` or `undefined` because:
1. The request failed (401, 503, etc.)
2. The response didn't contain expected data structure

### Solution:
This is now fixed with better error handling. Check console for:
- Exact error status (401, 503, etc.)
- Specific error message
- Backend logs to identify root cause

---

## Local Testing Checklist

### Before Deploying to Render:

```bash
# 1. Create .env file in root with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_GENAI_API_KEY=your_api_key
NODE_ENV=development
PORT=3000

# 2. Install dependencies
npm install
cd frontend && npm install && cd ..

# 3. Start backend
npm run dev

# 4. In another terminal, start frontend
cd frontend && npm run dev

# 5. Test endpoints with curl
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"123456"}'

curl -X GET http://localhost:3000/api/health
```

---

## Render Deployment Checklist

### Before deploying:

1. **Environment Variables Set** in Render dashboard:
   - [ ] MONGO_URI
   - [ ] JWT_SECRET
   - [ ] GOOGLE_GENAI_API_KEY
   - [ ] NODE_ENV=production

2. **Build Command**:
   ```
   npm install
   ```

3. **Start Command**:
   ```
   npm start
   ```

4. **Region**: Choose closest to your users

5. **Auto-deploy**: Enable for main branch

### After deploying:

1. Wait 3-5 minutes for deployment to complete
2. Check logs for errors
3. Test health endpoint: `GET /api/health`
4. Test from frontend URL

---

## Common Fixes Applied

✅ **Backend now waits for DB connection before starting**
✅ **Better error handling in frontend API calls**
✅ **CORS properly configured for cookies**
✅ **Global error handler added to backend**
✅ **Health check endpoint added**

---

## Getting Help

If issues persist:

1. **Check backend logs** on Render
2. **Verify all env vars** are set
3. **Test health endpoint**: `/api/health`
4. **Check MongoDB connection** from MongoDB Atlas dashboard
5. **Verify Google Gemini API key** is valid
6. **Clear browser cookies** and try again
7. **Hard refresh** browser (Ctrl+Shift+R)

---

## Development Tips

### To see more detailed logs:

Backend - add this to server.js:
```javascript
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
```

Frontend - add this to useInterview.js:
```javascript
console.log("Response received:", response);
console.log("Interview Report:", response?.interviewReport);
```

### Database Issues:

If you're getting database connection errors, ensure:
- MongoDB URI is correct format
- Cluster allows connections from your IP
- Network access is enabled in MongoDB Atlas
- Database/collection exists

### Rate Limiting:

If you get rate limit errors:
- Wait a few minutes before retrying
- Check Google Gemini API quotas
- Consider implementing request queuing
