import React from 'react';

import ReportTable from '../Component/ReportTable';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Pages.css';
import BarChart from '../Component/BarChart';
import PieChart from '../Component/PieChart';
import { HiOutlineDocumentReport } from "react-icons/hi";
import FirebaseApp from '../firebase';
import { useEffect,useState } from 'react';
import { getFirestore,collection, query, where, getDocs,setDoc,doc,updateDoc } from '@firebase/firestore';
import moment from 'moment';




function Report() 
{

    const [Search,setSearch] = useState("");

    const db = getFirestore();
    const [CountUser,setCountUser] = useState(0);  
    const [CountAll,setCountAll] = useState(0);   
    const [CountCan,setCountCan] = useState(0);   
    const [CountCant,setCountCant] = useState(0);   
    const [CountAllBorrow,setCountAllBorrow] = useState(0);   
    const [CountBorrow,setCountBorrow] = useState(0);  
    const [CountHistory,setCountHistory] = useState(0);  
    const [YearsArray,setYearsArray] = useState([""]);  

    


        //ทำงานตอนเริ่ม
        useEffect(()=> {
          getData();
    
        },[]);
        
        const getData = async() => { 
        //นับผู้ใช้ ไม่รวมแอดมิน
        const q = query(collection(db, "User"));
        const querySnapshot = await getDocs(q);
        const CountU = [];
        querySnapshot.forEach((doc) => {
            if(doc.data().Status_User === "User")
            {
            CountU.push(doc.data());
            };
        }           
        );
        setCountUser(CountU.length);
    
        //นับอุปกรณ์
        const q2 = query(collection(db, "Equipment"));
        const querySnapshot2 = await getDocs(q2);
        const CountALL = [];
        const CountCan = [];
        const CountCant = [];

        querySnapshot2.forEach((doc) => {
            CountALL.push(doc.data());

            if(doc.data().EM_Status === "ไม่พร้อมใช้งาน")
            {
                CountCant.push(doc.data());
            }
            else
            {
                CountCan.push(doc.data());
            }
        
            ;
        }           
        );

        //นับจำนวนการยืม
        const q3 = query(collection(db, "Borrow"));
        const querySnapshot3 = await getDocs(q3);
        const CountAllBorrow = [];
        const CountBorrow = [];
        const CountHistory = [];
        const CountYears = [];
        querySnapshot3.forEach((doc) => {
            CountAllBorrow.push(doc.data());
            CountBorrow.push(doc.data());
            CountYears.push(ConvertTime(doc.data().Loan_Date))
        }    
        );

        //นับจำนวนประวัติ
        const q4 = query(collection(db, "History"));
        const querySnapshot4 = await getDocs(q4);
        querySnapshot4.forEach((doc) => {
            CountAllBorrow.push(doc.data());
            CountHistory.push(doc.data());
            CountYears.push(ConvertTime(doc.data().Loan_Date))

        } 
        );


        setCountUser(CountU.length);
        setCountAll(CountALL.length);
        setCountCan(CountCan.length);
        setCountCant(CountCant.length);
        setCountAllBorrow(CountAllBorrow.length);
        setCountBorrow(CountBorrow.length);
        setCountHistory(CountHistory.length);
        setCountHistory(CountHistory.length);

        var unique = CountYears.filter((v, i, a) => a.indexOf(v) === i);
        if(unique != null)
        setYearsArray(unique);
        };


        const ConvertTime = (Value) => {
        const TimeAfter = new Date(Value.seconds * 1000 + Value.nanoseconds/1000000)
        const TimeAfterFormat = moment(TimeAfter).format('YYYY');
        return TimeAfterFormat;
       };
       
        
        
  return (
        <div className="container">
        <div className="text-center" style={{paddingTop : "10%" ,paddingBottom: "10%",textAlign : 'center'}}>
        <div className="SubBG" style={{paddingTop : "1%" ,paddingBottom: "1%",fontSize : 35,textAlign : 'center'}}><HiOutlineDocumentReport size={60} className="icon-set-container"/>รายงานสรุป</div>
        <div className="border border-black" style={{padding : "5%"}}>
        <div style={{textAlign: "right"}}>
            {/* ล้มเหลว ยังไม่เข้าใจ */}
        {/* <label for="years">เลือกปีที่ต้องการแสดง ⠀</label> 
        <select name="years" id="SelectYears" onChange={e => { setSearch(e.target.value); }}>
        <option selected value="">ทั้งหมด</option>

        {YearsArray.map(Years => (
         <option value={Years}>{Years}</option>
        ))}
        </select>
        <br></br>
        */}
        </div>
        <br></br>
        <Row>
        <Col sm={7}>
        {/* กราฟแท่ง */}
        <BarChart/>
        </Col>
        <br></br>
        <Col sm={5}>
        {/* กราฟวงกลม */}
        <PieChart/>
        </Col>
        </Row>

        <br></br>

        <hr></hr>
        <Row >
        <Col sm={4} style={{color : "white",textAlign : 'left',fontSize : 30}}>
        <div style={{textAlign : 'center',paddingTop: "21%",paddingBottom: "21%",paddingLeft: "5%", backgroundColor : "#395CC2"}}>จำนวนผู้ใช้ทั้งหมด
         <br></br>{CountUser} คน 
         </div>
        </Col>           
        <Col sm={4} style={{color : "white",textAlign : 'left',fontSize : 20}}>
        <div style={{textAlign : 'left',paddingTop: "2%",paddingBottom: "2%",paddingLeft: "10%",backgroundColor : "#0F9732"}}>จำนวนอุปกรณ์ทั้งหมด       
        <br></br>{CountAll} รายการ
        </div>
        

        <div className='ReportSetBoder' style={{textAlign : 'left',paddingTop: "2%",paddingBottom: "2%",paddingLeft: "10%",backgroundColor : "#258CCF"}}>จำนวนอุปกรณ์ที่ใช้งานได้   
        <br></br>{CountCan} รายการ
        </div>

        <div style={{textAlign : 'left',paddingTop: "2%",paddingBottom: "2%",paddingLeft: "10%",backgroundColor : "#DE3B3B"}}>จำนวนอุุปกรณ์ที่ชำรุด    
        <br></br>{CountCant} รายการ 
        </div>

        </Col>    
        <Col sm={4} style={{color : "white",textAlign : 'left',fontSize : 20}}>
        <div style={{textAlign : 'left',paddingTop: "2%",paddingBottom: "2%",paddingLeft: "10%",backgroundColor : "#0F9732"}}>จำนวนครั้งในการยืมอุปกรณ์   
        <br></br>{CountAllBorrow} รายการ 
        </div>

        <div className='ReportSetBoder' style={{textAlign : 'left',paddingTop: "2%",paddingBottom: "2%",paddingLeft: "10%",backgroundColor : "#258CCF"}}>จำนวนครั้งที่คืนอุปกรณ์แล้ว   
        <br></br>{CountHistory} รายการ 
        </div>

        <div style={{textAlign : 'left',paddingTop: "2%",paddingBottom: "2%",paddingLeft: "10%",backgroundColor : "#DE3B3B"}}>จำนวนที่ยังไม่คืนอุปกรณ์    
        <br></br>{CountBorrow} รายการ 
        </div>

        </Col>            
        </Row>
        <br></br>


        
        <hr></hr>


        
            <ReportTable/>

  

        </div>
        </div>
        </div>

         );
}

export default Report;