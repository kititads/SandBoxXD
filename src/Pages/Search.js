import React from 'react';
import './Pages.css';

import { AiOutlineSearch } from "react-icons/ai";
import SearchTable from '../Component/SearchTable';


function Search() 
{
  return (
        <div className="container Default-Box-Set">
        <div className="text-center" style={{paddingTop : "5%" ,paddingBottom: "15%",textAlign : 'center'}}>
        <div className="SubBG" ><AiOutlineSearch size={50} className="icon-set-container"/>ค้นหา</div>
        <div>
         <div className="">
         <SearchTable/>
         </div>
         </div>
        </div>
        </div>
       
        
         );
}
export default Search;
