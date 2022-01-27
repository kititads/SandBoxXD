import React from 'react';
import './Pages.css';
import { AiOutlineHistory } from "react-icons/ai";
import HistoryTable from '../Component/HistoryTable';

function ShowHistory() 
{
  return (
        <div className="container Default-Box-Set">
        <div className="text-center" style={{paddingTop : "5%" ,paddingBottom: "15%",textAlign : 'center'}}>
        <div className="SubBG" ><AiOutlineHistory size={50} className="icon-set-container"/>ประวัติการยืม</div>
        <div>
         <div className="">
         <HistoryTable/>
         </div>
         </div>
        </div>
        </div>
       
        
         );
}
export default ShowHistory;
