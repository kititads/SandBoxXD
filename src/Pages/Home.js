import React from 'react';
import './Pages.css'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import SwiperCore, {Autoplay,Pagination,Navigation} from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import { Row , Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { BsNewspaper } from "react-icons/bs";







// install Swiper modules
SwiperCore.use([Autoplay,Pagination,Navigation]);

function Home() 
{


 
    
  return (
    <div style={{backgroundColor:"white"}}>
    <div style={{backgroundColor:"white"}}>
   
    <Swiper spaceBetween={30} centeredSlides={true} autoplay={{
  "delay": 2500,
  "disableOnInteraction": false
  }} pagination={{
  "clickable": true
  }} navigation={true} className="mySwiper" style={{width: 1400,height: 600}}>
  <SwiperSlide><img width="1400" height="600" src="https://www.rmutk.ac.th/wp-content/uploads/2020/12/01-19.jpg"/></SwiperSlide>
  <SwiperSlide><img width="1400" height="600" src="https://www.rmutk.ac.th/wp-content/uploads/2020/12/03-17.jpg" /></SwiperSlide>
  <SwiperSlide><img width="1400" height="600" src="https://www.rmutk.ac.th/wp-content/uploads/2020/12/05-10.jpg"/></SwiperSlide>
  <SwiperSlide><img width="1400" height="600" src="http://hr-rmutk.com/upload/news/28012021133301banner.png"/></SwiperSlide>

  </Swiper>
  <hr></hr>
  </div>
  <div style={{textAlign:"Center",marginTop:30}}>
 
  <div style={{fontSize:40,paddingTop:40,margin:0}}> <BsNewspaper size={40}/> ข่าว </div>

   </div>
  <Row xs={1} md={3} className="g-4" style={{marginTop:60,marginLeft:"10%",marginRight:"10%"}}>
        
        <Col className="Card-Set-Col">
        <Card>
        <Card.Img variant="top" src="/img/404.gif"/>
        <Card.Body>
        <Card.Title style={{textAlign:"left"}}>หัวข้อ</Card.Title>
        <Card.Text style={{textAlign:"left"}}>
        ..................................................................................
        ..................................................................................
        ..................................................................................
        ..................................................................................

       
        </Card.Text>
        {/* <Button variant="contained" style={{backgroundColor:'#212F3D',color:'white'}} onClick=""> เพิ่มเติม</Button>{' '} */}

        </Card.Body>
        </Card>
       </Col>
       <Col className="Card-Set-Col">
        <Card>
        <Card.Img variant="top" src="/img/404.gif"/>
        <Card.Body>
        <Card.Title style={{textAlign:"left"}}>หัวข้อ</Card.Title>
        <Card.Text style={{textAlign:"left"}}>
        ..................................................................................
        ..................................................................................
        ..................................................................................
        ..................................................................................

       
        </Card.Text>
        {/* <Button variant="contained" style={{backgroundColor:'#212F3D',color:'white'}} onClick=""> เพิ่มเติม</Button>{' '} */}

        </Card.Body>
        </Card>
       </Col>

       <Col className="Card-Set-Col">
        <Card>
        <Card.Img variant="top" src="/img/404.gif"/>
        <Card.Body>
        <Card.Title style={{textAlign:"left"}}>หัวข้อ</Card.Title>
        <Card.Text style={{textAlign:"left"}}>
        ..................................................................................
        ..................................................................................
        ..................................................................................
        ..................................................................................

       
        </Card.Text>
        {/* <Button variant="contained" style={{backgroundColor:'#212F3D',color:'white'}} onClick=""> เพิ่มเติม</Button>{' '} */}

        </Card.Body>
        </Card>
       </Col>
       
</Row>

  </div>

    
  )
}

export default Home;
