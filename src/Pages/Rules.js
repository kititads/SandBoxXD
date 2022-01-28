import React from 'react';
import { AiOutlineRead } from "react-icons/ai";


function Rules() 
{
  return (
    <div className="container Default-Box-Set">
        <div className="text-center" style={{paddingTop : "5%" ,paddingBottom: "15%",textAlign : 'center'}}>
        <div className="SubBG"><AiOutlineRead size={50} className="icon-set-container"/>ระเบียบการยืม-คืน</div>
        <div className="SubBG-TextSet Card-Set border border-black">
        <div className="Home-Set">
        
        
        <div style={{textAlign : 'center',fontSize : 30,backgroundColor : "#E7ECF3",paddingTop : "1%",paddingBottom: "1%"}}>ข้อปฎิบัติในการยืมอุปกรณ์</div>
        <div style={{paddingLeft : "10%",paddingTop : "5%",paddingBottom: "10%",fontSize : 20 ,backgroundColor : "#FAFAF9"}}>
        1. กรุณาคืนภายในเวลาที่กำหนด หากมีเหตุจำเป็นให้แจ้งที่ชั้น 10
        <br/><br/>
        2. หากอุปกรณ์ชำรุดหรือสูญหายรีบแจ้ง
        <br/><br/>
        3.  หากมีความต้องการใช้อุปกรณ์ด่วนให้ไปแจ้งโดยตรงที่ชั้น 10
        <br/><br/>
        4.  เมื่อมีการคืนอุปกรณ์ต้องแจ้งอาจารย์ที่รับผิดชอบทุกครั้ง
        <br/><br/>
        5.  ห้ามไม่ให้มีการยืมแทนกัน
        <br/><br/>
        6.  หากอุปกรณ์มีปัญหาหรือชำรุด สูญหาย อาจมีการปรับตามราคา
        <br/><br/>
        7.  ไม่รับยืมหรือคืนในวันหยุดราชการ
        <br/><br/>
        8.  การตอบรับอาจมีความล่าช้า 1-2 วัน
        <br/><br/>
        
       
        </div>
        
        </div>
        
        </div>
        </div>
        </div>
         );
}

export default Rules;
