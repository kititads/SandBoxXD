import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Table.css';
import { useEffect,useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { getFirestore,collection, query, getDocs,doc,updateDoc, orderBy  } from '@firebase/firestore';
import FirebaseApp from '../firebase';
import moment from 'moment';
import Cookies from 'universal-cookie';


import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Typography,
    TablePagination
 } from '@material-ui/core';





const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,      
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950,
        
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#212F3D',
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        textAlign: 'center',
        fontSize: '1rem',

    },
    
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark,
        textAlign: 'center',

    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 20,
        padding: '6px 10px',
        display: 'inline-block',
        textAlign: 'center',

    }

    ,
    tableHeaderCellCanHide: {
        fontWeight: 'bold',
        backgroundColor: '#212F3D',
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        textAlign: 'center',
        fontSize: '1rem',
        [theme.breakpoints.down('md')]: {
        display: 'none' ,
        }
        }
    ,CheckHide: {
      [theme.breakpoints.down('md')]: {
        display: 'none' ,
        }
        }

  }));

const db = getFirestore();
function BorrowEM() {


    

  
    const [DataList,setDataList] = useState([]);   
    const [DataList0,setDataList0] = useState([]);   

    //ทำงานตอนเริ่ม
    useEffect(()=> {
      const cookies = new Cookies();
      if(cookies.get('Status_User') === "User")
      {
        getData0();

      }
      else
      {
        window.location.href = "/NotFound";      
      }
    },[]);
    const cookies = new Cookies();
    const StuedID = cookies.get('Student_ID')
    const getData = async() => { 
    const q = query(collection(db, "Borrow"),orderBy("Borrow_ID", "asc"));
    const querySnapshot = await getDocs(q);
    const items = [];
    const TodayDate = new Date();
    querySnapshot.forEach((doc) => {
      const ArrayData = doc.data();
      const TimeTest = new Date(ArrayData.Due_Date.seconds * 1000 + ArrayData.Due_Date.nanoseconds/1000000)
      const TodayDateAfterFormat = moment(TodayDate).format('MM/DD/YYYY');
      const TimeTestAfterFormat = moment(TimeTest).format('MM/DD/YYYY');

      if(ArrayData.Student_ID === StuedID)
      {
          

      if(TodayDateAfterFormat <= TimeTestAfterFormat)
      {
        items.push(ArrayData)   
         
      }
      else
      {
        if(ArrayData.Borrow_Status !== "ยืมเกินกำหนด")
        {
          UpdateNewStatus(ArrayData.Borrow_ID);
        }
        ArrayData.Borrow_Status = "ยืมเกินกำหนด";
        items.push(ArrayData) 
       

      }
    }
    
    });
    
    setDataList(items);
    console.log(items);
    };


    const getData0 = async() => { 
      //อุปกรณ์
      const q = query(collection(db, "Equipment"),orderBy("EM_ID", "asc"));
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => { 
        var NoData = doc.data().EM_ID;
        
       
          items[NoData] = doc.data();  
    

      });
         setDataList0(items); 
         getData();
      };


    //ตาราง
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [Search,setSearch] = useState("");
   const ConvertTime = (Value) => {
   const TimeAfter = new Date(Value.seconds * 1000 + Value.nanoseconds/1000000)
   const TimeAfterFormat = moment(TimeAfter).format('DD/MM/YYYY');
   return TimeAfterFormat;
  };


      
      //อัพเดตสถานะยืม
      const UpdateNewStatus = async(B_ID) => {    
        const docRef = doc(db,"Borrow",B_ID.toString());
        const payload = {
          Borrow_Status: "ยืมเกินกำหนด",
        };
        await updateDoc(docRef,payload);
        };

 


  return (
    <><div>        
    <div className="SubBG-TextSet border border-black">
    <Form className="d-flex Search-Set-button">
    <FormControl
    type="search"
    placeholder="Search"
    className="mr-2"
    aria-label="Search"
    onChange={(e) => setSearch(e.target.value)}
    onKeyPress={e => {
        if (e.key === 'Enter') e.preventDefault();
      }} 
    />
    </Form>
    
    <div>
    </div>
    </div>
    </div>

    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCellCanHide}>เลขที่ยืม</TableCell>
            <TableCell className={classes.tableHeaderCell}>รูปภาพ	</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide}>ชื่อ</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide}>จำนวน</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide}>วันที่</TableCell>
            <TableCell className={classes.tableHeaderCell}>ชื่อผู้ใช้</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide}>สถานะการยืม</TableCell>
        
            </TableRow>
            </TableHead>
            <TableBody>
            {DataList
            .filter((DL) =>{
              if(Search === "")
              {
                  return DL;     
              }
              else if(DL.Borrow_ID.toString().toLowerCase().includes(Search.toLowerCase()))
              {
                  return DL;
              }
              else if(DL.EM_Name.toLowerCase().includes(Search.toLowerCase()))
              {
                  return DL;
              }
              else if(DL.User_Name.toLowerCase().includes(Search.toLowerCase()))
              {
                  return DL;
              }
              else if(DL.Borrow_Status.toLowerCase().includes(Search.toLowerCase()))
                  return DL;
              })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((DL) => (
            <TableRow key={DL.Borrow_ID}>
            <TableCell className={classes.CheckHide}>
            <Grid>
            <Typography className={classes.name}>{DL.Borrow_ID}</Typography>
            </Grid>
            </TableCell>
            <TableCell>
            <img src={DL.EM_Image}  className="img-set-Test"></img>
            </TableCell>
            <TableCell className={classes.CheckHide}>
            <Typography className={classes.name}>{DL.EM_Name}</Typography>
            </TableCell>
            <TableCell className={classes.CheckHide}>
            
            <Typography className={classes.name}>{DL.Borrow_Quantity}</Typography>
            </TableCell>
            <TableCell className={classes.CheckHide}>
            <Typography className={classes.name}>
             <div>  {ConvertTime(DL.Loan_Date)}</div>
             <div> - </div>

             <div>  {ConvertTime(DL.Due_Date)}</div></Typography>
            </TableCell>
            <TableCell >
            <Typography className={classes.name}>{DL.User_Name}</Typography>
            </TableCell>
            <TableCell className={classes.CheckHide}>
            <Typography
            className={classes.status}
            style={{
            backgroundColor: ((DL.Borrow_Status === 'ไม่ถึงกำหนดคืน' && 'green') ||
            (DL.Borrow_Status === 'ยืมเกินกำหนด' && 'red') 
            )
            }}
            >{DL.Borrow_Status}</Typography>
            </TableCell>
           
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={DataList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        
       </TableContainer>

      </>
  );
}

export default BorrowEM;