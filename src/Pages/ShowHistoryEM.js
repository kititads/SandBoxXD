import React from 'react';
import './Pages.css';
import { useParams } from 'react-router';
import { AiOutlineFileText } from "react-icons/ai";
import HistoryEM from '../Component/HistoryEM';
function ShowHistoryEM() 
{
  const {id} = useParams();
  return (
        
        
        <div className="container Default-Box-Set">
        <div className="text-center" style={{ paddingTop: "5%", paddingBottom: "15%", textAlign: 'center' }}>
        <div className="SubBG"><AiOutlineFileText size={50} className="icon-set-container" />History</div>
        <div className="SubBG-TextSet Card-Set border border-black">
        <div className="Home-Set">
        <div>
        </div>

        </div>
        <HistoryEM ID={id}/>

        </div>
        </div>
        </div>
          
        );
}
export default ShowHistoryEM;