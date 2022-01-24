import React from 'react';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2'
import FirebaseApp from '../firebase';
import { useEffect,useState } from 'react';
import { getFirestore,collection, query, where, getDocs,setDoc,doc,updateDoc } from '@firebase/firestore';
import moment from 'moment';

ChartJS.register(
  Tooltip,
  Legend,
  ArcElement
)

function PieChart() 
{

    const ConvertTime = (Value) => {
        const TimeAfter = new Date(Value.seconds * 1000 + Value.nanoseconds/1000000)
        const TimeAfterFormat = moment(TimeAfter).format('MM');
        return TimeAfterFormat;
       };
    
      const [Count,setCount] = useState([]);   
      //ทำงานตอนเริ่ม
      useEffect(()=> {
        getData();
    
      },[]);
      const db = getFirestore();
      const getData = async() => { 
      const Count = [0,0,0,0];
    
      const q = query(collection(db, "Borrow"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const Years = doc.data().College_Years;
    
        if(Years == "01")
        {Count[0] += 1 }
        else if(Years == "02")
        {Count[1] += 1 }
        else if(Years == "03")
        {Count[2] += 1 }
        else if(Years == "04")
        {Count[3] += 1 }
      });
    
      //--------------
      const q2 = query(collection(db, "History"));
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach((doc) => {
        const Years = doc.data().College_Years;
    
        if(Years == "1")
        {Count[0] += 1 }
        else if(Years == "2")
        {Count[1] += 1 }
        else if(Years == "3")
        {Count[2] += 1 }
        else if(Years == "4")
        {Count[3] += 1 }
      });
      setCount(Count);
      };
    
      
    

  
  var data = {
    labels: ['ปี 1', 'ปี 2', 'ปี 3', 'ปี 4'],
    datasets: [{
        label: 'สัดส่วนการยืมแต่ละชั้นปี',
        data: Count,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
           
        ],
        borderWidth: 1
    }]
    }
     

  return (
       <div>
        <Pie
        data={data}

        height = {400}
        width = {600}
        />
      </div>
        
        
);        
}

export default PieChart;


