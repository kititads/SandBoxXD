import React from 'react';
import './Pages.css';

import { AiOutlineUnorderedList } from "react-icons/ai";
import BorrowEM from '../Component/BorrowEM';

function ShowBorrowEM() 
{
  return (
        <div className="container Default-Box-Set">
        <div className="text-center" style={{paddingTop : "5%" ,paddingBottom: "15%",textAlign : 'center'}}>
        <div className="SubBG" ><AiOutlineUnorderedList size={50} className="icon-set-container"/>รายการยืม</div>
        <div>
         <div className="">
         <BorrowEM/>
         </div>
         </div>
        </div>
        </div>
       
        
         );
}
export default ShowBorrowEM;
