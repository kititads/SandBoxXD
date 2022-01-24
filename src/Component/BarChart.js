import React from 'react';
import { Chart as ChartJS,BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2'
import FirebaseApp from '../firebase';
import { useEffect,useState } from 'react';
import { getFirestore,collection, query, where, getDocs,setDoc,doc,updateDoc } from '@firebase/firestore';
import moment from 'moment';



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
)



function BarChart() 
{
  const ConvertTime = (Value) => {
  const TimeAfter = new Date(Value.seconds * 1000 + Value.nanoseconds/1000000)
  const TimeAfterFormat = moment(TimeAfter).format('MM');
  return TimeAfterFormat;
  };

  const ConvertTimeYears = (Value) => {
  const TimeAfter = new Date(Value.seconds * 1000 + Value.nanoseconds/1000000)
  const TimeAfterFormat = moment(TimeAfter).format('YYYY');
  return TimeAfterFormat;
  };

  const [CountMonths,setCountMonths] = useState([]);   
  //ทำงานตอนเริ่ม
  useEffect(()=> {
    getData();
    
  },[]);
  const db = getFirestore();
  const getData = async() => { 
  const CountMonths = [0,0,0,0,0,0,0,0,0,0,0,0];

  const q = query(collection(db, "Borrow"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const DateTime = ConvertTime(doc.data().Loan_Date).toString();

    if(DateTime === "01")
    {CountMonths[0] += 1 }
    else if(DateTime === "02")
    {CountMonths[1] += 1 }
    else if(DateTime === "03")
    {CountMonths[2] += 1 }
    else if(DateTime === "04")
    {CountMonths[3] += 1 }
    else if(DateTime === "05")
    {CountMonths[4] += 1 }
    else if(DateTime === "06")
    {CountMonths[5] += 1 }
    else if(DateTime === "07")
    {CountMonths[6] += 1 }
    else if(DateTime === "08")
    {CountMonths[7] += 1 }
    else if(DateTime === "09")
    {CountMonths[8] += 1 }
    else if(DateTime === "10")
    {CountMonths[9] += 1 }
    else if(DateTime === "11")
    {CountMonths[10] += 1 }
    else if(DateTime === "12")
    {CountMonths[11] += 1 }
  });

  //--------------
  const q2 = query(collection(db, "History"));
  const querySnapshot2 = await getDocs(q2);
  querySnapshot2.forEach((doc) => {
    const DateTime = ConvertTime(doc.data().Loan_Date).toString();

    if(DateTime === "01")
    {CountMonths[0] += 1 }
    else if(DateTime === "02")
    {CountMonths[1] += 1 }
    else if(DateTime === "03")
    {CountMonths[2] += 1 }
    else if(DateTime === "04")
    {CountMonths[3] += 1 }
    else if(DateTime === "05")
    {CountMonths[4] += 1 }
    else if(DateTime === "06")
    {CountMonths[5] += 1 }
    else if(DateTime === "07")
    {CountMonths[6] += 1 }
    else if(DateTime === "08")
    {CountMonths[7] += 1 }
    else if(DateTime === "09")
    {CountMonths[8] += 1 }
    else if(DateTime === "10")
    {CountMonths[9] += 1 }
    else if(DateTime === "11")
    {CountMonths[10] += 1 }
    else if(DateTime === "12")
    {CountMonths[11] += 1 }
  });
  setCountMonths(CountMonths);
  };

  


  
  var data = {
    labels: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sup.', 'Oct.', 'Nov.','Dec.'],
    datasets: [{
        label: 'จำนวนการยืมในแต่ละเดือน',
        data: CountMonths,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 132, 99, 0.2)',
            'rgba(54, 235, 100, 0.2)',
            'rgba(255, 106, 86, 0.2)',
            'rgba(75, 19, 192, 0.2)',
            'rgba(153, 102, 25, 0.2)',
            'rgba(255, 109, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 132, 99, 1',
          'rgba(54, 235, 100, 1)',
          'rgba(255, 106, 86, 1)',
          'rgba(75, 19, 192, 1)',
          'rgba(153, 102, 25, 1)',
          'rgba(255, 109, 64, 1)'
        ],
        borderWidth: 1
    }]
    }
     

  return (
       <div>
        <Bar
        data={data}

        height = {400}
        width = {600}
        />
      </div>
        
        
);        
}

export default BarChart;


