import React from 'react';
import { AiOutlineRead } from "react-icons/ai";
import { getFirestore,collection, query, getDocs,doc,updateDoc,orderBy  } from '@firebase/firestore';
import { useEffect,useState } from 'react';
import Cookies from 'universal-cookie';
import Button from '@mui/material/Button';  
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { getStorage, ref , uploadBytesResumable , getDownloadURL } from "firebase/storage";
import FirebaseApp from '../firebase';

//-------------------------------------------//
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function Rules() 
{

    

   const db = getFirestore();
   const storage = getStorage(FirebaseApp);
   const metadata = {
   contentType: 'image/png'
   };
   const [open, setOpen] = React.useState(false);
   const [fileUrl, getFileUrl] = useState("https://firebasestorage.googleapis.com/v0/b/equipmentdb-97b5d.appspot.com/o/Rules.png?alt=media&token=7663a220-15b3-4773-9f40-b5252f23ba66");

   const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };



   const [DataList,setDataList] = useState([]);   
    //ทำงานตอนเริ่ม
    useEffect(()=> {
      getData();

    },[]);
    const cookies = new Cookies();
    
    const getData = async() => { 
    const q = query(collection(db, "Rules"),orderBy("RulesID", "asc"));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
     
      items.push(doc.data());    

    });
      setDataList(items);
    };

     

    const [FileImg,setFileImg] = useState([]);   

    const onFileChange = async (e) => {
      if(e.target.files[0]){
        setFileImg(e.target.files[0]);
 
      }
      };
 
      const OnFileUpload = async () =>{
      handleClose();
      const storageRef = ref(storage, 'Rules');
      const uploadTask = await uploadBytesResumable(storageRef, FileImg, metadata);
      getDownloadURL(uploadTask.ref).then((downloadURL) => {
      getFileUrl(downloadURL);
      console.log('File available at', downloadURL);
      })
      
      };

   return (




    <div className="container Default-Box-Set">
        <div className="text-center" style={{paddingTop : "5%" ,paddingBottom: "15%",textAlign : 'center'}}>
        <div className="SubBG"><AiOutlineRead size={50} className="icon-set-container"/>ระเบียบการยืม-คืน</div>
        
        <div className="SubBG-TextSet Card-Set border border-black">
        
        <div className="Home-Set">
        <div className='EditButton'>
        {(cookies.get('Status_User') === "Admin" && 
                 <Button  variant="outlined" startIcon={<EditOutlinedIcon />}  color="info" onClick={()=>handleClickOpen()}>แก้ไข</Button>                  
        )} 
        </div>
        <div style={{fontSize : 20 ,backgroundColor : "#FAFAF9"}}>
        
        {/* */}
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        
        {"แก้ไขระเบียบการยืม-คืน"}
           
            



         
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {"เลือกไฟล์ภาพใหม่"}
       
        
        
      
        </DialogContentText>  
        
        <DialogContentText id="alert-dialog-description">
        { <input type="file" id="fileImg" class="InsertBox-Set" 
          onChange={onFileChange}
          />} 
      
        
      
        </DialogContentText>   
                 
        
        </DialogContent>
        <DialogActions>
        <Button onClick={OnFileUpload}>ยืนยัน</Button>
        <Button onClick={handleClose} autoFocus style={{color: "red"}}>
         ยกเลิก
        </Button>
        </DialogActions>
        </Dialog>


{        <img className="ImgRules" src={fileUrl} alt="Rules"/>
}
        
        
                    
          
          
        
        
        
        
        
        
        
        
        
        
        
        
        
        
       

        
       
        </div>
        
        </div>
        
        </div>
        </div>
        </div>
         );
}

export default Rules;
