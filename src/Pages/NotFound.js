import React from 'react';
import Button from '@material-ui/core/Button';
import { RiErrorWarningLine } from "react-icons/ri";

function NotFound() 
{
  return (
        <div className="container">
        <div className="text-center" style={{margin: "10%",paddingTop : "10%" ,paddingBottom: "10%",textAlign : 'center'}}>
        <h1><RiErrorWarningLine size={50} className="icon-set-container"/>Not Found Page!</h1>

        <img alt="" src="/img/404.gif" width="50%" height="40%"/>
        <div>
        <a href="/home">
        <Button variant="contained" style={{backgroundColor:'#212F3D',color:'white'}}>Back to home page</Button>{' '}
        </a>

        </div>
        </div>
        </div>
         );
}

export default NotFound;