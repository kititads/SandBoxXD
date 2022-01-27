import React from 'react';
import './Pages.css';

import { AiOutlineUnorderedList } from "react-icons/ai";
import BorrowTable from '../Component/BorrowTable';

function ShowBorrow() 
{
  return (
        <div className="container Default-Box-Set">
        <div className="text-center" style={{paddingTop : "5%" ,paddingBottom: "15%",textAlign : 'center'}}>
        <div className="SubBG" ><AiOutlineUnorderedList size={50} className="icon-set-container"/>รายการยืม</div>
        <div>
         <div className="">
         <BorrowTable/>
         </div>
         </div>
        </div>
        </div>
       
        
         );
}
export default ShowBorrow;
