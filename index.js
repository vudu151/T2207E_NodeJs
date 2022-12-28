const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT,function () {
    console.log("Server is running...")
});

app.get("/demo",function (req,res){
    res.send("Hello World!");
});
// share api access all
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin X-Reqested-With, Content-Type,Accept");
    next();
});


// config to connect mysql
const configDB = {
    host: "139.180.186.20",
    port: 3306,//mysql: 3306, sqlserver: 1433
    database: "t2207e",
    user: "t2207e",
    password:"t2207e123", //mamp: "root", xampp: ""
    multipleStatements: true //cho phep su dung nhieu cau sql trong 1 lan gui yeu cau
};

// connect to mysql
const mysql = require("mysql");
const conn = mysql.createConnection(configDB);


app.get("/student",function(req,res){
    //Liet ke sinh vien
    res.send("Student with GET");
});
app.post("/student",function(req,res){
    //them 1 sinh vien
    res.send("Student with POST");
});
app.put("/student",function(req,res){
    //update sinh vien
    res.send("Student with PUT");
});
app.delete("/student",function(req,res){
    //delete sinh vien
    res.send("Student with DELETE");
});

app.get("/get-centre",function (req,res) {
    const sql = "select * from Group1_Centres";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});

app.get("/get-degree",function (req,res) {
    const sql = "select * from Group1_Degrees";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});

app.get("/get-equipment",function (req,res) {
    const sql = "select * from Group1_Equipments";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});

app.get("/get-doctor",function (req,res) {
    const sql = "SELECT a.id,a.name,a.img,a.phone,a.email,a.description,b.id as idc,b.name as namec,c.name as namep FROM Group1_Doctors a left join Group1_Centres b on a.centreid = b.id left join Group1_Positions c on c.id = a.positionid;";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});

app.get("/get-facility",function (req,res) {
    const sql = "select * from Group1_Facilities";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});

app.get("/get-service",function (req,res) {
    const sql = "select * from Group1_Services";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});

app.get("/get-doctordegree",function (req,res) {
    const sql = "select * from Group1_DoctorDegrees";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});


app.get("/get-centre-by-id",function (req,res) {
    const id = req.query.id;
    const sql = `select * from Group1_Centres where id = ${id}`;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});
app.get("/get-doctor-by-cid",function (req,res) {
    const id = req.query.id;
    const sql = `SELECT a.id,a.name,a.img,a.phone,a.email,a.description,b.id as idc,b.name as namec,c.name as namep FROM Group1_Doctors a left join Group1_Centres b on a.centreid = b.id left join Group1_Positions c on c.id = a.positionid where b.id = ${id};`;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});
app.get("/get-service-by-id",function (req,res) {
    const id = req.query.id;
    const sql = `select * from Group1_Services where id = ${id}`;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});

app.get("/get-question",function (req,res) {
    const sql = "select * from Group1_Questions";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});

app.get("/get-doctor-dean",function (req,res) {
    const sql = "SELECT a.id,a.name,a.img,a.phone,a.email,a.description,b.id as idc,b.name as namec,c.name as namep FROM Group1_Doctors a left join Group1_Centres b on a.centreid = b.id left join Group1_Positions c on c.id = a.positionid where c.id = 1;";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});