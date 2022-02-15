import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';  
import './Table.css';
import { useEffect,useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { getFirestore,collection, query, getDocs,doc,deleteDoc,updateDoc, orderBy  } from '@firebase/firestore';
import FirebaseApp from '../firebase';
import moment from 'moment';
import BorrowToHistory from './BorrowToHistory';
import Cookies from 'universal-cookie';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';


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


    //----------------------------------------------
   


    //Dialog
    const [open, setOpen] = React.useState(false);
    const [RealPendingID,setRealPendingID] = useState(0);

    const UpdatePeadingNumber = (PID) => {
      DataList.map(A=>{
      

        if(A.Borrow_ID === PID)
        {
          setMaxPeadingNumber(parseInt(A.Borrow_Quantity));
        }
      })
    };
    const [RealStudentID,setRealStudentID] = useState(0);

    const handleClickOpen = (PID,SID) => {
      UpdatePeadingNumber(PID);
      setRealPendingID(PID);
      setRealStudentID(SID);
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

  
    const [DataList,setDataList] = useState([]);   
    const [DataList0,setDataList0] = useState([]);   
    const [DataListUser,setDataListUser] = useState([]);   
    const [Why,setWhy] = useState("");
    const [ReturnType,setReturnType] = useState("คืนอุปกรณ์ครบ");
    const [EquipmentBroken,setEquipmentBroken] = useState(1);
    const [MaxPeadingNumber, setMaxPeadingNumber] = useState(1);
    if(EquipmentBroken<0)
    {
      setEquipmentBroken(0);
    }
    if(EquipmentBroken>MaxPeadingNumber)
    {
      setEquipmentBroken(MaxPeadingNumber);
    }


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
      const TodayDateAfterFormat = moment(TodayDate).format('MM/DD/YYYY');
      const TimeTestAfterFormat = moment(TimeTest).format('MM/DD/YYYY');
      

      if(ArrayData.Borrow_US === "กำลังยืม")
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
         getDataUser();

         getData();
      };

      //ผู้ใช้
      const getDataUser = async() => { 
        const q = query(collection(db, "User"));
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => { 
         
          items.push(doc.data());    

  
        });
           setDataListUser(items); 
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


    //อัพเดตคำขอ
    const UpdatePending = async(BorrowID) => {
    const UpdatedocRef = doc(db, "Borrow", BorrowID.toString());
    const Updatepayload = {
      Borrow_US: "คืนอุปกรณ์แล้ว"
  
      };
    await updateDoc(UpdatedocRef,Updatepayload);
    
    getData();
    }

    

    

   
    
    



    //-----------------------------------------
    const BTH = async(BorrowID,DataList,DataList0,NextID,ReturnType,EquipmentBroken,Why,UID)  => { 
      BorrowToHistory(BorrowID,DataList,DataList0,NextID,ReturnType,EquipmentBroken,Why);
     
      UpdateUser(UID);
      
    };
  
    const UpdateUser = async(UID) => {
      const docRef = doc(db, "User", UID[0].User_ID.toString());
      var NewCountBorrow = UID[0].Count_Borrow+1
      var NewCountBroken = UID[0].Count_Broken+1
      if(ReturnType === "อุปกรณ์ชำรุดหรือสูญหาย")
      {
        const payload = 
        {
          Count_Borrow:NewCountBorrow,
          Count_Broken:NewCountBroken
        }
        await updateDoc(docRef,payload);

      }
      else
      {
        const payload = 
        {
          Count_Borrow:NewCountBorrow
        }
        await updateDoc(docRef,payload);

      }

      };
     

  


    //รันเลขยืม
      const getIndex = async(BorrowID,RealSTD) => { 
      const querySnapshot = await getDocs(collection(db, "Count"));
      querySnapshot.forEach((doc) => {
      const History_ID =  doc.data().Count_History_ID;
      const NextID =  (History_ID+1);
      UpdateNewID(NextID);
      console.log("Table NextID"+NextID);
      const UID = DataListUser.filter(DL=>{
        if(DL.Student_ID === RealSTD)
        {
          return DL
        }
      })


      BTH(BorrowID,DataList,DataList0,NextID,ReturnType,EquipmentBroken,Why,UID);
      UpdatePending(BorrowID);
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
    placeholder="ค้นหา"
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
            <TableCell style={{minWidth:70}} className={classes.tableHeaderCellCanHide}>เลขที่ยืม</TableCell>
            <TableCell className={classes.tableHeaderCell}>รูปภาพ	</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide}>ชื่อ</TableCell>
            <TableCell style={{minWidth:160}} className={classes.tableHeaderCellCanHide}>จำนวน</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide}>วันที่</TableCell>
            <TableCell style={{minWidth:150}} className={classes.tableHeaderCell}>ชื่อนักศึกษา</TableCell>
            <TableCell style={{minWidth:110}} className={classes.tableHeaderCellCanHide}>สถานะการยืม</TableCell>
            <TableCell className={classes.tableHeaderCell}>เพิ่มเติม</TableCell>
        
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
            <img src={DL.EM_Image}  className="img-set-Test" alt=""></img>
            </TableCell>
            <TableCell className={classes.CheckHide}>
            <Typography className={classes.name}>{DL.EM_Name}</Typography>
            </TableCell>
            <TableCell className={classes.CheckHide}>
            
            <Typography className={classes.name}>จำนวนที่ยืมไป : {DL.Borrow_Quantity}
            
            </Typography>
            
            </TableCell>
            <TableCell className={classes.CheckHide}>
            <Typography className={classes.name}>
             <div>  {ConvertTime(DL.Loan_Date)}</div>
             <div> - </div>

             <div>  {ConvertTime(DL.Due_Date)}</div></Typography>
            </TableCell>
            <TableCell >
            <Typography style={{textAlign:"left"}} className={classes.name}>{DL.User_Name}</Typography>
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
            {"เลือกรูปแบบการบันทึก :"} 
          
            </DialogContentText>     
          
            <DialogContentText id="alert-dialog-description">
    

            <select 
            value={ReturnType}
            onChange={e => setReturnType(e.target.value)}  name="EM_Status" id="Status">
            <option value="คืนอุปกรณ์ครบ"
            >คืนอุปกรณ์ครบ</option>
            <option value="อุปกรณ์ชำรุดหรือสูญหาย"
            >อุปกรณ์ชำรุดหรือสูญหาย</option>
            <option value="ยกเลิกรายการยืม"
            >ยกเลิกรายการยืม</option>
            </select>
            </DialogContentText>

            {"⠀⠀⠀"} 
            {/* คืนอุปกรณ์ครบ */}
            {(ReturnType === "คืนอุปกรณ์ครบ" && 
            
            <DialogContentText id="alert-dialog-description">   
            {"หมายเหตุ :"} 

            </DialogContentText>
            )} 
            {(ReturnType === "คืนอุปกรณ์ครบ" &&                
            <DialogContentText id="alert-dialog-description">
            <textarea rows="4" cols="34" className='textarea-set'
            value={Why}
            onChange={e => { setWhy(e.target.value); }}
            ></textarea>
            </DialogContentText>
            )} 

            {/* อุปกรณ์ชำรุดหรือสูญหาย */}
            
          
            
            {(ReturnType === "อุปกรณ์ชำรุดหรือสูญหาย" && 
            <DialogContentText id="alert-dialog-description">
            <TextField
             id="outlined-number"
             label="ใส่จำนวนอุปกรณ์ที่ชำรุดหรือหาย"
             type="number"
             size="small"
             style={{maxWidth: '190px'}}
             value={EquipmentBroken}
             onChange={e => { setEquipmentBroken(e.target.value); }}
             InputLabelProps={{
             shrink: true,
                        
            }}
                    
            />
            </DialogContentText>   
            )} 

            {(ReturnType === "อุปกรณ์ชำรุดหรือสูญหาย" && 
            
            <DialogContentText id="alert-dialog-description">   
            {"หมายเหตุ :"} 

            </DialogContentText>
            )} 
            {(ReturnType === "อุปกรณ์ชำรุดหรือสูญหาย" &&                
            <DialogContentText id="alert-dialog-description">
            <textarea rows="4" cols="34" className='textarea-set'
            value={Why}
            onChange={e => { setWhy(e.target.value); }}
            ></textarea>
            </DialogContentText>
            )} 

            {/* ยกเลิกรายการยืม */}
            {(ReturnType === "ยกเลิกรายการยืม" && 
            
            <DialogContentText id="alert-dialog-description">   
            {"ใส่เหตุผล :"} 

            </DialogContentText>
            )} 
            {(ReturnType === "ยกเลิกรายการยืม" &&                
            <DialogContentText id="alert-dialog-description">
            <textarea rows="4" cols="34" className='textarea-set'
            value={Why}
            onChange={e => { setWhy(e.target.value); }}
            ></textarea>
            </DialogContentText>
            )} 
            
            

            </DialogContent>


            <DialogActions>
            <Button onClick={() => getIndex(RealPendingID,RealStudentID)}>ยืนยัน</Button>
            <Button onClick={handleClose} autoFocus style={{color: "red"}}>
            ยกเลิก
            </Button>
            </DialogActions>
            </Dialog>



            <Button variant="contained" startIcon={<SendIcon  />} color="info" size="medium" style={{minWidth: '120px'}} onClick={()=>handleClickOpen(DL.Borrow_ID,DL.Student_ID)}>คืนอุปกรณ์</Button>{' '}

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