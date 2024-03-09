import express from 'express' ;
import mongoose, { Mongoose, mongo } from 'mongoose' ;
import path from 'path' ;
import { fileURLToPath } from 'url' ;
import { dirname } from 'path';
import os from 'os' ;
import bodyParser from 'body-parser';
import cors from 'cors' ;
 
const app = express();
app.listen( 3000 , () => {
    console.log("Server started listening 3000");
});

await mongoose.connect( 'mongodb://localhost:27017/Timesheet').then(  () => {
    console.log("Database Connected succesfully");
}).catch( () => {
    console.log("Database connection failed");
})

app.use(cors()) ;
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use( express.static(path.resolve( __dirname , '../build' )))

const EmployeeSchema = new mongoose.Schema({
    'Name' : {
        type : String ,
        required : true 
    },
    'Employeeid' : {
        type : Number ,
        required : true 
    },
    'Totalhours' : {
        type : Number ,
        required : true 
    },
    'Timesheet' : {
        type : Object ,
        required : true 
    },
    'Rating' : {
        type: Number,
        default : -1 
    }
});

app.use( bodyParser.json() );
const EmployeeModel = mongoose.model( 'Employee' , EmployeeSchema , "Employee");


const middleware = async(req,res,next) => {

    await EmployeeModel.findOne({
        'Employeeid' : req.body.Employeeid 
    }).then( (data) => {
        
        if( data == null || data.length == 0 || data.Rating == -1 )
            next();
        else    
            res.status(205).json({ message : "Can not update"})

    })
}
app.post( '/employee-data' , middleware ,  async(req,res) => {

    const EmployeeData =  new EmployeeModel({
            'Name' : req.body.Name ,
            'Employeeid' : req.body.Employeeid ,
            'Totalhours' : req.body.Totalhours ,
            'Timesheet' : req.body.Timesheet
    });

    await EmployeeData.save().then( (data) => {
        console.log("succed inserted");
        res.status(200).json({message: "Data Inserted"});
    })
    .catch(error => {
        console.log("error occured");
        res.status(500).json({message: "Data Insertion Failed"});
    })

})


app.post( '/fetch-employee-data' , async( req,res ) => {

    console.log("api called" , req.body );
    await EmployeeModel.findOne({
            'Employeeid' : req.body.Employeeid 
    }).then( (data) => {
        console.log("Data fetched" , data );
        res.status(200).send(data) ;
    })
    .catch( (error) => {
        console.log("Error occured in data fetching");
        res.status(500).json({message : 'No data found'});
    })

})

app.post('/give-rating' , async(req,res) => {

    console.log( req.body );
    await EmployeeModel.findOneAndUpdate({
        'Employeeid' : req.body.Employeeid
    }, {
          $set :  {
             'Rating' : req.body.Rating 
          }
    }).then( ()=> {
        console.log("successfully updaed rating");
        res.status(200).json({message:'Rating updated'})
    })
    .catch( ()=> {
        console.log("Not updated");
        res.status(500).json({message:'Rating Not updated'})
    })
})