import React from 'react';
import './Pages.css';
import { MdInsertDriveFile } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import { getFirestore,collection, query, where, getDocs,setDoc,doc,updateDoc,orderBy } from '@firebase/firestore';
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
            else
            {
                getData();
            }
            },[]);




        const db = getFirestore();
        const storage = getStorage(FirebaseApp);
        const [DataList,setDataList] = useState([]);   

        const getData = async() => { 
            const q = query(collection(db, "Equipment"),orderBy("EM_Name", "asc"));
            const querySnapshot = await getDocs(q);
            const items = [];
            querySnapshot.forEach((doc) => {
              
                items.push(doc.data().EM_Name);    
               
              
            });
              setDataList(items);
            };







        const metadata = {
         contentType: 'image/jpeg'
        };
        const [EM_Number,setEM_Number] = useState("");
        const [ID,setID] = useState("");
        const [Name,setName] = useState("");
        const [Quantity,setQuantity] = useState("");
        const [Detail,setDetail] = useState("");
        const [Status,setStatus] = useState("");
        const [fileUrl, getFileUrl] = useState("");
        
        const CheckButton = () => {

        if(ID&&Name&&Quantity&&Detail&&Status&&fileUrl  !== "" &&Name!=SearchData){
            handleNew();
            }
        else
        {
            console.log("กรอกไม่ครบ");
            if(ID === ""){
                document.getElementById('textID').focus();
            }
            else if(Name === "" || Name==SearchData){
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
     })

     };


     const handleNew = async() => {  
     await getIndex();
     await UpdateNewID(ID);
     const docRef = doc(db,"Equipment",ID.toString());
     const payload = {EM_Number: EM_Number ,EM_ID: ID ,EM_Detail: Detail,EM_Image: fileUrl,EM_Quantity: parseInt(Quantity),EM_UseQuantity: 0,EM_Name: Name
     ,EM_Status: Status,EM_US: "ปกติ"};
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
      
        const [SearchData, SetSearchData] = useState([]);
       
        const handleFilter = (NameEvent) =>{
            setName(NameEvent);

            const NewSearchData = DataList.filter(DL=>{

                return DL.toLowerCase().includes(NameEvent.toLowerCase());

            })
            SetSearchData(NewSearchData);
            
           
            

        }

          return (
          
          //UI
          <div className="container">
         

          <div className="text-center" style={{paddingTop : "10%" ,paddingBottom: "15%",paddingLeft: "15%",paddingRight: "15%",textAlign : 'center'}}>
          <h1 className="SubBG Login-Box-Set " ><MdInsertDriveFile size={40} className="icon-set-container"/>เพิ่มอุปกรณ์</h1>
          <div className="border border-black" >
          
          <form className="Form-Set-Insert" id="InsertForm">
          <div class="form-group row" hidden="true">
          <label for="colFormLabelSm" class="col-sm-3 col-form-label col-form-label-sm InsertLabel-Set">รหัส</label>
          <div class="col-sm-9">
          <input type="text" id="textID" class="form-control InsertBox-Set" placeholder="รหัส" disabled="true"
          value={ID} 
          onChange={e => { setID(e.target.value); }}
          />
          </div>
          </div>
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-3 col-form-label col-form-label-sm InsertLabel-Set">เลขครุภัณฑ์</label>
          <div class="col-sm-9">
          <input type="text" id="textNumber" class="form-control InsertBox-Set"  placeholder="เลขครุภัณฑ์"
          value={EM_Number}
          onChange={e => { setEM_Number(e.target.value);  }}
          />
          </div>
          </div>
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-3 col-form-label col-form-label-sm InsertLabel-Set">ชื่อ*</label>
          <div class="col-sm-9">
          <input type="text" id="textName" class="form-control InsertBox-Set"  placeholder="ชื่อ"
          value={Name}
          onChange={e => { handleFilter(e.target.value);  }}
          />
          { Name !== ""&&Name == SearchData &&
          <div style={{textAlign:"left",color:"red"}}>*มีอุปกรณ์นี้อยู่แล้ว</div>
          }
          {(Name !== ""&&Name != SearchData)  &&(
          
          <div className="DataResult">

          <>
          {SearchData.map(data=>
            {   

                if(Name !== SearchData)
                {
                return <div className="UiSet" onClick={()=>handleFilter(data)}>{data}                                      
                </div>
                }
            })}
          </>
          </div>

          )}
          </div>
          </div>
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-3 col-form-label col-form-label-sm InsertLabel-Set">จำนวน*</label>
          <div class="col-sm-9">
          <input type="number" min="0" id="textQuantity" class="form-control InsertBox-Set"  placeholder="จำนวน"
          value={Quantity}
          onChange={e => { setQuantity(e.target.value); }}
          />
          </div>
          </div>
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-3 col-form-label col-form-label-sm InsertLabel-Set">รายละเอียด*</label>
          <div class="col-sm-9">
          <textarea rows="6"  type="text" id="textDetail" class="form-control InsertBox-Set"  placeholder=""
          value={Detail}
          onChange={e => { setDetail(e.target.value); }}
          />
          </div>
          </div>
          <div class="form-group row">
          <label for="colFormLabelSm" class="col-sm-3 col-form-label col-form-label-sm InsertLabel-Set">สถานะ*</label>
        
         
          
          <div className="radio-set">
        
          <input id="status_radio_พร้อมให้ยืม"  type="radio" name="status" value="พร้อมให้ยืม" onClick={()=> setStatus("พร้อมให้ยืม")}/>
          <label >พร้อมให้ยืม</label><br/>
          <input  type="radio" name="status" value="ไม่พร้อมให้ยืม" onClick={()=> setStatus("ไม่พร้อมให้ยืม")}/>
          <label id="status_radio_ไม่พร้อมให้ยืม" >ไม่พร้อมให้ยืม</label>

          </div>
          </div>
          <hr/>

          <div class="form-group row">

          <label for="colFormLabelSm" class="col-sm-3 col-form-label col-form-label-sm InsertLabel-Set">รูปภาพ*</label>
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
           ตัวอย่างรูปภาพ
           </div>
            <div className="ImgText">     
            (กรุณารอภาพโหลดก่อนกดยืนยัน)           
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
          
          <Button id="ButtonConfirm" variant="primary" onClick={CheckButton} style={{backgroundColor:'#212F3D',color:'white'}} >ยืนยัน</Button>{' '}
          </form>      
            
          </div>
          </div>
          </div>

           );
  }
  
 
  export default InsertEM;
  
  