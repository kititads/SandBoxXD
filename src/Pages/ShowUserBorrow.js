import React from 'react';
import './Pages.css';

import { AiOutlineFileText } from "react-icons/ai";
import UserBorrowHistory from '../Component/UserBorrowHistory';

function ShowUserBorrow() 
{
  return (
        <div className="container Default-Box-Set">
        <div className="text-center" style={{paddingTop : "5%" ,paddingBottom: "15%",textAlign : 'center'}}>
        <div className="SubBG" ><AiOutlineFileText size={50} className="icon-set-container"/>สถิติการยืม</div>
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
