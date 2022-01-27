import React from 'react';
import './Pages.css';
import { AiOutlineUserAdd } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import { getFirestore,collection, query, where, getDocs,setDoc,doc,updateDoc } from '@firebase/firestore';
import { getStorage, ref , uploadBytesResumable , getDownloadURL } from "firebase/storage";
import FirebaseApp from '../firebase';
import { useEffect,useState } from 'react';
import Cookies from 'universal-cookie';


function InsertUser() 
{

        //ทำงานตอนเริ่ม
        useEffect(()=> {
         const cookies = new Cookies();
            if(cookies.get('Status_User') !== "Admin")
            {
             window.location.href = "/NotFound";      
            }
            },[]);


        
        const db = getFirestore();
        const storage = getStorage(FirebaseApp);
        const metadata = {
         contentType: 'image/jpeg'
        };

        const [ID,setID] = useState();
        const [Name,setName] = useState("");
        const [StudentID,setStudentID] = useState();
        const [CardID,setCardID] = useState();
        const [StatusUser,setStatusUser] = useState("");
        const [CollegeYears, getCollegeYears] = useState("");
        
        const CheckButton = () => {

        if(ID&&Name&&StudentID&&CardID&&StatusUser&&CollegeYears  !== "" ){
            handleNew();
            }
        else
        {
            console.log("กรอกไม่ครบ");
            if(ID === ""){
                document.getElementById('textID').focus();
            }
            else if(Name === ""){
                document.getElementById('textName').focus();
            }
            else if(StudentID === ""){
                document.getElementById('textStudentID').focus();
            }
            else if(CardID === ""){
                document.getElementById('textCardID').focus();
            }
            else if(StatusUser === ""){
                document.getElementById('textStatusUser').focus();
            }
            else if(CollegeYears === ""){
                document.getElementById('textCollegeYears').focus();
 
            }
        }
      }
        
     const handleNew = async() => {  
     await getIndex();
     await UpdateNewID(ID);
     const docRef = doc(db,"User",ID.toString());
     const payload = {User_ID: ID ,User_Name: Name,Student_ID: StudentID,Card_ID: CardID,Status_User: StatusUser
     ,College_Years: CollegeYears};
     await setDoc(docRef,payload);
     window.location.reload();

     };

       //รันเลขยืม
    const getIndex = async() => { 
        const querySnapshot = await getDocs(collection(db, "Count"));
        querySnapshot.forEach((doc) => {
        const Count_User_ID = doc.data().Count_User_ID;
        const NextID =  (Count_User_ID+1);
        setID(NextID);

        }
        )
        
        };
        getIndex();

    
        //updateDoc
        const UpdateNewID = async(NextID) => {    
        const docRef = doc(db,"Count","1");
        const payload = {
            Count_User_ID: NextID,
        };
        await updateDoc(docRef,payload);
        };
      
          return (
          
          //UI
          <div className="container">
          <div className="text-center" style={{paddingTop : "10%" ,paddingBottom: "15%",paddingLeft: "15%",paddingRight: "15%",textAlign : 'center'}}>
          <h1 className="SubBG Login-Box-Set " ><AiOutlineUserAdd size={50} className="icon-set-container"/>เพิ่มผู้ใช้</h1>
          <div className="border border-black" >
          
          <form className="Form-Set-Insert" id="InsertForm">
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">รหัส</label>
          <div class="col-sm-10">
          <input type="text" id="textID" class="form-control form-control-sm InsertBox-Set" placeholder="รหัส" disabled="true"
          value={ID} 
          onChange={e => { setID(e.target.value); }}
          />
          </div>
          </div>
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">ชื่อ</label>
          <div class="col-sm-10">
          <input type="text" id="textName" class="form-control form-control-sm InsertBox-Set"  placeholder="ชื่อ"
          value={Name}
          onChange={e => { setName(e.target.value);  }}
          />
          </div>
          </div>
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">รหัสนักศึกษา</label>
          <div class="col-sm-10">
          <input type="text" id="textStudentID" class="form-control form-control-sm InsertBox-Set"  placeholder="รหัสนักศึกษา"
          value={StudentID}
          onChange={e => { setStudentID(e.target.value); }}
          />
          </div>
          </div>
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">รหัสบัตรประชาชน</label>
          <div class="col-sm-10">
          <input type="text" id="textsetCardID" class="form-control form-control-sm InsertBox-Set"  placeholder="รหัสบัตรประชาชน"
          value={CardID}
          onChange={e => { setCardID(e.target.value); }}
          />
          </div>
          </div>
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">สถานะ</label>
        
         
          
          <div className="radio-set">
        
          <input id="textStatusUser"  type="radio" name="status" value="User" onClick={()=> setStatusUser("User")}/>
          <label >ผู้ใช้</label><br/>
          <input  type="radio" name="status" value="Admin" onClick={()=> setStatusUser("Admin")}/>
          <label id="textStatusUser2" >แอดมิน</label>

          </div>
          </div>
          
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">ชั้นปี</label>
          <div class="col-sm-10">
          <input type="text" id="textCollegeYears" class="form-control form-control-sm InsertBox-Set"  placeholder="ชั้นปี"
          value={CollegeYears}
          onChange={e => { getCollegeYears(e.target.value); }}
          />
          </div>
          </div>
          

          <hr/>
          
          <Button id="ButtonConfirm" variant="primary" onClick={CheckButton} style={{backgroundColor:'#212F3D',color:'white'}} >ยืนยัน</Button>{' '}
          </form>      
            
          </div>
          </div>
          </div>

           );
  }
  
 
  export default InsertUser;
  
  