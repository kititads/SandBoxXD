import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getFirestore,collection, getDocs,doc,updateDoc } from '@firebase/firestore';
import FirebaseApp from '../firebase';
import { useEffect,useState } from 'react';
import "./Detail.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DetailToPending from './DetailToPending';
import Cookies from 'universal-cookie';
import Button from '@mui/material/Button';  
import moment from 'moment';
import TextField from '@mui/material/TextField';

//-------------------------------------------//
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function Detail(PropID)
{


  const db = getFirestore();
  const [LoanDate, setLoanDate] = useState(new Date());
  const [PeadingNumber, setPeadingNumber] = useState(0);
  const [MaxPeadingNumber, setMaxPeadingNumber] = useState(0);
  if(PeadingNumber<0)
  {
    setPeadingNumber(0);
  }
  if(PeadingNumber>MaxPeadingNumber)
  {
    setPeadingNumber(MaxPeadingNumber);
  }
  const [DataList,setDataList] = useState([]);
  const [ID,setID] = useState("");   
  const [Name,setName] = useState("");  
  const [Image,setImage] = useState("");
  
  //Dialog
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  const [buttondisabled, setbutton] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    window.location.href = "/pending";      

  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);

  };

  const handleClickOpen4 = () => {
    setOpen4(true);
  };

  const handleClose4 = () => {
    setOpen4(false);

  };


    //ทำงานตอนเริ่ม
    useEffect(()=> {
      getData();
    },[]);

    const getData = async() => { 
    const querySnapshot = await getDocs(collection(db, "Equipment"));
    const items = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const SeachCon = Number(PropID.ID) ; 
      if(SeachCon !== "")
      {
      if(doc.data().EM_ID === SeachCon){
      setID(doc.data().EM_ID)
      setName(doc.data().EM_Name)
      setImage(doc.data().EM_Image)

      items.push(doc.data())    
      }
      }
      else
      {
      items.push(doc.data())    
        
      }
    });
    if(items[0].EM_Status !== "พร้อมใช้งาน" )
    {
      setbutton("true");
    }
    setDataList(items);
    const MaxPN = (items[0].EM_Quantity-items[0].EM_UseQuantity);
    setMaxPeadingNumber(MaxPN)
    };
    


      //ยื่นคำขอยืม
      const Pending = async(NextID)  => { 
      await DetailToPending(ID,Name,Image,cookies.get('Student_ID'),cookies.get('User_Name'),PeadingNumber,LoanDate,NextID,cookies.get('College_Years'));
      handleClickOpen2();

      };

      const cookies = new Cookies();
      //เช็คว่าล็อกอินหรือยัง
      const CheckUser = async() => { 

      // if(cookies.get('Status_User') == "Admin" || "User")
      if(cookies.get('Status_User') != null)
      {
        if(PeadingNumber !== 0)
        {
        handleClickOpen();
        }
        else
        {
        handleClickOpen4();
        }
        
      }
      else
      {
        window.location.href = "/login";      

      }
      
      }
    
     //เช็คว่าเคยยืมไปแล้วหรือยัง
     const CheckPending = async() => { 
      handleClose();
  
      const querySnapshot = await getDocs(collection(db, "Pending"));
      var CheckM = "False" ;
      querySnapshot.forEach((doc) => {
        if(doc.data().EM_ID === ID && doc.data().Student_ID === cookies.get('Student_ID'))
        {
          CheckM = "True"
        }
      

      })
      if(CheckM === "False")
      {
        getIndex();
      }
      else
      {
        handleClickOpen3();

      }
      
      ;
    }
   
    //รันเลขยืม
    const getIndex = async() => { 
    handleClose();

    const querySnapshot = await getDocs(collection(db, "Count"));
    querySnapshot.forEach((doc) => {
    const Pending_ID = doc.data().Count_Pending_ID;
    const NextID =  (Pending_ID+1);
    UpdateNewID(NextID);
    Pending(NextID);
    }
    )
    
    };

    //อัพเดตเลขยืม
    const UpdateNewID = async(NextID) => {    
    const docRef = doc(db,"Count","1");
    const payload = {
      Count_Pending_ID: NextID,
    };
    await updateDoc(docRef,payload);
    };

    const ConvertTime = (Value) => {
      const TimeAfterFormat = moment(Value).format('DD/MM/YYYY');
      return TimeAfterFormat;
      };
     const TodeyDate = new Date; 
     
     

  return (

  
        
        <Container>
        {DataList.map((DL) => (
        
        <Row>
        <Col sm={5} className="BGDetail">
        <br/><br/>
           

            <div ><img src={DL.EM_Image}  className="img-set"/> </div>
            <div className="Detail">
            <br/>
            <div>รหัสอุปกรณ์ : {DL.EM_ID}</div>
            <div>ชื่ออุปกรณ์ : {DL.EM_Name}</div>
            <div>รายละเอียด</div>
            <div><textarea rows="4" cols="33" className="textarea-set" alt="" disabled>
            {DL.EM_Detail}
            </textarea></div>
            </div>
        
        </Col>
        <br/>
        <Col sm={7} className="BGDetail-V2">
        <div className="rightBox-set ">
        {DL.EM_Status === "พร้อมใช้งาน"  ? 
        <div style={{color:'green'}}>สถานะ : {DL.EM_Status}</div> : 
        DL.EM_Status === "ไม่พร้อมใช้งาน" ? 
        <div style={{color:'red'}}>สถานะ : {DL.EM_Status}</div> :
        <div style={{color:'blue'}}>สถานะ : {DL.EM_Status}</div>}
        
        <br/>
        <div style={{color:'Brown'}}>จำนวนคงเหลือ {DL.EM_Quantity-DL.EM_UseQuantity}</div>
        <br></br>
        <hr></hr>
        <br/>
        <div>
        <TextField
          id="outlined-number"
          label="จำนวนที่ต้องการยืม"
          type="number"
          size="small"
          style={{maxWidth: '190px'}}
          value={PeadingNumber}
          onChange={e => { setPeadingNumber(e.target.value); }}
          InputLabelProps={{
            shrink: true,
            
          }}
          
        />
        </div>
        <br></br>
        <div>ต้องการยืมถึงวันที่ </div>
        <br/>
        <div><DatePicker selected={LoanDate} 
             onChange = {(date) => setLoanDate(date)} 
             dateFormat ='dd/MM/yyyy'
             minDate = {new Date()}
             />         
        </div>
        <br/>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        {"ข้อความยืนยัน"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {"คุณต้องการยืมอุปกรณ์ใช่หรือไม่"}        
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
        {"จำนวน "+PeadingNumber+"  ชิ้น " }
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
        {"วันที่ " + ConvertTime(TodeyDate) + " ถึง "+ConvertTime(LoanDate)} 

       
        </DialogContentText>        
        </DialogContent>
        <DialogActions>
        <Button onClick={CheckPending}>ใช่</Button>
        <Button onClick={handleClose} autoFocus style={{color: "red"}}>
         ไม่ใช่
        </Button>
        </DialogActions>
        </Dialog>
    

        {/* Dialog 2 */}
        <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        {"ข้อความแจ้งเตือน"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {"ดำเนินคำขอยืมเรียบร้อยแล้ว โปรดรอการดำเนินการเพื่ออนุมัติ"}        
        </DialogContentText>
         
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose2}>รับทราบ</Button>
 
        </DialogActions>
        </Dialog>    

        {/* Dialog 3 */}
        <Dialog
        open={open3}
        onClose={handleClose3}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        {"ข้อความแจ้งเตือน"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {"คุณเคยยื่นขออนุมัติคำขอนี้แล้ว โปรดยกเลิกอันเก่าเพื่อขอใหม่"}        
        </DialogContentText>
         
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose3}>รับทราบ</Button>
 
        </DialogActions>
        </Dialog>   

        {/* Dialog 4 */}
        <Dialog
        open={open4}
        onClose={handleClose4}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        {"ข้อความแจ้งเตือน"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {"คุณยืมอุปกรณ์ 0 ชิ้นไม่ได้หรอกนะ"}        
        </DialogContentText>
         
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose4}>รับทราบ</Button>
 
        </DialogActions>
        </Dialog>  

        <div className="div-button" ><Button  disabled={buttondisabled} className="button-set"  variant="contained" color="success" onClick={CheckUser}>ยื่นเรื่องขอยืม</Button></div>
        <div className="div-button"><a href="javascript:history.back()"><Button  className="button-set" variant="contained" color="error">กลับ</Button></a></div>
        <br/>
        </div>
            
        </Col>
        </Row>
        ))}
        </Container>  
         
  );
}
export default Detail;