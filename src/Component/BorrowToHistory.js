import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { getFirestore,collection, query, where, getDocs,orderBy,setDoc,doc,updateDoc } from '@firebase/firestore';
import FirebaseApp from '../firebase';
import { date } from 'faker';

    function BorrowToHistory(PropBorrowID,DataList,NextID) {
    const db = getFirestore();

    
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
     Returned_Date: Today, 
     Student_ID: DL.Student_ID,
     User_Name: DL.User_Name,
     College_Years: DL.College_Years

    };
    setDoc(docRef,payload);

    const UpdatedocRef = doc(db,"Equipment",DL.EM_ID.toString());
    const Updatepayload = {
    EM_Status: "Available",
    };
    updateDoc(UpdatedocRef,Updatepayload);
        

    });

    
        

    return (

        console.log("เสร็จเรียบร้อย")
      
    )
    
    }
    

export default BorrowToHistory;