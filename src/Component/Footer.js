import React from "react";
import "./Footer.css";

function Footer() {


  return (
    <div className="main-footer ">
      <div className="container">
        <div className="row">         
          <div className="col HideTest" >
            <h5>สาขาวิชาวิทยาการคอมพิวเตอร์ / สาขาวิชาเทคโนโลยีสารสนเทศ</h5>
            <ui className="list-unstyled">
              <li>คณะวิทยาศาสตร์และเทคโนโลยี ภาควิชาคณิตศาสตร์และวิทยาการคอมพิวเตอร์</li>
              <li>มหาวิทยาลัยเทคโนโลยีราชมงคลกรุงเทพ</li>
              <li>อาคาร 80 พรรษา บรมราชินีนาถ ชั้น 9-10</li>
              <li>เลขที่ 2 ถนนนางลิ้นจี่ แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพมหานคร 10120</li>             
            </ui>
          </div>
          <div className="col">
            <h5>ช่องทางการติดต่อ</h5>
            <ui className="list-unstyled">
              <li>เบอร์ติดต่อ : 0 2287 9600 ต่อ 7018, 7065</li>
              <li>อีเมล : csit.utk@mail.rmutk.ac.th</li>
            </ui>
          </div>
        </div>
        <br/>

        <div className="row">
          <p className="col-sm " >
         
          ©2019 - &copy;{new Date().getFullYear()} CS & IT UTK
          </p>

        </div>

      </div>
    </div>
  );
}

export default Footer;