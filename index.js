// var x = 10;
// console.log("Hello world!! x="+x);
//ví dụ
const express = require("express"); //thuê thợ xây
const app = express();  //app là cái nhà
const PORT = process.env.PORT || 5000;  //lấy cổng 5000
app.listen(PORT,function (){
   console.log("Server is running..."); //Mở cổng
});
//config to connect mysql
const configDB ={
    host: "localhost",
    port:3306,
    database: "t2207e",
    user:"root",
    password:""  ,  //dung win thi bo trong
    multipleStatements: true //cho phep su dung nhieu cau SQL 1 lan gui yeu cau
};
var ls = [
    {
        id: 1,
        name:"Nguyễn Minh Khánh",
        age: 19,
        mark:10
    },
    {
        id:2,
        name:"Trần Bùi Thành",
        age:19,
        mark:3
    }
];
app.get("/demo",function (req,res){
    res.send("hello world!");     //thuê nhân viên
});

app.get("/get_data",function (req,res){
   var data ={
       name:"Nguyễn Văn An",
       age:18,
       mark: 9
   }
    res.send(ls);     //thuê nhân viên
});

app.get("/deltaill",function (req,res) {
    var paramId = req.query.id;
    var data;
    for(var i=0;i<ls.length;i++){
        if (ls[i].id == paramId){
            data = ls[i];
            break;
        }
    }
    res.send(data);
});
app.get("/edit",function (req,res){
   var paramId = req.query.id;
   var paramName = req.query.name;
   var paramAge = req.query.age;
   for(var i=0;i<ls.length;i++){
       if(ls[i].id == paramId){
           ls[i].name = paramName;
           ls[i].age = paramAge;
           break;
       }
   }
   res.send("done kid");
});

app.get("/create",function (req,res){
    var paramId = req.query.id;
    var paramName = req.query.name;
    var paramAge = req.query.age;
    var check = false;
    for(var i=0;i<ls.length;i++){
        if(ls[i].id == paramId){
            check =true;
            break;
        }
    }
    if(check == false){
        ls.push({
            id: paramId,
            name: paramName,
            age: paramAge,
        })
    }
    res.send("done kid");
});
app.get("delete",function (req,res){
    var paramdId= req.query.id;                 //xóa
    var p=-1;
    for ( var i=0;i<ls.length;i++){
        if(ls[i].id == paramdId){
            p=i;
        }
    }
    if(p!=-1){
        ls.splice(p,1);
    }
    res.send("done");
});
//chạy lại terminal file (node index.js) để mở trong host 5000
//chạy lại terminal ctrl + C rồi chạy lại (node index.js)




//share api access all
app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type, Accept");
})



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

