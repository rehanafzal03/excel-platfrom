const ensureAuthenticated = require('../Middlewears/Auth');

const router = require('express').Router();


router.get('/', ensureAuthenticated, (req,res)=>{
    console.log("----- login user in detail ----", req.user);
   res.status(200).json([
    {
        name: "excel analysing platform",
        
    },
     {
        name: "A web app which is used to analyse the functionality of excel sheet show data, chart, graphs etc",  
        
    },
   ])
});  


module.exports = router; 