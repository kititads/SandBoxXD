import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';  
import './Table.css';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { getFirestore,collection, query, where, getDocs,doc,deleteDoc,updateDoc,orderBy  } from '@firebase/firestore';
import FirebaseApp from '../firebase';
import moment from 'moment';
import PendingToBorrow from './PendingToBorrow';
import { useEffect,useState } from 'react';
import Cookies from 'universal-cookie';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TextField from '@mui/material/TextField';

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
    const [DataListUser,setDataListUser] = useState([]);   

    const db = getFirestore();
    const [UserState,setUserState] = useState("");
    const [AdminState,setAdminState] = useState("");
    const [Why,setWhy] = useState("");


    //----------------------------------------------
    const [PeadingNumber, setPeadingNumber] = useState(0);
    const [MaxPeadingNumber, setMaxPeadingNumber] = useState(0);
    if(PeadingNumber<0)
    {
      setPeadingNumber(0);
    }
    if(PeadingNumber>MaxPeadingNumber)
    {
      setPeadingNumber(MaxPeadingNumber);
    }



    //???????????????????????????????????????
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
    //????????????????????? 
    const q = query(collection(db, "Pending"),orderBy("Pending_ID", "asc"));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => { 
      if(cookies.get('Status_User') === "User")
      {
        if(doc.data().Student_ID === cookies.get('Student_ID'))
        {
        if(doc.data().Pending_Status === "?????????????????????????????????")
        {
        items.push(doc.data());    
        }
        } 

      }
      else
      {
        if(doc.data().Pending_Status === "?????????????????????????????????")
        {
        items.push(doc.data());    
        }
  
              
      }
      
    });
       setDataList(items); 
    };

    const getData0 = async() => { 
      //?????????????????????
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
      
        //??????????????????
        const getDataUser = async() => { 
        const q = query(collection(db, "User"));
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => { 
         
          items.push(doc.data());    

  
        });
           setDataListUser(items); 
        };


  //???????????????
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


  //?????????????????????????????????????????????
  

  
  const UpdatePending = async(PendingID) => {
    const docRef = doc(db, "Pending", PendingID.toString());
    const payload = {
        Pending_Status:"??????????????????????????????????????????",
        Pending_Why:Why

    };
    handleClose2();
    handleClose3();
    handleClose4();

    await updateDoc(docRef,payload);

  getData();
  };

  const UpdatePending4 = async(PendingID) => {
    const docRef = doc(db, "Pending", PendingID.toString());
    const payload = {
        Pending_Status:"????????????????????????????????????????????????????????????????????????",
        Pending_Why:"????????????????????????????????????????????????????????????????????????"

    };
    handleClose2();
    handleClose3();
    handleClose4();

    await updateDoc(docRef,payload);

  getData();
  };

  const UpdateUser = async(UID) => {
    const docRef = doc(db, "User", UID[0].User_ID.toString());
    var NewCount = UID[0].Count_Borrow+1
    const payload = {
      Count_Borrow:NewCount

    };
    handleClose2();
    handleClose3();
    handleClose4();

    await updateDoc(docRef,payload);

  };


  const UpdatePending2 = async(PendingID) => {
    const docRef = doc(db, "Pending", PendingID.toString());
    const payload = {
        Pending_Status:"???????????????????????????????????????",
        Pending_Why:Why

    };
    handleClose2();
    handleClose3();
    await updateDoc(docRef,payload);

  getData();
  };

  const UpdatePending3 = async(PendingID) => {
    console.log(PeadingNumber);
    if(PeadingNumber === 0)
    {
      handleClose2();
      handleClose3();
      handleClose4();
      handleClickOpen5();
    }
    else
    {
    const docRef = doc(db, "Pending", PendingID.toString());
    const payload = {
      Borrow_Quantity:PeadingNumber.toString()
    };
    handleClose2();
    handleClose3();
    handleClose4();

    await updateDoc(docRef,payload);

  getData();
    }
  };

  
  


  
   //-----------------------------------------
    const PTB = async(PendingID,DataList,DataList0,NextID,UID)  => { 
    PendingToBorrow(PendingID,DataList,DataList0,NextID);
    UpdatePending4(PendingID);
    //?????????????????????????????????????????????????????????????????????????????????????????????
    //UpdateUser(UID); 

  };


  //???????????????????????????
    const getIndex = async(PendingID,RealSTD) => { 
      console.log(RealSTD)

    handleClose1();
    const querySnapshot = await getDocs(collection(db, "Count"));
    querySnapshot.forEach((doc) => {
    const Borrow_ID =  doc.data().Count_Borrow_ID;
    const NextID =  (Borrow_ID+1);
    UpdateNewID(NextID);
    const UID = DataListUser.filter(DL=>{
      if(DL.Student_ID === RealSTD)
      {
        return DL
      }
    })
    PTB(PendingID,DataList,DataList0,NextID,UID);
   


    }
    )

    };
    
    //????????????????????????????????????
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
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);

    //??????????????????
    const [RealPendingID,setRealPendingID] = useState(0);
    const [RealStudentID,setRealStudentID] = useState(0);



    const handleClickOpen1 = (PID,SID) => {
    setRealPendingID(PID);
    setRealStudentID(SID);
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

    const handleClickOpen4 = (PID) => {
      setRealPendingID(PID);
      setOpen4(true);

      EditPending(PID);
      console.log(DataList);




    };
    
    const handleClose4 = () => {
      setOpen4(false);
    };

    const handleClickOpen5 = () => {
      setOpen5(true);

    };
    
    const handleClose5 = () => {
      setOpen5(false);
    };


    const EditPending = (PID) => {
      DataList.map(A=>{
        if(A.Pending_ID === PID){
          setPeadingNumber(parseInt(A.Borrow_Quantity));
          setMaxPeadingNumber(DataList0[A.EM_ID].EM_Quantity-DataList0[A.EM_ID].EM_UseQuantity);
        }
      })





    };



  return (
    <><div>        
    <div className="SubBG-TextSet border border-black">
    <Form className="d-flex Search-Set-button">
    <FormControl
    type="search"
    placeholder="???????????????"
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
            <TableCell style={{minWidth:70}}className={classes.tableHeaderCellCanHide}>???????????????????????????</TableCell>
            <TableCell className={classes.tableHeaderCell}>??????????????????	</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide}>????????????</TableCell>
            <TableCell style={{minWidth:190}} className={classes.tableHeaderCellCanHide}>???????????????</TableCell>
            <TableCell style={{minWidth:160}} className={classes.tableHeaderCellCanHide}>??????????????????</TableCell>
            <TableCell style={{minWidth:150}} className={classes.tableHeaderCell} >??????????????????????????????</TableCell>
            <TableCell style={{minWidth:150}} className={classes.tableHeaderCell} >???????????????????????????</TableCell>

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
            ??????????????????????????????????????????
 : {DL.Borrow_Quantity}
            </Typography>
            <Typography className={classes.name}>
            ???????????????????????????????????????????????? : {DataList0[DL.EM_ID].EM_Quantity-DataList0[DL.EM_ID].EM_UseQuantity}</Typography>
            </TableCell>
            <TableCell className={classes.CheckHide}>
            <Typography className={classes.name}>
             <div>  {ConvertTime(DL.Loan_Date)}</div>
             <div> -</div>

             <div>  {ConvertTime(DL.Due_Date)}</div></Typography>
            </TableCell>
            <TableCell>
            <Typography style={{textAlign:"left"}} className={classes.name}>{DL.User_Name}</Typography>
            </TableCell>
            <TableCell>

            <div hidden={AdminState} className="Pending_button">
            {(DL.Borrow_Quantity > DataList0[DL.EM_ID].EM_Quantity-DataList0[DL.EM_ID].EM_UseQuantity && 
            <Button disabled="true" variant="contained" startIcon={<DoneIcon />} color="primary"  size="small"  style={{minWidth: '110px' }}   onClick={()=>handleClickOpen1(DL.Pending_ID,DL.Student_ID)}>??????????????????</Button>)} 
            </div >
            <div hidden={AdminState} className="Pending_button">
            {(DL.Borrow_Quantity <= DataList0[DL.EM_ID].EM_Quantity-DataList0[DL.EM_ID].EM_UseQuantity && 
            <Button variant="contained" startIcon={<DoneIcon />} color="primary"  size="small"  style={{minWidth: '110px' }}   onClick={()=>handleClickOpen1(DL.Pending_ID,DL.Student_ID)}>??????????????????</Button>            )} 
            </div>
            <div hidden={AdminState} className="Pending_button"><Button variant="contained" startIcon={<EditOutlinedIcon />} color="warning" size="small" style={{minWidth: '110px'}}   onClick={()=>handleClickOpen4(DL.Pending_ID)}>???????????????????????????</Button></div>
            <div hidden={AdminState} className="Pending_button"><Button variant="contained" startIcon={<CloseIcon />} color="error" size="small" style={{minWidth: '110px'}}   onClick={()=>handleClickOpen2(DL.Pending_ID)}>???????????????????????????</Button></div>
            <div hidden={UserState} className="Pending_button"><Button variant="contained" startIcon={<CloseIcon />}  color="error" size="small"  style={{minWidth: '110px'}}   onClick={()=>handleClickOpen3(DL.Pending_ID)}>??????????????????????????????</Button></div>

            </TableCell>
            </TableRow>
          ))}
        </TableBody>
          {/* Admin 1 */}
          <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        {"???????????????????????????????????????"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {"???????????????????????????????????????????????????????????????????????????????????????????????????"} 
        </DialogContentText>
        
        </DialogContent>
        <DialogActions>
        <Button onClick={() => getIndex(RealPendingID,RealStudentID)}>?????????</Button>
        <Button onClick={handleClose1} autoFocus style={{color: "red"}}>
         ??????????????????
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
        {"???????????????????????????????????????"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {"????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"} 
      
        </DialogContentText>     
        <DialogContentText id="alert-dialog-description">
        {"?????????"} 
      
        
      
        </DialogContentText>  
        <DialogContentText id="alert-dialog-description">
        {"??????????????????????????? :"} 
      
        </DialogContentText>     
      
        <DialogContentText id="alert-dialog-description">
 

        <textarea rows="4" cols="34" className='textarea-set'
        value={Why}
        onChange={e => { setWhy(e.target.value); }}
        ></textarea>
        </DialogContentText>
        
        </DialogContent>
        <DialogActions>
        <Button onClick={() => UpdatePending(RealPendingID)}>?????????</Button>
        <Button onClick={handleClose2} autoFocus style={{color: "red"}}>
         ??????????????????
        </Button>
        </DialogActions>
        </Dialog>

        {/* User 3 */}
        <Dialog
        open={open3}
        onClose={handleClose3}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        {"???????????????????????????????????????"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {"??????????????????????????????????????????????????????????????????????????????????????????"} 
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
        {"?????????"} 
      
        
      
        </DialogContentText>  
        <DialogContentText id="alert-dialog-description">
        {"??????????????????????????? :"} 
      
        </DialogContentText>     
      
        <DialogContentText id="alert-dialog-description">
 

        <textarea rows="4" cols="34" className='textarea-set'
        value={Why}
        onChange={e => { setWhy(e.target.value); }}
        ></textarea>
        </DialogContentText>

        </DialogContent>
        <DialogActions>
        <Button onClick={() => UpdatePending2(RealPendingID)}>?????????</Button>
        <Button onClick={handleClose3} autoFocus style={{color: "red"}}>
         ??????????????????
        </Button>
        </DialogActions>
        </Dialog>

        

        {/* Admin 4 Edit*/}
        <Dialog
        open={open4}
        onClose={handleClose4}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        {""}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {"*????????????????????????????????????????????????????????????????????????????????????????????????????????????"} 
      
        
      
        </DialogContentText>  
        <DialogContentText id="alert-dialog-description">
        {"?????????"} 
      
        
      
        </DialogContentText>    
        <DialogContentText id="alert-dialog-description">
        <TextField
          id="outlined-number"
          label="??????????????????????????????????????????????????????"
          type="number"
          size="small"
          style={{maxWidth: '190px'}}
          value={PeadingNumber}
          onChange={e => { setPeadingNumber(e.target.value); }}
          InputLabelProps={{
            shrink: true,
            
          }}
          
        />
      
        </DialogContentText>          
        
        </DialogContent>
        <DialogActions>
        <Button onClick={() => UpdatePending3(RealPendingID)}>???????????????</Button>
        <Button onClick={handleClose4} autoFocus style={{color: "red"}}>
         ??????????????????
        </Button>
        </DialogActions>
        </Dialog>


        {/* Dialog 4 */}
        <Dialog
        open={open5}
        onClose={handleClose5}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        {"????????????????????????????????????????????????"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {"??????????????????????????????????????? 0 ????????????????????????????????????????????????"}        
        </DialogContentText>
         
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose5}>?????????????????????</Button>
 
        </DialogActions>
        </Dialog>  



        
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