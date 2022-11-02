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
