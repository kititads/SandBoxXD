import React from 'react';
import './Pages.css';
import { GiSandsOfTime } from "react-icons/gi";
import PendingTable from '../Component/PendingTable';

function Pending() 
{
  return (
        <div className="container Default-Box-Set">
        <div className="text-center" style={{paddingTop : "5%" ,paddingBottom: "15%",textAlign : 'center'}}>
        <div className="SubBG" ><GiSandsOfTime size={50} className="icon-set-container"/>รอดำเนินการ</div>
        <div>
         <div className="">
         <PendingTable/>
         </div>
         </div>
        </div>
        </div>
       
        
         );
}
export default Pending;
