const express = require("express")
const router = express.Router()

router.get('/inputOutput',(req,res)=>{
    res.render("teste/inputOutput")
})

module.exports = router