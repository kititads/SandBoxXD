import React from 'react';
import './Pages.css';
import { AiFillEdit } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import { getFirestore,collection, query, where, getDocs,setDoc,doc,updateDoc } from '@firebase/firestore';
import { getStorage, ref , uploadBytesResumable , getDownloadURL } from "firebase/storage";
import FirebaseApp from '../firebase';
import { useEffect,useState } from 'react';
import Cookies from 'universal-cookie';
import { useParams } from 'react-router';


function EditEM() 
{
        const {id} = useParams();
        //ทำงานตอนเริ่ม
        useEffect(()=> {
         const cookies = new Cookies();
            if(cookies.get('Status_User') === "Admin")
            {
                getData();
            }
            else
            {
             window.location.href = "/NotFound";      
            }
            },[]);

            const [ID,setID] = useState("");
            const [Name,setName] = useState("");
            const [Quantity,setQuantity] = useState("");
            const [UseQuantity,setUseQuantity] = useState("");

            const [Detail,setDetail] = useState("");
            const [Status,setStatus] = useState("");
            const [fileUrl, getFileUrl] = useState("");
            const [FirstImage, setFirstImage] = useState("");

            const getData = async() => { 
                const querySnapshot = await getDocs(collection(db, "Equipment"));
                const items = [];
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  const SeachCon = id ; 
                  if(doc.data().EM_ID === Number(SeachCon)){
                  items.push(doc.data())    
                  }
                });
            
                items.map(value => {
                    setID(value.EM_ID);
                    setName(value.EM_Name);
                    setQuantity(value.EM_Quantity);
                    setUseQuantity(value.EM_UseQuantity)
                    setDetail(value.EM_Detail);
                    setStatus(value.EM_Status);
                    getFileUrl(value.EM_Image);
                    setFirstImage(value.EM_Image);
                    document.getElementById("status_radio_"+value.EM_Status).checked = "true"

                })

                

                };

        
        const db = getFirestore();
        const storage = getStorage(FirebaseApp);
        const metadata = {
         contentType: 'image/jpeg'
        };

       
        
        const CheckButton = () => {

        if(ID&&Name&&Quantity&&Detail&&Status&&fileUrl  !== "" ){
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
            else if(Quantity === ""){
                document.getElementById('textQuantity').focus();
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
     const docRef = doc(db,"Equipment",ID.toString());
     const payload = {EM_ID: ID ,EM_Detail: Detail,EM_Image: fileUrl,EM_Quantity: Quantity,EM_UseQuantity: UseQuantity,EM_Name: Name
     ,EM_Status: Status};
     await setDoc(docRef,payload);
     window.location.reload();

     };

       
      
          return (
          
          //UI
          <div className="container">
          <div className="text-center" style={{paddingTop : "10%" ,paddingBottom: "15%",paddingLeft: "15%",paddingRight: "15%",textAlign : 'center'}}>
          <h1 className="SubBG Login-Box-Set " ><AiFillEdit size={40} className="icon-set-container"/>แก้ไขข้อมูลอุปกรณ์</h1>
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
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">จำนวน</label>
          <div class="col-sm-10">
          <input type="text" id="textQuantity" class="form-control form-control-sm InsertBox-Set"  placeholder="จำนวน"
          value={Quantity}
          onChange={e => { setQuantity(e.target.value); }}
          />
          </div>
          </div>
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">รายละเอียด</label>
          <div class="col-sm-10">
          <textarea rows="6" type="text" id="textDetail" class="form-control form-control-sm InsertBox-Set"  placeholder="Detail"
          value={Detail}
          onChange={e => { setDetail(e.target.value); }}
          />
          </div>
          </div>
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">สถานะ</label>
          <div className="radio-set">
        
          <input id="status_radio_Available"  type="radio" name="status" value="พร้อมใช้งาน" onClick={()=> setStatus("พร้อมใช้งาน")}/>
          <label >พร้อมใช้งาน</label><br/>
          <input id="status_radio_Unavailable" type="radio" name="status" value="ไม่พร้อมใช้งาน" onClick={()=> setStatus("ไม่พร้อมใช้งาน")}/>
          <label  >ไม่พร้อมใช้งาน</label><br/>
          <input  id="status_radio_Out Of Stock" type="radio" name="status" value="สินค้าหมด " onClick={()=> setStatus("สินค้าหมด")}/>
          <label >สินค้าหมด</label>
          </div>
          </div>
          <hr/>

          <div class="form-group row">
         
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm InsertLabel-Set">รูปภาพ</label>
          
          <div class="col-sm-3">
          <br/>
          
          
          <input type="file" id="fileImg" class="InsertBox-Set" 
          onChange={onFileChange}
          />
          </div>
          

          </div>
          <br/>
          <div className="ImgText">     
          ตัวอย่างรูปภาพ
          </div>
          <div className="ImgText">     
            (กรุณารอภาพโหลดก่อนกดยืนยัน)           
            </div>
          <div >
          <br/>
          <img className="ImgEdit" src={fileUrl}  style={{width:"250px",height:"200px"}}></img>
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
  
 
  export default EditEM;
  
  