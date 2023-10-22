const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const cors = require('cors')
const app = express()

const PORT = 3090

app.use(cors({origin:'*'}))

const BodyMiddleWare = bodyParser.json()

mongoose.connect('mongodb+srv://kitmern:kitmern321@cluster0.lgakdza.mongodb.net/').then(()=>{
    console.log("mongoDB connected")
}).catch((error)=>{
    console.log(error)
})


const peopleSchema = {
    name:{
       type: String,
    
    },
    email:{
        type: String,
        //required:true
    }
}

const People = mongoose.model('People',peopleSchema)



//CREATE
app.post('/people' ,BodyMiddleWare, async(req,res)=>{
const {name , email} = req.body

    const AddPeople =await People.create({name})
     res.send("User Added")

})


//READ
app.get('/people',async(req,res)=>{
const getPeople =  await People.find()
res.send(getPeople)
})


//UPDATE
app.put('/people/:id' ,BodyMiddleWare, async(req,res)=>{

    try{
        const {id} = req.params
        console.log("THE ID IS Updated by ANAS",id)
            const updatePeople = await People.findByIdAndUpdate(id , 
                {name:req.body.name},
                {new:true}
                
                )
            res.send(updatePeople)

    }catch(error){
        console.log(error)
    }
 
})


//DELETE
app.delete('/people/:id' ,BodyMiddleWare , async(req,res)=>{
    const {id} = req.params
const deletePeople = await People.findByIdAndDelete(id)
res.send(deletePeople)
})



app.listen(PORT , ()=>`Server is Running on ${PORT}`)