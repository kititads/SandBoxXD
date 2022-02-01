import React from 'react';
import './Pages.css';

import { BiUser } from "react-icons/bi";
import UserBorrowHistory from '../Component/UserBorrowHistory';

function ShowUserBorrow() 
{
  return (
        <div className="container Default-Box-Set">
        <div className="text-center" style={{paddingTop : "5%" ,paddingBottom: "15%",textAlign : 'center'}}>
        <div className="SubBG" ><BiUser size={50} className="icon-set-container"/>แสดงผู้ใช้งานทั้งหมด</div>
        <div>
         <div className="">
         <UserBorrowHistory/>
         </div>
         </div>
        </div>
        </div>
       
        
         );
}
export default ShowUserBorrow;
