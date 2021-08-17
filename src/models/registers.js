
const mongoose=require("mongoose");
const employeeScheme=new mongoose.Schema({
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:Number,
        require:true,
        unique:true

    },
    age:{
        type:Number,
        require:true,
      

    },
    password:{
        type:String,
        require:true,
        

    },
    confirmpassword:{
        type:String,
        require:true,
      

    },
})
// collections
const Register =new mongoose.model("Register",employeeScheme)
// const createDocument=async ()=>{
//     const demo=new  Register({
//         firstname:"testname",
//         lastname:"testlastname"
//     })
//     const result= await demo.save()
//     console.log(result)
// }
// createDocument();
module.exports=Register;
