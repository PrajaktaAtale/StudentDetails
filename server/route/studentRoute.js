const express = require("express");
const Student = require("../model/studentModel")
const router = express.Router();

//Route 1: create an student using post request

router.post("/createStudent", async(req, res)=>{
      try {
        
       let student = await Student.create(req.body)
       res.status(200).json({ success: true, student })

      } catch (error) {
        
       console.log(error);
       res.status(500).json({ success: false, message: "Internal server error" })
      }
})

//Route 2: get an student using get request

router.get("/getStudent", async(req, res)=>{
    try {
        
      let student = await Student.find()
      res.status(200).json({ success: true, student })

    } catch (error) {
        
     console.log(error);
     res.status(500).json({ success: false, message: "Internal server error" })

    }
})

module.exports = router