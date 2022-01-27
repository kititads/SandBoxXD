import faker, { date } from 'faker';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';  
import './Table.css';
import { useEffect,useState } from 'react';
import { BsTable } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { getFirestore,collection, query, where, getDocs,doc,deleteDoc,updateDoc, orderBy  } from '@firebase/firestore';
import FirebaseApp from '../firebase';
import moment from 'moment';
import BorrowToHistory from './BorrowToHistory';
import Cookies from 'universal-cookie';
import SendIcon from '@mui/icons-material/Send';


import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination
 } from '@material-ui/core';

//-------------------------------------------//
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



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
function BorrowTable() {


    //Dialog
    const [open, setOpen] = React.useState(false);
    const [RealPendingID,setRealPendingID] = useState(0);

    

    const handleClickOpen = (PID) => {
      setRealPendingID(PID);

      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

  
    const [DataList,setDataList] = useState([]);   
    const [DataList0,setDataList0] = useState([]);   

    //ทำงานตอนเริ่ม
    useEffect(()=> {
      const cookies = new Cookies();
      if(cookies.get('Status_User') === "Admin")
      {
        getData0();

      }
      else
      {
        window.location.href = "/NotFound";      
      }
    },[]);

    const getData = async() => { 
    const q = query(collection(db, "Borrow"),orderBy("Borrow_ID", "asc"));
    const querySnapshot = await getDocs(q);
    const items = [];
    const TodayDate = new Date();
    querySnapshot.forEach((doc) => {
      const ArrayData = doc.data();
      const TimeTest = new Date(ArrayData.Due_Date.seconds * 1000 + ArrayData.Due_Date.nanoseconds/1000000)
      const TodayDateAfterFormat = moment(TodayDate).format('DD/MM/YYYY');
      const TimeTestAfterFormat = moment(TimeTest).format('DD/MM/YYYY');

      if(TodayDateAfterFormat > TimeTestAfterFormat)
      {
        
        if(ArrayData.Borrow_Status != "ยืมเกินกำหนด")
        {
          UpdateNewStatus(ArrayData.Borrow_ID);
        }
        ArrayData.Borrow_Status = "ยืมเกินกำหนด";
        items.push(ArrayData)  
      }
      else
      {
        items.push(ArrayData)   
       

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


    //ลบคำขอ
    const DelPending = async(BorrowID) => {
    await deleteDoc(doc(db, "Borrow", BorrowID.toString()));
    getData();
    };

  
    //-----------------------------------------
    const BTH = async(BorrowID,DataList,DataList0,NextID)  => { 
      BorrowToHistory(BorrowID,DataList,DataList0,NextID);
    };
  
  
    //รันเลขยืม
      const getIndex = async(BorrowID) => { 
      const querySnapshot = await getDocs(collection(db, "Count"));
      querySnapshot.forEach((doc) => {
      const History_ID =  doc.data().Count_History_ID;
      const NextID =  (History_ID+1);
      UpdateNewID(NextID);
      console.log("Table NextID"+NextID);
      BTH(BorrowID,DataList,DataList0,NextID);
      DelPending(BorrowID);
      handleClose();

      }
      )
  
      };
      
      //อัพเดตสถานะยืม
      const UpdateNewStatus = async(B_ID) => {    
        const docRef = doc(db,"Borrow",B_ID.toString());
        const payload = {
          Borrow_Status: "ยืมเกินกำหนด",
        };
        await updateDoc(docRef,payload);
        };

      //อัพเดตเลขยืม
      const UpdateNewID = async(NextID) => {    
      const docRef = doc(db,"Count","1");
      const payload = {
        Count_History_ID: NextID,
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
            <TableCell className={classes.tableHeaderCellCanHide}>Borrow ID</TableCell>
            <TableCell className={classes.tableHeaderCell}>Image	</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide}>Name</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide}>Quantity</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide}>Date</TableCell>
            <TableCell className={classes.tableHeaderCell}>User</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide}>Borrow Status</TableCell>
            <TableCell className={classes.tableHeaderCell}>More</TableCell>
        
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
            <TableCell>

            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            {"ข้อความยืนยัน"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {"ยืนยันคืนอุปกรณ์ใช่หรือไม่"} 
            </DialogContentText>
            
            </DialogContent>
            <DialogActions>
            <Button onClick={() => getIndex(RealPendingID)}>ใช่</Button>
            <Button onClick={handleClose} autoFocus style={{color: "red"}}>
            ไม่ใช่
            </Button>
            </DialogActions>
            </Dialog>



            <Button variant="contained" startIcon={<SendIcon  />} color="info" size="medium" style={{minWidth: '120px'}} onClick={()=>handleClickOpen(DL.Borrow_ID)}>คืนอุปกรณ์</Button>{' '}

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

export default BorrowTable;