import React from 'react';
import './Pages.css';

import { BiUser } from "react-icons/bi";
import AllUser from '../Component/AllUser';

function ShowUser() 
{
  return (
        <div className="container Default-Box-Set">
        <div className="text-center" style={{paddingTop : "5%" ,paddingBottom: "15%",textAlign : 'center'}}>
        <div className="SubBG" ><BiUser size={50} className="icon-set-container"/>All User</div>
        <div>
         <div className="">
         <AllUser/>
         </div>
         </div>
        </div>
        </div>
       
        
         );
}
export default ShowUser;
