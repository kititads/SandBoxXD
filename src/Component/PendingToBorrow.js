import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { getFirestore,collection, query, where, getDocs,orderBy,setDoc,doc,updateDoc } from '@firebase/firestore';
import FirebaseApp from '../firebase';
    function PendingToBorrow(PropPendingID,DataList,DataList0,NextID) {
    const db = getFirestore();

    
    DataList.filter((DL) =>{
        if(DL.Pending_ID === PropPendingID )
        {
            return DL;
        }
    })
    .map((DL) => {


    const docRef = doc(db,"Borrow",NextID.toString());
    const payload = 
     {
     Borrow_ID: NextID ,
     Borrow_Status: "ไม่ถึงกำหนดคืน",
     EM_ID: DL.EM_ID,
     EM_Name: DL.EM_Name,
     EM_Image: DL.EM_Image,
     Loan_Date: DL.Loan_Date,
     Due_Date: DL.Due_Date,
     Student_ID: DL.Student_ID,
     User_Name: DL.User_Name,
     College_Years: DL.College_Years,
     Borrow_Quantity: DL.Borrow_Quantity
    };
    setDoc(docRef,payload);

    const BorrowNum = parseInt(DL.Borrow_Quantity)
    const NewQuantity = (DataList0[DL.EM_ID].EM_UseQuantity + BorrowNum)
    const CheckQuantity = DataList0[DL.EM_ID].EM_UseQuantity - NewQuantity
    
    if(CheckQuantity === 0)
    {
        const UpdatedocRef = doc(db,"Equipment",DL.EM_ID.toString());
        const Updatepayload = {
        EM_UseQuantity: NewQuantity,
        EM_Status: "Out Of Stock"

        };
        updateDoc(UpdatedocRef,Updatepayload);}
    else
    {
        const UpdatedocRef = doc(db,"Equipment",DL.EM_ID.toString());
        const Updatepayload = {
        EM_UseQuantity: NewQuantity
        };
        updateDoc(UpdatedocRef,Updatepayload);} 
    }
        
    );
    

    
        

    return (

        console.log("เสร็จเรียบร้อย")
      
    )
    
    }
    

export default PendingToBorrow;