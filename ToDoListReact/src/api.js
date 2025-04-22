import axios from "axios";

// יצירת אינסטנס של Axios עם הגדרות ברירת מחדל
const URL=process.env.REACT_APP_API_URL;
const api = axios.create({
    baseURL: "http://"+URL,// כתובת ה-API הבסיסית
    headers: {
        "Content-Type": "application/json", // הגדרות כותרות
    },
    
    
});
// הוספת Interceptor ל-Response
api.interceptors.response.use(
    (response) => {
        // אם התשובה תקינה, מחזירים אותה כרגיל
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            alert("Invalid username or password.");
            return (window.location.href = "/");
          }
        // טיפול בשגיאה: כתיבה ללוג
        console.error(
            "Error in API call:",
            error.response?.status || "Unknown status",
            error.response?.data || error.message
        );

        // אפשר להוסיף כאן לוגיקה נוספת כמו רישום לדאטאבייס או הודעה למשתמש

        // זריקת השגיאה כדי לאפשר טיפול בפונקציות הקוראות
        return Promise.reject(error);
    }
);

export default api;
