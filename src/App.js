import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";

function App() {

  const [ name , setName ] = useState('');
  const [ employeeid , setEmployeeid ] = useState(0);
  const [ totalhours , setTotalhours ] = useState(0) ;

  const todaydate = new Date() ;
  const currtime = todaydate.getHours()+':'+ todaydate.getMinutes()+':'+ todaydate.getSeconds();

  const defaultobj = {
    date : todaydate.toISOString().slice(0,10) ,
    start : currtime ,
    end : currtime ,
    work : ''
  };
  const [ timesheet  , setTimesheet ] = useState([ defaultobj , defaultobj , defaultobj , defaultobj , defaultobj, defaultobj , defaultobj , defaultobj , defaultobj , defaultobj]);

  const handledainput1 = (index,key,value) => {
 
      const updatedata = timesheet.map( (obj)=> {
            return {...obj} ;
      })
      updatedata[index][key] = value  ;
      setTimesheet(updatedata); 
  };

  const handledainput2 = async() => {

    const data = {
          'Name' : name ,
          'Employeeid' : employeeid ,
          'Totalhours' : totalhours ,
          'Timesheet' : timesheet 
    }

            await fetch('http://localhost:5000/employee-data', {
                method : 'POST' ,
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            }).then( (res) => {
                  if( res.status == 500 )
                  {
                    console.log("eror");
                    alert("Data Not Inserted");
                  }
                  else if ( res.status == 205 )
                  {
                      alert("Your Have Been Rated");
                  }
                  else
                  {
                    alert("Data Inserted");
                  }
            })
    }
  return (
    <div className="App" style={{ width:'50%' , backgroundColor:'white' , color:'black',  marginLeft:'25%'}}>
        <Link to = '/Manager'>Manager Page</Link>
        <h1>TimeSheet</h1>
        <form style={{  fontSize:'1.3rem' , display:'flex' , flexDirection: 'column' , justifyContent:'space-between', flex:'1', border:'1px solid black'}}>
            <div style={{padding:'1%'}}> 
                <label htmlFor='name'>Name : </label>
                <input value={name} onChange={ (e)=> setName(e.target.value )} id='name' type='text' placeholder='Employee Name' required ></input>
            </div>
            <div style={{padding:'1%'}} > 
                <label htmlFor='employeeid'>Employee ID : </label>
                <input value={employeeid} onChange={ (e)=> setEmployeeid(e.target.value )} id='employeeid' type='text' placeholder='Employee ID' required ></input>
            </div>
            <div style={{padding:'1%'}} > 
                <label htmlFor='totalhours'>Total Hours : </label>
                <input value={totalhours} onChange={ (e)=> setTotalhours(e.target.value )} id='totalhours' type='number' placeholder='Total Hours'  required ></input>
            </div>
            <br/>
            <table>
                <thead>
                      <tr>
                          <th>Date</th>
                          <th>Start Time</th>
                          <th>End Time</th>
                          <th>Work</th>
                      </tr>
                </thead>
                <tbody>
                      <tr>
                          <td><input value = { timesheet[0].date } onChange={ (e) => handledainput1(0,'date',e.target.value) }  type='date' />  </td>
                          <td><input value={ timesheet[0].start } onChange={ (e) => handledainput1(0,'start',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[0].end }  onChange={ (e) => handledainput1(0,'end',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[0].work } onChange={ (e) => handledainput1(0,'work',e.target.value) } type='text'/> </td>
                      </tr>
                      <tr>
                          <td><input value = { timesheet[1].date } onChange={ (e) => handledainput1(1,'date',e.target.value) }  type='date' />  </td>
                          <td><input value={ timesheet[1].start } onChange={ (e) => handledainput1(1,'start',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[1].end }  onChange={ (e) => handledainput1(1,'end',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[1].work } onChange={ (e) => handledainput1(1,'work',e.target.value) } type='text'/> </td>
                      </tr>
                      <tr>
                          <td><input value = { timesheet[2].date } onChange={ (e) => handledainput1(2,'date',e.target.value) }  type='date' />  </td>
                          <td><input value={ timesheet[2].start } onChange={ (e) => handledainput1(2,'start',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[2].end }  onChange={ (e) => handledainput1(2,'end',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[2].work } onChange={ (e) => handledainput1(2,'work',e.target.value) } type='text'/> </td>
                      </tr>
                      <tr>
                          <td><input value = { timesheet[3].date } onChange={ (e) => handledainput1(3,'date',e.target.value) }  type='date' />  </td>
                          <td><input value={ timesheet[3].start } onChange={ (e) => handledainput1(3,'start',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[3].end }  onChange={ (e) => handledainput1(3,'end',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[3].work } onChange={ (e) => handledainput1(3,'work',e.target.value) } type='text'/> </td>
                      </tr>
                      <tr>
                          <td><input value = { timesheet[4].date } onChange={ (e) => handledainput1(4,'date',e.target.value) }  type='date' />  </td>
                          <td><input value={ timesheet[4].start } onChange={ (e) => handledainput1(4,'start',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[4].end }  onChange={ (e) => handledainput1(4,'end',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[4].work } onChange={ (e) => handledainput1(4,'work',e.target.value) } type='text'/> </td>
                      </tr>
                      <tr>
                          <td><input value = { timesheet[5].date } onChange={ (e) => handledainput1(5,'date',e.target.value) }  type='date' />  </td>
                          <td><input value={ timesheet[5].start } onChange={ (e) => handledainput1(5,'start',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[5].end }  onChange={ (e) => handledainput1(5,'end',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[5].work } onChange={ (e) => handledainput1(5,'work',e.target.value) } type='text'/> </td>
                      </tr>
                      <tr>
                          <td><input value = { timesheet[6].date } onChange={ (e) => handledainput1(6,'date',e.target.value) }  type='date' />  </td>
                          <td><input value={ timesheet[6].start } onChange={ (e) => handledainput1(6,'start',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[6].end }  onChange={ (e) => handledainput1(6,'end',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[6].work } onChange={ (e) => handledainput1(6,'work',e.target.value) } type='text'/> </td>
                      </tr>
                      <tr>
                          <td><input value = { timesheet[7].date } onChange={ (e) => handledainput1(7,'date',e.target.value) }  type='date' />  </td>
                          <td><input value={ timesheet[7].start } onChange={ (e) => handledainput1(7,'start',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[7].end }  onChange={ (e) => handledainput1(7,'end',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[7].work } onChange={ (e) => handledainput1(7,'work',e.target.value) } type='text'/> </td>
                      </tr>
                      <tr>
                          <td><input value = { timesheet[8].date } onChange={ (e) => handledainput1(8,'date',e.target.value) }  type='date' />  </td>
                          <td><input value={ timesheet[8].start } onChange={ (e) => handledainput1(8,'start',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[8].end }  onChange={ (e) => handledainput1(8,'end',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[8].work } onChange={ (e) => handledainput1(8,'work',e.target.value) } type='text'/> </td>
                      </tr>
                      <tr>
                          <td><input value = { timesheet[9].date } onChange={ (e) => handledainput1(9,'date',e.target.value) }  type='date' />  </td>
                          <td><input value={ timesheet[9].start } onChange={ (e) => handledainput1(9,'start',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[9].end }  onChange={ (e) => handledainput1(9,'end',e.target.value) } type='time'/> </td>
                          <td><input value={ timesheet[9].work } onChange={ (e) => handledainput1(9,'work',e.target.value) } type='text'/> </td>
                      </tr>
                      
                </tbody>
            </table>
            <button type="submit" style={{marginTop:'2%' , fontSize:'1.5rem'}} onClick={ (e) => { e.preventDefault() ; handledainput2(); }} >Submit</button>
        </form>
    </div>
  );
  
}

export default App;
