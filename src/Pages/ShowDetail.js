import React from 'react';
import './Pages.css';
import { useParams } from 'react-router';
import { AiFillSnippets } from "react-icons/ai";
import Detail from '../Component/Detail';
function ShowDetail() 
{
  const {id} = useParams();
  return (
        
        
        <div className="container Default-Box-Set">
        <div className="text-center" style={{ paddingTop: "5%", paddingBottom: "15%", textAlign: 'center' }}>
        <div className="SubBG"><AiFillSnippets size={50} className="icon-set-container" />Equipment_Detail</div>
        <div className="SubBG-TextSet Card-Set border border-black">
        <div className="Home-Set">
        <div>
        </div>

        </div>
        <Detail ID={id}/>

        </div>
        </div>
        </div>
          
        );
}
export default ShowDetail;