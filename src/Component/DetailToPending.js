import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { setDoc,doc,getDocs,collection } from '@firebase/firestore';
import { getFirestore } from "firebase/firestore";
import FirebaseApp from '../firebase';



    async function DetailToPending (PropID,PropName,PropImage,PropStudentID,PropUser,PropPeadingNumber,PropDate,PropPendingID,PropCollegeYears) {

    


    const P_ID   = PropID;
    const P_Name = PropName;
    const P_Image = PropImage;
    const P_StudentID = PropStudentID;
    const P_User = PropUser;
    const P_Date  = PropDate;
    const Pending_ID = PropPendingID;
    const TodayDate = new Date();
    const P_College_Years = PropCollegeYears;
    const P_Number = PropPeadingNumber;
    //เชื่อม Database
    const db = getFirestore();    


    const docRef = doc(db,"Pending",Pending_ID.toString());
    const payload = 
    {
    
    Pending_ID: Pending_ID ,
    Pending_Status: "รอดำเนินการ",
    EM_ID: P_ID,
    EM_Name: P_Name,
    EM_Image: P_Image,
    Loan_Date: TodayDate,
    Due_Date: P_Date,
    Student_ID: P_StudentID,
    User_Name: P_User,
    College_Years: P_College_Years,
    Borrow_Quantity:P_Number
    };
    await setDoc(docRef,payload); 
    

    

    return (

           console.log("เสร็จสิ้น")
    )
}

export default DetailToPending;