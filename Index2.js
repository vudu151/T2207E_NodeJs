const express = require("express"); //thuê thợ xây
const app = express();  //app là cái nhà
const PORT = process.env.PORT || 5000;  //lấy cổng 5000
app.listen(PORT,function (){
    console.log("Server is running..."); //Mở cổng
});
//config to connect mysql
const configDB ={
    host: "139.180.186.20",
    port:3306,
    database: "t2207e",
    user:"t2207e",
    password:"t2207e123"  ,  //dung win thi bo trong
    multipleStatements: true //cho phep su dung nhieu cau SQL 1 lan gui yeu cau
};
//connect to sql
const mysql = require("mysql");
const conn = mysql.createConnection(configDB);

//api list all class
app.get("/get-classes",function (req,res){
   const sql ="select * from classes";
   conn.query(sql,function (err,data){
       if(err){
           res.send("404 not found");
       }else{
           res.send(data);
       }
   })
});
app.get("/get-students",function (req,res){
    const sql ="select * from students";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found roi kid");
        }else{
            res.send(data);
        }
    })
});
//loc theo cid
app.get("/get-by-class",function (req,res){
    const cid = req.query.cid;
    const sql ="select * from students where cid = "+cid;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found roi kid");
        }else{
            res.send(data);
        }
    })
});
//search by name
app.get("/search-students",function (req,res){
    const q = req.query.q;
    const sql =`select * from students where name like='%${q}%' or email like '%${q}%' `;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found roi kid");
        }else{
            res.send(data);
        }
    })
});
//tim sinh vien thuoc lop nao
app.get("/search-by-classname",function (req,res){
    const q = req.query.q;
    const sql =`select * from students where cid in (select cid from classes where name like '%${q}%') `;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found roi kid");
        }else{
            res.send(data);
        }
    })
});
//get 1 sinh vien theo id
app.get("/detaill-student",function (req,res){
    const sid = req.query.sid;
    const sql =`select * from students where sid= ${sid} `;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found roi kid");
        }else if(data.length >0){
            res.send(data[0]);
        }else{
            res.status(404).send("404 not found roi kid");
        }
    })
});

app.get("/student",function (req,res){
    //liet ke sinh vien
    res.send("Student with GET");
});
app.post("/student",function (req,res){
    //them 1 sv
    res.send("Student with POST");
});
app.put("/student",function (req,res){
    //update sv
    res.send("Student with PUT");
});
app.delete("/student",function (req,res){
    //delete sv
    res.send("Student with DELETE");
});