import React from 'react';
import './Pages.css'
import { Card } from 'react-bootstrap';
import { Row , Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { GiNewShoot } from "react-icons/gi";
import { MdAnnouncement } from "react-icons/md";

function Home() 
{
  return (
    <div className="container Default-Box-Set">
        <div className="text-center" style={{paddingTop : "5%" ,paddingBottom: "15%",textAlign : 'center'}}>
        <div className="SubBG"><GiNewShoot size={50} className="icon-set-container"/>News</div>
        <div className="SubBG-TextSet Card-Set border border-black">
        <div className="Home-Set">
          
        </div>
        <Row xs={1} md={3} className="g-4">
        {Array.from({ length: 6 }).map((_, idx) => (
        <Col className="Card-Set-Col">
        <Card>
        <Card.Img variant="top" src="/img/404.gif"/>
        <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.Text>
        ........................................................
        ........................................................
        ........................................................
        ........................................................
        </Card.Text>
        <Button variant="contained" style={{backgroundColor:'#212F3D',color:'white'}} onClick="">More</Button>{' '}

        </Card.Body>
        </Card>
       </Col>
       ))}
</Row>
        </div>
        </div>
        </div>
         );
}

export default Home;
