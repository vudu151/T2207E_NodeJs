const express = require ("express");      //thuê thợ xây
const app= express();                    //app là cái nhà
const PORT = process.env.PORT || 5000;                 //lấy cổng 5000

app.listen(PORT,function () {
    console.log("Server is running...");
});
//share api access all
app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
})



// config to connect mysql
const configDB = {
    host: "139.180.186.20",
    port: 3306,
    database: "t2207e",
    user: "t2207e",
    password:"t2207e123", // mamp : "root" -- xampp: ""
    multipleStatements: true // cho phép sử dụng nhiều câu SQL 1 lần gửi yêu cầu
};
// connect to mysql
const mysql = require("mysql");
const conn = mysql.createConnection(configDB);

// api list all class
app.get("/get-classes",function (req,res) {
    const sql = "select * from classes";
    conn.query(sql,function (err,data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
// get all students
app.get("/get-students",function (req,res) {
    const sql = "select * from students";
    conn.query(sql,function (err,data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
// loc theo cid
app.get("/student-by-class",function (req,res) {
    const cid = req.query.cid;
    const sql = "select * from students where cid = "+cid;
    conn.query(sql,function (err,data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
//search by name
app.get("/search-students",function (req,res) {
    const q = req.query.q;
    const sql = `select * from students where name like '%${q}%' or email like '%${q}%'`;
    conn.query(sql,function (err,data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
// search by class name
app.get("/search-by-classname",function (req,res) {
    const q = req.query.q;
    const sql = `select * from students where cid in (select cid from classes where name like '%${q}%')`;
    conn.query(sql,function (err,data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
// get 1 student by sid
app.get("/detail-student",function (req,res) {
    const sid = req.query.sid;
    const sql = `select * from students where sid= ${sid}`;
    conn.query(sql,function (err,data) {
        if(err){
            res.status(403).send("Error");
        }else if(data.length > 0){
            res.send(data[0]);
        }else{
            res.status(404).send("404 not found");
        }
    })
});

app.get("/student",function (req,res){
    //liet ke sinh vien
    res.send ("Student with GET")
})
app.post("/student",function (req,res){
    //them 1 sv
    res.send ("Student with POST")
})
app.put("/student",function (req,res){
    //update sv
    res.send ("Student with PUT")
})
app.delete("/student",function (req,res){
    //delete sv
    res.send ("Student with DELETE")
})