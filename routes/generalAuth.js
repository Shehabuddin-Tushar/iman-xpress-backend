const express = require("express");
const router = express.Router();
const general = require("../models/generalUser");

router.post("/saveuser", async (req, res) => {
    console.log(req.body)
    try {
        user = await general.create({
           
            email: req.body.email,
            password: req.body.password,
            role:req.body.role  
        });
      
        res.json({success:"registration successfully" })

    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
})

router.get("/getuserdata/:email", async (req, res) => {
    const myemail=req.params.email

    user = await general.findOne({ email: myemail })
    
    res.json(user)
})


router.get("/getallusers", async (req, res) => {
    try {
        const allusers= await general.find({role:"viewer"})

        res.json({ allusers: allusers })
    } catch (err) {

        res.status(500).send("Internal server error")
    }
})
// find all user 
router.get("/getalluserswithadmin", async (req, res) => {
    try {
        const allusers= await general.find({role:"admin"})

        res.json({ allusers: allusers })
    } catch (err) {

        res.status(500).send("Internal server error")
    }
})
// MAKE ADMIN 
router.put('/getallusers/admin',async(req,res)=>{
    console.log(req.body);
    const user=req.body;
    const filter={email: user.email};
    const updateDoc={$set: {role:'admin'}};
    const result=await general.updateOne(filter,updateDoc);
    res.json(result);
    console.log(result);
})
// router.get("/getallusers/admin"), async(req,res)=>{
//     try {
//         const allusers= await general.find({role:"admin"})

//         res.json({ allusers: allusers })
//     } catch (err) {

//         res.status(500).send("Internal server error")
//     }
//     console.log(allusers);
// }
router.get("/getuserbyid/:id", async (req, res) => {
    try {
     
        const userinfo = await general.findById(req.params.id).select("-password")
      
        res.json({userdata:userinfo})
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Internal server error")
    } 
})



module.exports = router