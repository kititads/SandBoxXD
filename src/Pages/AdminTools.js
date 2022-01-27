import React from 'react';
import Button from '@material-ui/core/Button';
import './Pages.css';
import Cookies from 'universal-cookie';
import { useState,useEffect } from 'react';
import { getFirestore,collection, query, where, getDocs,setDoc,doc,updateDoc } from '@firebase/firestore';
import { Card } from 'react-bootstrap';
import { Row , Col } from 'react-bootstrap';
import { FaTools } from "react-icons/fa";


function AdminTools() {

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
    const [DataList,setDataList] = useState([]);   
    const getData = async() => { 
       
            const querySnapshot = await getDocs(collection(db, "AdminTools"));
            const items = [];
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots      
            items.push(doc.data())    
            });
            setDataList(items);

            }

      return (
        <div className="container Default-Box-Set">
            <div className="text-center" style={{paddingTop : "5%" ,paddingBottom: "15%",textAlign : 'center'}}>
            <div className="SubBG"><FaTools size={50} className="icon-set-container"/>เครื่องมือผู้ดูแลระบบ</div>
            <div className="SubBG-TextSet Card-Set border border-black">
            <div className="page-set Home-Set-Title ">
              
            </div>
            <Row xs={1} md={4} className="g-4">
            {DataList.map((DL) => (   
            <Col className="Card-Set-Col CardTest">
            <Card>
            <Card.Img variant="top" src={DL.ImgUrl}/>
            <Card.Body>
            <Card.Title>{DL.ToolName}</Card.Title>
            <br/>
            
            <a href={DL.UrlTool}><Button variant="contained" style={{backgroundColor:'#212F3D',color:'white',minWidth: '100px'}}>ไป</Button></a>{' '}
    
            </Card.Body>
            </Card>
           </Col>
            ))}
            </Row>
            </div>
            </div>
            </div>
             );
    }

export default AdminTools;
