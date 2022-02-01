import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { getFirestore,setDoc,doc,updateDoc } from '@firebase/firestore';
import FirebaseApp from '../firebase';

    function BorrowToHistory(PropBorrowID,DataList,DataList0,NextID,ReturnType,EquipmentBroken,Why) {
    const db = getFirestore();

    if(ReturnType === "คืนอุปกรณ์ครบ" || ReturnType === "ยกเลิกรายการยืม")
    {
        EquipmentBroken = 0;
    }
  
    DataList.filter((DL) =>{
        if(DL.Borrow_ID === PropBorrowID )
        {
            return DL;
        }
    })
    .map((DL) => {

    const Today = new Date();
    const docRef = doc(db,"History",NextID.toString());
    const payload = 
     {
     History_ID: NextID ,
     EM_ID: DL.EM_ID,
     EM_Name: DL.EM_Name,
     EM_Image: DL.EM_Image,
     Loan_Date: DL.Loan_Date,
     Due_Date: DL.Due_Date,
     Borrow_Quantity: DL.Borrow_Quantity,
     EquipmentBroken:EquipmentBroken,
     Returned_Date: Today, 
     Student_ID: DL.Student_ID,
     User_Name: DL.User_Name,
     College_Years: DL.College_Years,
     ReturnType: ReturnType,
     Why:Why,
     Borrow_Status:DL.Borrow_Status

    };
    setDoc(docRef,payload);


    const BorrowNum = parseInt(DL.Borrow_Quantity)
    const NewQuantity = (DataList0[DL.EM_ID].EM_UseQuantity - BorrowNum)
    const EM_QuantityUpdate =  (DataList0[DL.EM_ID].EM_Quantity - EquipmentBroken)

    const UpdatedocRef = doc(db,"Equipment",DL.EM_ID.toString());
    const Updatepayload = {
    EM_UseQuantity: NewQuantity,
    EM_Status: "พร้อมให้ยืม",
    EM_Quantity: EM_QuantityUpdate
    };
    updateDoc(UpdatedocRef,Updatepayload);
        

    });

    
        

    return (

        console.log("เสร็จเรียบร้อย")
      
    )
    
    }
    

export default BorrowToHistory;