const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes=require("./routes/authRoutes");
const taskRoutes=require("./routes/taskRoutes");
const userRoutes=require("./routes/userRoutes");
const cors=require("cors");
const morgan=require("morgan");
require("dotenv").config();
const seederDB=require("./config/seederData");
const { seuqelizeCon } = require('./config/dbConfig');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: 'https://to-do-application-task-api.vercel.app/api/v1/',
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    allowedHeaders: 'Content-Type'
  };

app.use(cors(corsOptions));

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/task",taskRoutes);
app.use("/api/v1/user",userRoutes);


app.use("/",(req,res)=>{
    res.send("Welcome to Backend API");
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    res.status(err.statusCode).json({
        status: "failure",
        code: err.statusCode,
        message: err.message,
        data: []
    });
});

app.use((data, req, res, next) => {
    data.message = data.message || 'Fetch Successfully';
    data.data = data.data||[] ;

    res.status(data.statusCode).json({
        code: data.statusCode,
        message: data.message,
        data:data.data
    });
});

// seuqelizeCon.sync({alter:true})
app.listen(PORT, () => {
    // seederDB();
        console.log(`Server running on port ${PORT}`);
    });


module.exports = app;
