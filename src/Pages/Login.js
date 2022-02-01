import React from 'react';
import { AiOutlineLogin } from "react-icons/ai";
import Button from '@material-ui/core/Button';
import Form from 'react-bootstrap/Form';
import './Pages.css';
import Cookies from 'universal-cookie';
import { useState,useEffect } from 'react';
import { getFirestore,collection, query, where, getDocs,setDoc,doc,updateDoc } from '@firebase/firestore';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

//-------------------------------------------//
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const clientId = "609757328680-8be0i19gojs777cb5ijff0q55h21ftv0.apps.googleusercontent.com";




function LoginRMUTK() {


    const [open, setOpen] = React.useState(false);
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const onLoginSuccess = (res) => {
        CheckLogin(res.profileObj);
        // setShowloginButton(false);
        // setShowlogoutButton(true);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
    };




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
      const CheckLogin = async(EmailData) => { 
      const q = query(collection(db, "User"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if(doc.data().Email.toString() === EmailData.email )
        {

          cookies.set('User_ID'  , doc.data().User_ID, { path: '/' });
          cookies.set('User_Name'  , doc.data().User_Name, { path: '/' });
          cookies.set('Status_User', doc.data().Status_User, { path: '/' });
          cookies.set('Student_ID' , doc.data().Student_ID, { path: '/' });
          cookies.set('College_Years' , doc.data().College_Years, { path: '/' });

          

          //ถูก
          
          window.location.reload();
          
        }
       

      }
      );
      if(cookies.get('Status_User') == null)
      {
        handleClickOpen();
      }
      }
      
  


  return (


    
    <div className="container Login-Box-set">
        <div className="text-center" style={{margin : "20%" ,textAlign : 'center'}}>
        <div style={{paddingTop:100,paddingBottom:100}} className="Login-Set  " >
        
            <div>
            { showloginButton ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText=" ลงชื่อเข้าใช้งาน "
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                /> : null}

            { showlogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText="ออกจากระบบ"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
        </div>
        <br/>
        </div>
        </div>

        {/* Dialog 4 */}
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        {"ข้อความแจ้งเตือน"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {"ไม่พบผู้ใช้อีเมลนี้"}        
        </DialogContentText>
         
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>ปิด</Button>
 
        </DialogActions>
        </Dialog>  

        </div>

        
         );

}

export default LoginRMUTK;
