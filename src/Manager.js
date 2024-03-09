import { useEffect, useState } from "react"
import './App.css' ;
import { Link } from "react-router-dom";

const Manager = () => {

    const [ employeeid  , setEmployeeid] = useState(0) ;
    const [ employeedata , setEmployeedata ] = useState({});
    const [ employeesheet , setEmployeesheet ] = useState([]) ;
    const [ showdata , setShowdata ] = useState(false);

    const handleinput1 =  async() => {

        await fetch('http://localhost:5000/fetch-employee-data', {
          method : 'POST' ,
          headers : {
              'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            'Employeeid' : employeeid 
        })

      }).then( res => res.json() )
      .then( (res)=> {
            
            console.log( res  );
            const updated = new Array( res.Timesheet ) ;
            setEmployeesheet(...updated);
            console.log( employeesheet  ) ;
            const temp  = {
                'Name' : res.Name ,
                'Employeeid' : res.Employeeid ,
                'Totalhours' : res.Totalhours 
            }
            setEmployeedata(temp);
            setShowdata(true);
      })
      .catch( (err) => {
            console.log("Eroor in fetching data");
      })

};

 const handleinput2 = async(rating) => {

    
    await fetch('http://localhost:5000/give-rating', {
        method : 'POST' ,
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          'Rating' : rating  ,
           'Employeeid' : employeeid 
      })

    }).then( (res) => {
            if( res.status == 500 )
            {
                alert("Rating Not Updated")
                throw new Error("Rating not updated");
            }
            else
            {
                alert("Rating Updated");
            }
    })
    .catch( (err) => {
          console.log("Eroor in updating rating");
    })


 }
    return(
        <>
        
        <div style={{width:'50%' , marginLeft:'25%', display:'flex' , flexDirection:'column' , flex:'1' , alignItems:'center'}}>
            <Link to='/'>Home</Link>
            <h1 style={{textAlign:'center'}}>Manager View</h1>
            <form style={{ width:'100%' , display:'flex' , font:'4px' , flexDirection: 'column' , alignItems:'center' ,  border:'1px solid black'}}>
                <div style={{padding:'1%'}} > 
                    <label style={{ fontWeight:'bold'}}htmlFor='employeeid'>Employee ID : </label>
                    <input value={employeeid} onChange={ (e)=> setEmployeeid(e.target.value )} id='employeeid' type='text' placeholder='Employee ID' required ></input>
                </div>
                <button onClick={ (e) => {e.preventDefault() ; handleinput1() } } type="submit">Submit</button>
            </form>
        </div>
        {    
            showdata === true?  <>
                <div style={{ width:'50%' , marginLeft:'25%', display:'flex' , flexDirection:'column' , flex:'1'}}>
                    
                    <div>
                        <h3>Employee Name : { employeedata.Name}</h3>
                        <h3>Employee ID : { employeedata.Employeeid}</h3>
                        <h3>Total Hours : { employeedata.Totalhours}</h3>
                    </div>
                   
                    <h3 style={{textAlign:'center'}}> Timesheet </h3>
                    <table style={{  backgroundColor:'#f2f2f2' , borderCollapse:'collapse' , width: '100%' , border: '2px solid #dddddd' }} >
                        <thead>
                                <tr style={{width:'100%'}}>
                                    <th>Date</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Work</th>
                                </tr>
                        </thead>
                        <tbody>
                        {
                            employeesheet.map( (obj,index) => {
                                return (<tr style={{alignItems:'center' , paddingLeft:'3%', border:'1px solid black'}}  key={index}>
                                    <td style={{paddingLeft:'10%'}}>{obj.date}</td>
                                    <td style={{paddingLeft:'8%' }} >{obj.start}</td>
                                    <td style={{paddingLeft:'8%'}} >{obj.end}</td>
                                    <td style={{paddingLeft:'10%'}} >{obj.work}</td>
                                </tr>);
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div style={{  marginLeft:'40%' , marginTop:'2%' }} >
                        <h3 style={{ marginLeft:'7rem'}}>Rating </h3>
                        <button className="ratingbtn" style={{  marginRight:'1rem' , borderRadius:'50%' , minHeight:'2.9rem' , minWidth : '2.9rem'}} onClick={ (e) => {e.preventDefault() ; handleinput2(5) }}>5</button>
                        <button className="ratingbtn"  style={{  marginRight:'1rem' , borderRadius:'50%' , minHeight:'2.9rem' , minWidth : '2.9rem'}} onClick={ (e) => {e.preventDefault() ; handleinput2(4) }}>4</button>
                        <button className="ratingbtn"  style={{  marginRight:'1rem' , borderRadius:'50%' , minHeight:'2.9rem' , minWidth : '2.9rem'}} onClick={ (e) => {e.preventDefault() ; handleinput2(3) }}>3</button>
                        <button className="ratingbtn"  style={{  marginRight:'1rem' , borderRadius:'50%' , minHeight:'2.9rem' , minWidth : '2.9rem'}} onClick={ (e) => {e.preventDefault() ; handleinput2(2) }}>2</button>
                        <button className="ratingbtn"  style={{  marginRight:'1rem' , borderRadius:'50%' , minHeight:'2.9rem' , minWidth : '2.9rem'}} onClick={ (e) => {e.preventDefault() ; handleinput2(1) }}>1</button>
                    </div>
                </>: null 
        }
        </>
    );
}

export default Manager ;