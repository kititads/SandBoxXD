import React from 'react';
import './Pages.css';
import { MdInsertDriveFile } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import { getFirestore,collection, query, where, getDocs,setDoc,doc,updateDoc } from '@firebase/firestore';
import { getStorage, ref , uploadBytesResumable , getDownloadURL } from "firebase/storage";
import FirebaseApp from '../firebase';
import { useEffect,useState } from 'react';
import Cookies from 'universal-cookie';


function InsertEM() 
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

        const [ID,setID] = useState("");
        const [Name,setName] = useState("");
        const [Location,setLocation] = useState("");
        const [Detail,setDetail] = useState("");
        const [Status,setStatus] = useState("");
        const [fileUrl, getFileUrl] = useState("");
        
        const CheckButton = () => {

        if(ID&&Name&&Location&&Detail&&Status&&fileUrl  !== "" ){
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
            else if(Location === ""){
                document.getElementById('textLocation').focus();
            }
            else if(Detail === ""){
                document.getElementById('textDetail').focus();
            }
            else if(Status === ""){
                document.getElementById('status_radio_Available').focus();
            }
            else
            {
                console.log("ใส่รูปภาพ");
 
            }
        }
      }
        

      
        
      

     const onFileChange = async (e) => {
     if(e.target.files[0]){
      OnFileUpload(e.target.files[0]);

     }
     };

     const OnFileUpload = async (FileImg) =>{
     const storageRef = ref(storage, 'images/'+ID);
     const uploadTask = await uploadBytesResumable(storageRef, FileImg, metadata);
     getDownloadURL(uploadTask.ref).then((downloadURL) => {
     getFileUrl(downloadURL);
     console.log('File available at', downloadURL);
     })

     };


     const handleNew = async() => {  
     await getIndex();
     await UpdateNewID(ID);
     const docRef = doc(db,"Equipment",ID.toString());
     const payload = {EM_ID: ID ,EM_Detail: Detail,EM_Image: fileUrl,EM_Location: Location,EM_Name: Name
     ,EM_Status: Status};
     await setDoc(docRef,payload);
     window.location.reload();

     };

       //รันเลขยืม
    const getIndex = async() => { 
        const querySnapshot = await getDocs(collection(db, "Count"));
        querySnapshot.forEach((doc) => {
        const Count_EM_ID = doc.data().Count_EM_ID;
        const NextID =  (Count_EM_ID+1);
        setID(NextID);

        }
        )
        
        };
        getIndex();

    
        //updateDoc
        const UpdateNewID = async(NextID) => {    
        const docRef = doc(db,"Count","1");
        const payload = {
            Count_EM_ID: NextID,
        };
        await updateDoc(docRef,payload);
        };
      
          return (
          
          //UI
          <div className="container">
          <div className="text-center" style={{paddingTop : "10%" ,paddingBottom: "15%",paddingLeft: "15%",paddingRight: "15%",textAlign : 'center'}}>
          <h1 className="SubBG Login-Box-Set " ><MdInsertDriveFile size={40} className="icon-set-container"/>Insert Equipment</h1>
          <div className="border border-black" >
          
          <form className="Form-Set-Insert" id="InsertForm">
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">ID</label>
          <div class="col-sm-10">
          <input type="text" id="textID" class="form-control form-control-sm InsertBox-Set" placeholder="ID" disabled="true"
          value={ID} 
          onChange={e => { setID(e.target.value); }}
          />
          </div>
          </div>
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">Name</label>
          <div class="col-sm-10">
          <input type="text" id="textName" class="form-control form-control-sm InsertBox-Set"  placeholder="Name"
          value={Name}
          onChange={e => { setName(e.target.value);  }}
          />
          </div>
          </div>
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">Location</label>
          <div class="col-sm-10">
          <input type="text" id="textLocation" class="form-control form-control-sm InsertBox-Set"  placeholder="Location"
          value={Location}
          onChange={e => { setLocation(e.target.value); }}
          />
          </div>
          </div>
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">Detail</label>
          <div class="col-sm-10">
          <textarea rows="6"  type="text" id="textDetail" class="form-control form-control-sm InsertBox-Set"  placeholder=""
          value={Detail}
          onChange={e => { setDetail(e.target.value); }}
          />
          </div>
          </div>
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">Status</label>
        
         
          
          <div className="radio-set">
        
          <input id="status_radio_Available"  type="radio" name="status" value="Available" onClick={()=> setStatus("Available")}/>
          <label >Available</label><br/>
          <input  type="radio" name="status" value="Unavailable" onClick={()=> setStatus("Unavailable")}/>
          <label id="status_radio_Unavailable" >Unavailable</label>

          </div>
          </div>
          <hr/>

          <div class="form-group row">

          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">Image</label>
          <div class="col-sm-3">      
          <br/>

          <input type="file" id="fileImg" class="InsertBox-Set" 
          onChange={onFileChange}
          />
          </div>
          <div>

          </div>
          </div>
          <br/>
          <div className="ImgText">     
                   Image Preview           
          </div>
          <div >

          <br/>
         
           {(fileUrl !== "") ? 
           <img className="ImgEdit" src={fileUrl}  style={{width:"250px",height:"200px"}}/>
           : 
           <img className="ImgEdit" src="https://firebasestorage.googleapis.com/v0/b/equipmentdb-97b5d.appspot.com/o/unnamed.png?alt=media&token=201ed71d-b3ac-4f34-af67-9c0c5e30bd8d"
            style={{width:"250px",height:"200px"}}/>}
            
          </div>

          <br/>
          <br/>

          <hr/>
          
          <Button id="ButtonConfirm" variant="primary" onClick={CheckButton} style={{backgroundColor:'#212F3D',color:'white'}} >Confirm</Button>{' '}
          </form>      
            
          </div>
          </div>
          </div>

           );
  }
  
 
  export default InsertEM;
  
  