const express=require('express')
const app=express();
const path=require('path')
const hbs= require("hbs")
require("./db/connection")
const Register=require("./models/registers")

const port = process.env.PORT || 3000
const static_path=path.join(__dirname,"../public")
const template_path=path.join(__dirname,"../templates/views")
const partials_path=path.join(__dirname,"../templates/partials")

// app.get("/",(req,res)=>{
//     res.send("welcome to node js project")

// })

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path)
app.get("/",(req,res)=>{
        res.render("index")
    
    })
app.get("/register",(req,res)=>{
        res.render("register");
    
    })
    app.get("/login",(req,res)=>{
        res.render("login");
    
    })
    app.post("/register",async(req,res)=>{
        // res.render("register");
        try{
            const password =req.body.password;
            const cpassword=req.body.confirmpassword;
            if(password=== cpassword)
            {
                const registerEmployee = new Register({
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    email:req.body.email,
                    phone:req.body.phonenumber,
                    age:req.body.age,
                    password:req.body.password,
                    confirmpassword:req.body.confirmpassword,


                    
                })
                // save to db
                const registered=await registerEmployee.save()
                res.status(201).render("index")
                console.log(registered)
                alert("data save sucessfuly")
            }
            else{
                res.send("password mot matching")
            // alert("password not matching")
            }
        }
        catch (error){
            res.status(400).send(error)
        }
    
    })
    // login
    app.post("/login", async (req,res)=>{
        try
        {
            const email=req.body.email
            const password=req.body.password
            //  console.log(`Email is ${email} password is ${password}`)
           const username= await Register.findOne({email:email})//email
          if(username.password === password)
          {
              res.status(201).render("index")
          }
          else{
              res.send("password are not matching...")
          }
        //    res.render("index")
            // console.log(username)
        }
        catch (err){
            res.status(400).send("invalid email...")

        }


    })
app.listen(port,()=>{
    console.log(`server in running at port number ${port}`)
})