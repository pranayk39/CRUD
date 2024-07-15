const express=require('express')
const cors=require('cors')
const mysql=require('mysql')
const bodyParser=require('body-parser')
const app=express()
app.use(cors())
app.use(bodyParser.json())

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
})

db.connect(err=>{
    if(err){
        console.error("Error connection to database",err)
        return
    }
    console.log("connect to the database")
})

app.get('/',(req,res)=>{
    const sql="SELECT * FROM student"
    db.query(sql,(err,data)=>{
        if(err) return res.json({error:err})
        return res.json(data)
    })
})





app.post('/create',(req,res)=>{
    const {name,email}=req.body
    const sql="INSERT INTO student (Name , Email) VALUES (?, ?)"
    db.query(sql,[name,email],(err,data)=>{
        if(err) return res.json({error:err})
        return res.json(data)
    })
})

app.put('/update/:ID',(req,res)=>{
    const ID=req.params.ID
    const {name,email}=req.body
    const sql="UPDATE student SET Name = ?, Email = ? WHERE ID = ?"
    db.query(sql,[name,email,ID],(err,data)=>{
        if(err) return res.json({error:err})
        return res.json(data)
    })
})

app.delete('/delete/:ID',(req,res)=>{
    const ID=req.params.ID
    const sql="DELETE FROM student WHERE ID = ?"
    db.query(sql,[ID],(err,data)=>{
        if(err) return res.json({error:err})
        return res.json(data)

    })

})

app.listen(8080,()=>{
    console.log("server started  on port 8080")
})