import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Navber.css';
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { AiFillHome } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineTeam } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineRead } from "react-icons/ai";
import { RiLoginBoxLine } from "react-icons/ri";
import { useState,useEffect } from 'react';
import Cookies from 'universal-cookie';
    



  function Navber() {

  const cookies = new Cookies();
  const User_Name = cookies.get('User_Name');
  const [LoginState,setLoginState] = useState("");
  const [UserState,setUserState] = useState("");
  const [AdminState,setAdminState] = useState("");

  //ทำงานตอนเริ่ม
  useEffect(()=> {
  if(cookies.get('Status_User') === "User")
  
  {
    setLoginState("true");
    setUserState("");
    setAdminState("true");
  }
  
  else if(cookies.get('Status_User') === "Admin")
  {
    setLoginState("true");
    setUserState("true");
    setAdminState("");

  }
  else
  {
    setLoginState("");
    setUserState("true");
    setAdminState("true");

  }
  
  },[]);



  function Logout (){
  cookies.remove('User_Name'  , { path: '/' });
  cookies.remove('Status_User', { path: '/' });
  cookies.remove('Student_ID' , { path: '/' });

  }

  return (
    
    <Navbar bg="navbercolor" variant="dark" sticky="top" expand="lg" collapseOnSelect>
      <Navbar.Brand>
        <img
          alt=""
          src="/img/IconBox.png"
          width="50"
          height="40"
          className="d-inline-block align-top"
        />{' '}
             
      
        ระบบยืม-คืนอุปกรณ์สาขา
        </Navbar.Brand>
        <NavbarToggle aria-controls="responsive-navbar-nav" ></NavbarToggle>
        <NavbarCollapse className="setCenter"> 
        <Nav>
        <Nav.Link href="/home"><AiFillHome size={21}/>{' '}หน้าหลัก</Nav.Link>
        <Nav.Link href="/search"><AiOutlineSearch size={21}/>{' '}ค้นหา</Nav.Link>
        <Nav.Link  href="/rules"><AiOutlineRead size={21}/>{' '}ระเบียบการยืม-คืน</Nav.Link>

        <Nav.Link  href="/about"><AiOutlineTeam size={21}/>{' '}เกี่ยวกับเรา</Nav.Link>
        <Nav.Link  href="/contact"><AiOutlineComment size={21}/>{' '}ติดต่อเรา</Nav.Link>

        
        </Nav>    
        </NavbarCollapse>
        
        <NavbarCollapse className="setEnd" >
        {/* ล็อกอิน */}
        <Nav>
        <Nav.Link href="/login" hidden={LoginState}>   
        <RiLoginBoxLine size={21}/>{' '}ล็อกอิน</Nav.Link>
        </Nav>
        {/* User */}

        <Nav hidden={UserState}>
        <NavDropdown title={"ผู้ใช้ : "+User_Name} id="navbarScrollingDropdown">
        {/* <NavDropdown.Item href="#action3">ข้อมูลส่วนตัว</NavDropdown.Item> */}
        <NavDropdown.Item href="/pending">อุปกรณ์รออนุมัติ</NavDropdown.Item>
        <NavDropdown.Item href="/borrowem">อุปกรณ์ที่กำลังยืม</NavDropdown.Item>

        <NavDropdown.Item href="/history">ประวัติการยืม</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/login" onClick={Logout}>ออกจากระบบ</NavDropdown.Item>
        </NavDropdown>
        </Nav>
        {/* Admin */}

        <Nav hidden={AdminState}>
        <NavDropdown title={"แอดมิน : "+User_Name} id="navbarScrollingDropdown">
        <NavDropdown.Item href="/admintools">เครื่องมือผู้ดูแลระบบ</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/login" onClick={Logout}>ออกจากระบบ</NavDropdown.Item>
        </NavDropdown>
        </Nav>
       

      </NavbarCollapse>
      </Navbar>
  
  );
}


export default Navber;
