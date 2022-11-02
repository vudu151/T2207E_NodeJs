const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;    //Khai báo cổng localhost

app.listen(PORT,function () {
    console.log("Sever is running...");
});

//share api access all                //Đây l khi làm dự án lấy sql chung từ một tài khoản quán lí
app.use(function (req,res,next){
    res.header("Acccess-Control-Allow-Origin","*");
    res.header("Acccess-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Config to connect MySQL
const configDB = {
    host: "139.180.186.20",
    port: 3306,
    database: "t2207e",
    user: "t2207e",
    password:"t2207e123", // mamp: "root" --- xampp:"
    multipleStatements: true // cho phép sử dụng nhiều câu SQL trong 1 lần yêu cầu

};

//Connect to mysql
const mysql = require("mysql");
const conn = mysql.createConnection(configDB);

// api list all class
app.get("/get-classes",function (req,res){
    const sql = "select * from classes";
    conn.query(sql, function (err,data){
        if (err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
app.get("/get-students",function (req,res){
    const sql = "select * from students";
    conn.query(sql, function (err,data){
        if (err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
//  lọc theo cid

app.get("/student-by-class",function (req,res){
    const cid = req.query.cid;
    const sql = "select * from students where cid =" + cid;
    conn.query(sql, function (err,data){
        if (err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
app.get("/student-by-name",function (req,res){
    const q = req.query.q;
    const sql = `select * from students where name like '%${q}%'`;
    conn.query(sql, function (err,data){
        if (err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
app.get("/student-by-classname",function (req,res){
    const cn = req.query.cn;
    const sql = `select * from students where cid in (select cid from classes where name like '%${cn}%')`;
    conn.query(sql, function (err,data){
        if (err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});
// get 1 student by sid
app.get("/detail-student",function (req,res){
    const sid = req.query.sid;
    const sql = `select * from students where sid = ${sid}`;
    conn.query(sql, function (err,data){
        if (err){
            res.status(403).send("Error");
        }else if (data.length > 0){
            res.send(data[0]);
        }else{
            res.status(404).send("404 not found");
        }
    })
});
// liet ke sinh vien
app.get("/student",function (req,res){
    res.send("Student with GET");
})
// them sinh vien
app.post("/student",function (req,res){
    res.send("Student with POST");
})
// update sinh vien
app.put("/student",function (req,res){
    res.send("Student with PUT");
})
// xoa sinh vien
app.delete("/student",function (req,res){
    res.send("Student with DELETE");
})


