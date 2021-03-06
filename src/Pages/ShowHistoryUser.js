import React from 'react';
import './Pages.css';
import { useParams } from 'react-router';
import { AiOutlineFileText } from "react-icons/ai";
import HistoryUser from '../Component/HistoryUser';
function ShowHistoryEM() 
{
  const {id} = useParams();
  const {types} = useParams();

  return (
        
        //Test
        <div className="container Default-Box-Set">
        <div className="text-center" style={{ paddingTop: "5%", paddingBottom: "15%", textAlign: 'center' }}>
        <div className="SubBG"><AiOutlineFileText size={50} className="icon-set-container" />ประวัติการยืม</div>
        <div>
         <div className="">
        <HistoryUser ID={id} Types={types}/>
        </div>
        </div>
        </div>
        </div>
          
        );
}
export default ShowHistoryEM;