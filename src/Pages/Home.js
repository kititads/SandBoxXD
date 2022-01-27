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
    <div style={{backgroundImage:"url('https://cdngarenanow-a.akamaihd.net/games/lol/2020/LOLwebsite/img/blurred1.jpg')"}}>
   
    <Swiper spaceBetween={30} centeredSlides={true} autoplay={{
  "delay": 2500,
  "disableOnInteraction": false
  }} pagination={{
  "clickable": true
  }} navigation={true} className="mySwiper" style={{width: 1220,height: 520,paddingTop:50 }}>
  <SwiperSlide><img width="1220" height="400" src="https://cdngarenanow-a.akamaihd.net/webth/cdn/lol/patch/Patch-12-2/Banner_TFT_Patch-Update-12-2_Head-Banner-1220x400.jpg"/></SwiperSlide>
  <SwiperSlide><img width="1220" height="400" src="https://cdngarenanow-a.akamaihd.net/webth/cdn/lol/news/Zeri-Available-Now/Banner_LOL_New-Champion-Zeri_Head-Banner-1220x400.jpg" /></SwiperSlide>
  <SwiperSlide><img width="1220" height="400" src="https://cdngarenanow-a.akamaihd.net/webth/cdn/lol/patch/Patch-12-2/Banner_TFT_Patch-Update-12-2_Head-Banner-1220x400.jpg"/></SwiperSlide>
  <SwiperSlide><img width="1220" height="400" src="https://cdngarenanow-a.akamaihd.net/webth/cdn/lol/news/Light-of-Victory-Jan-2022/Banner_LOL_Gather-Jan-2022_Headbanner-1220x400.jpg"/></SwiperSlide>
  <SwiperSlide><img width="1220" height="400" src="https://cdngarenanow-a.akamaihd.net/webth/cdn/lol/news/Lunar-Login-Jan-2022/Banner_LOL_DailyLoginDau-Jan-2022_Headbanner-1220x400.jpg"/></SwiperSlide>

  </Swiper>
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
