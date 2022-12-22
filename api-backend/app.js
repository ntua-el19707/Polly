const express  = require('express') ; //npm i express

const app = express() ;

//initialization for our express backend 
app.use(express.json());
//express. json() is a built in middleware function in Express. It parses incoming JSON requests and puts the parsed data in req.
app.use(express.urlencoded({ extended: true }));


const api_master_router  = require('./routes/master_api_router');
//in this module the routes for the /inteliq_api are created those are the routes tha we gone export to frontend api 

app.use('/inteliq_api',api_master_router);//load those routes  after /inteliq_api: their root 
app.use('/*',(req,res,next)=>{
    res.status(404).json({msg:"Resource not available"});
	//all the routes that have not been build yet will return this msg Resource not available status code:404
	
})
module.exports = app ;
