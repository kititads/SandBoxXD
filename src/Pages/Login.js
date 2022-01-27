import React from 'react';
import { RiLoginBoxLine } from "react-icons/ri";
import Button from '@material-ui/core/Button';
import Form from 'react-bootstrap/Form';
import './Pages.css';
import Cookies from 'universal-cookie';
import { useState,useEffect } from 'react';
import { getFirestore,collection, query, where, getDocs,setDoc,doc,updateDoc } from '@firebase/firestore';
  function Login() {
  const db = getFirestore();
  const [StudentID,setStudent_ID] = useState("");
  const [Password,setPassword] = useState("");
  const [HideText,setHideText] = useState("true");

      //เช็คล็อกอิน  

      useEffect(()=> {
        const cookies = new Cookies();
        if(cookies.get('Status_User') === "Admin" |
           cookies.get('Status_User') === "User" 

        )
        { 
          window.location.href = "/";      
        }
        
      });
  

      const cookies = new Cookies();
      const CheckLogin = async() => { 
      const q = query(collection(db, "User"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if(doc.data().Student_ID.toString() === StudentID
        && doc.data().Card_ID.toString() === Password
        )
        {
          cookies.set('User_Name'  , doc.data().User_Name, { path: '/' });
          cookies.set('Status_User', doc.data().Status_User, { path: '/' });
          cookies.set('Student_ID' , doc.data().Student_ID, { path: '/' });
          cookies.set('College_Years' , doc.data().College_Years, { path: '/' });

          

          //ถูก
          console.log("ถูกต้องนะครับ"); 
          console.log(cookies.get('User_Name')); 
          console.log(cookies.get('Status_User')); 
          console.log(cookies.get('Student_ID')); 
          window.location.reload();
          
        }
       

      }
      );
      if(cookies.get('Status_User') == null)
      {
        setHideText("")
      }
      }
      
  


  return (
    <div className="container Login-Box-set">
        <div className="text-center" style={{margin : "17%" ,textAlign : 'center'}}>
        <h1 className="SubBG Login-Box-Set " ><RiLoginBoxLine size={40} className="icon-set-container"/>เข้าสู่ระบบ</h1>
        <div className="Login-Set border border-black" >
        <Form>
        <Form.Group className="mb-3" controlId="formBasicStudent ID">
        <Form.Label className="Login-label">รหัสนักศึกษา</Form.Label>
        <Form.Control type="text" placeholder="Enter Student ID" 
         value={StudentID}
         onChange={e => { setStudent_ID(e.target.value); }}

        />
        <Form.Text className="text-muted">
        </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="Login-label">รหัสบัตรประชาชน</Form.Label>

        
        <Form.Control type="password" placeholder="Password"
         value={Password}
         onChange={e => { setPassword(e.target.value); }}
         
         />
         <label className="LoginText" hidden={HideText}>ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง !</label>

        
        </Form.Group>

        


        <Button variant="contained" style={{backgroundColor:'#212F3D',color:'white'}} onClick={CheckLogin}>เข้าสู่ระบบ</Button>{' '}
        </Form>
        <br/>
        </div>
        </div>
        </div>
         );

}

export default Login;
