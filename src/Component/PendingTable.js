import faker from 'faker';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';  
import DeleteIcon from '@mui/icons-material/Delete';
import './Table.css';
import { BsTable } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { getFirestore,collection, query, where, getDocs,doc,deleteDoc,updateDoc,orderBy  } from '@firebase/firestore';
import FirebaseApp from '../firebase';
import moment from 'moment';
import PendingToBorrow from './PendingToBorrow';
import { useEffect,useState } from 'react';
import Cookies from 'universal-cookie';
import DoneIcon from '@mui/icons-material/Done';
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
        padding: '3px 10px',
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

        

function PendingTable() {
    const [DataList0,setDataList0] = useState([]);   
    const [DataList,setDataList] = useState([]);   

    const db = getFirestore();
    const [UserState,setUserState] = useState("");
    const [AdminState,setAdminState] = useState("");




    //ทำงานตอนเริ่ม
    useEffect(()=> {
    const cookies = new Cookies();
    if(cookies.get('Status_User') === "User")
    {
    getData0();

    setUserState("");
    setAdminState("true");
    }
  
    else if(cookies.get('Status_User') === "Admin")
    {
    getData0();

    setUserState("true");
    setAdminState("");

    }
    else
    {
    window.location.href = "/NotFound"

    }



    },[]);
    const cookies = new Cookies();

    const getData = async() => { 
    //คำขอยืม 
    const q = query(collection(db, "Pending"),orderBy("Pending_ID", "asc"));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => { 
      console.log(querySnapshot);
      if(cookies.get('Status_User') === "User")
      {
        if(doc.data().Student_ID === cookies.get('Student_ID'))
        {
        items.push(doc.data());    
        } 

      }
      else
      {
        items.push(doc.data());  
  
              
      }
      
    });
       setDataList(items); 
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
  const DelPending = async(PendingID) => {
    handleClose2();
    handleClose3();
  await deleteDoc(doc(db, "Pending", PendingID.toString()));


  getData();
  };

  
  //ไม่ใช้แล้ว

  // //ลบคำขอที่ซ้ำกัน
  // const SuperDelPending = async(PendingID) => {
  //   var EM_ID_TODO = [];
    
  //   DataList.map(DL=>{

  //     if(DL.Pending_ID === PendingID )
  //     {
  //       EM_ID_TODO = DL.EM_ID;
  //     }
  //   })
  //   DataList.map(DL=>{
    
  //     if(DL.EM_ID === EM_ID_TODO )
  //       {
  //        deleteDoc(doc(db, "Pending", DL.Pending_ID.toString()));
  //       }        
  //       })

  // getData();
  // };  






  
   //-----------------------------------------
    const PTB = async(PendingID,DataList,DataList0,NextID)  => { 
    PendingToBorrow(PendingID,DataList,DataList0,NextID);
    DelPending(PTB);
  };


  //รันเลขยืม
    const getIndex = async(PendingID) => { 
    handleClose1();
    const querySnapshot = await getDocs(collection(db, "Count"));
    querySnapshot.forEach((doc) => {
    const Borrow_ID =  doc.data().Count_Borrow_ID;
    const NextID =  (Borrow_ID+1);
    UpdateNewID(NextID);
    PTB(PendingID,DataList,DataList0,NextID);
    }
    )

    };
    
    //อัพเดตเลขยืม
    const UpdateNewID = async(NextID) => {    
    const docRef = doc(db,"Count","1");
    const payload = {
        Count_Borrow_ID: NextID,
    };
    await updateDoc(docRef,payload);
    };

    //Dialog
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    //แก้บัค
    const [RealPendingID,setRealPendingID] = useState(0);



    const handleClickOpen1 = (PID) => {
    setRealPendingID(PID);
    setOpen1(true);
     };

     const handleClose1 = () => {
      setOpen1(false);
    };

    const handleClickOpen2 = (PID) => {
      setRealPendingID(PID);
      setOpen2(true);
       };
  
    const handleClose2 = () => {
      setOpen2(false);
    };

    const handleClickOpen3 = (PID) => {
      setRealPendingID(PID);
      setOpen3(true);
    };
    
    const handleClose3 = () => {
      setOpen3(false);
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
            <TableCell className={classes.tableHeaderCellCanHide}>Pending ID</TableCell>
            <TableCell className={classes.tableHeaderCell}>Image	</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide}>Name</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide}>Quantity</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide}>Date</TableCell>
            <TableCell className={classes.tableHeaderCell} >User</TableCell>
            <TableCell className={classes.tableHeaderCell} >More</TableCell>

            </TableRow>
            </TableHead>
            <TableBody>
            {DataList
              .filter((DL) =>{
              
              if(Search === "")
              {
                  return DL;     
              }
              else if(DL.Pending_ID.toString().toLowerCase().includes(Search.toLowerCase()))
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
              else if(ConvertTime(DL.Loan_Date).toString().toLowerCase().includes(Search.toLowerCase()))
              {
                  return DL;
              }     
              else if(ConvertTime(DL.Due_Date).toString().toLowerCase().includes(Search.toLowerCase()))
              {
                  return DL;
              }  
              
              })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((DL) => (
            <TableRow key={DL.Pending_ID}>
            <TableCell className={classes.CheckHide}>
            <Grid>
            <Typography className={classes.name}>{DL.Pending_ID}</Typography>
            </Grid>
            </TableCell>
            <TableCell>
            <img src={DL.EM_Image}  className="img-set-Test"></img>
            </TableCell>
            <TableCell className={classes.CheckHide}>
            <Typography className={classes.name}>{DL.EM_Name}</Typography>
            </TableCell>
            <TableCell className={classes.CheckHide}> 
            <Typography className={classes.name}>

            {DL.Borrow_Quantity}
            /  
            {DataList0[DL.EM_ID].EM_Quantity-DataList0[DL.EM_ID].EM_UseQuantity}</Typography>
            </TableCell>
            <TableCell className={classes.CheckHide}>
            <Typography className={classes.name}>
             <div>  {ConvertTime(DL.Loan_Date)}</div>
             <div> -</div>

             <div>  {ConvertTime(DL.Due_Date)}</div></Typography>
            </TableCell>
            <TableCell>
            <Typography className={classes.name}>{DL.User_Name}</Typography>
            </TableCell>
            <TableCell>

         {/* Admin 1 */}
        <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        {"ข้อความยืนยัน"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {"คุณอนุมัติการยืมอุปกรณ์ใช่หรือไม่"} 
        </DialogContentText>
        
        </DialogContent>
        <DialogActions>
        <Button onClick={() => getIndex(RealPendingID)}>ใช่</Button>
        <Button onClick={handleClose1} autoFocus style={{color: "red"}}>
         ไม่ใช่
        </Button>
        </DialogActions>
        </Dialog>
        {/* Admin 2 */}
        <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        {"ข้อความยืนยัน"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {"คุณต้องการปฎิเสธคำขอยืมอุปกรณ์ใช่หรือไม่"} 
        </DialogContentText>
        
        </DialogContent>
        <DialogActions>
        <Button onClick={() => DelPending(RealPendingID)}>ใช่</Button>
        <Button onClick={handleClose2} autoFocus style={{color: "red"}}>
         ไม่ใช่
        </Button>
        </DialogActions>
        </Dialog>

        {/* User */}
        <Dialog
        open={open3}
        onClose={handleClose3}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        {"ข้อความยืนยัน"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {"คุณต้องการยกเลิกคำขอใช่หรือไม่"} 
        </DialogContentText>
        
        </DialogContent>
        <DialogActions>
        <Button onClick={() => DelPending(RealPendingID)}>ใช่</Button>
        <Button onClick={handleClose3} autoFocus style={{color: "red"}}>
         ไม่ใช่
        </Button>
        </DialogActions>
        </Dialog>





            <div hidden={AdminState} className="Pending_button"><Button variant="contained" startIcon={<DoneIcon />} color="primary"  size="small"  style={{minWidth: '110px' }}   onClick={()=>handleClickOpen1(DL.Pending_ID)}>อนุญาต</Button></div>
            <div hidden={AdminState} className="Pending_button"><Button variant="contained" startIcon={<DeleteIcon />} color="error" size="small" style={{minWidth: '110px'}}   onClick={()=>handleClickOpen2(DL.Pending_ID)}>ไม่อนุญาต</Button></div>
            <div hidden={UserState} className="Pending_button"><Button variant="contained" startIcon={<DeleteIcon />}  color="error" size="small"  style={{minWidth: '110px'}}   onClick={()=>handleClickOpen3(DL.Pending_ID)}>ยกเลิกคำขอ</Button></div>

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

export default PendingTable;