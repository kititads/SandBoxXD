import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';  
import './Table.css';
import { useEffect,useState } from 'react';
import { BsTable } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { getFirestore,collection, query, getDocs,doc,updateDoc,orderBy  } from '@firebase/firestore';
import FirebaseApp from '../firebase';
import Cookies from 'universal-cookie';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import DeleteIcon from '@mui/icons-material/Delete';
//-------------------------------------------//
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



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
        }
        ,

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
        padding: '5px 10px',
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
        

function SearchTable() {
    const [DataList,setDataList] = useState([]);   
    //???????????????????????????????????????
    useEffect(()=> {
      getData();

    },[]);
    const cookies = new Cookies();
    
    const getData = async() => { 
    const q = query(collection(db, "Equipment"),orderBy("EM_ID", "asc"));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      if(cookies.get('Status_User') === "Admin")
      {
        if(doc.data().EM_US === "????????????")
        {
        items.push(doc.data());    
        }
      }
      else if(doc.data().EM_Status ==="?????????????????????????????????" || doc.data().EM_Status ==="???????????????????????????????????????")
      {
        if(doc.data().EM_US === "????????????"){
        items.push(doc.data());    
        }
      }
      
      
    });
      setDataList(items);
    };

  const [open1, setOpen1] = React.useState(false);
  const [RealID,setRealID] = useState(0);

  const handleClickOpen1 = (PID) => {
    setRealID(PID);
    setOpen1(true);
     };

     const handleClose1 = () => {
      setOpen1(false);
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

    //???????????????????????????????????????
    const UpdateEquipment = async(EquipmentID) => {
      const docRef = doc(db, "Equipment", EquipmentID.toString());
      const payload = {
          EM_US:"?????????????????????????????????????????????"
      };
      handleClose1();
     
      await updateDoc(docRef,payload);

    
    getData();
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
        {"???????????????????????????????????????????????????????????????????????????????????????????????????????????????"} 
        </DialogContentText>
        
        </DialogContent>
        <DialogActions>
        <Button onClick={() => UpdateEquipment(RealID)}>?????????</Button>
        <Button onClick={handleClose1} autoFocus style={{color: "red"}}>
         ??????????????????
        </Button>
        </DialogActions>
        </Dialog>

    <div className="page-set Home-Set-Title-2">
    </div>
    </div>
    </div>

    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCellCanHide} >?????????????????????????????????</TableCell>
            <TableCell className={classes.tableHeaderCell} >??????????????????</TableCell>
            <TableCell className={classes.tableHeaderCell} >????????????</TableCell>
            <TableCell style={{minWidth:180}} className={classes.tableHeaderCellCanHide} >???????????????</TableCell>
            <TableCell style={{minWidth:140}}  className={classes.tableHeaderCellCanHide} >???????????????</TableCell>
            <TableCell className={classes.tableHeaderCell} >???????????????????????????</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              {DataList
              .filter((DL) =>{
              if(Search === "")
              {
                  return DL;     
              }
              else if(DL.EM_ID.toString().toLowerCase().includes(Search.toLowerCase()))
              {
                  return DL;
              }
              else if(DL.EM_Name.toLowerCase().includes(Search.toLowerCase()))
              {
                  return DL;
              }else if(DL.EM_Status.toLowerCase().includes(Search.toLowerCase()))
              {
                  return DL;
              }
              
              })
            
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((DL) => (            
            
            <TableRow key={DL.EM_ID}>
            <TableCell className={classes.CheckHide}>
            <Grid>
            <Typography className={classes.name}>{DL.EM_ID}</Typography>
            </Grid>
            </TableCell>
            <TableCell>
            <img src={DL.EM_Image}  className="img-set-Test"></img>
            </TableCell>
            <TableCell>
            <Typography className={classes.name}>{DL.EM_Name}</Typography>
            </TableCell>
            <TableCell  className={classes.CheckHide}>
            <Typography className={classes.name}>?????????????????????????????????????????? : {DL.EM_Quantity-DL.EM_UseQuantity}</Typography>
            <Typography className={classes.name}>?????????????????????????????????????????? : {DL.EM_UseQuantity}</Typography>

            <Typography className={classes.name}>???????????????????????????????????? : {DL.EM_Quantity}</Typography>

            </TableCell>
            <TableCell  className={classes.CheckHide}>
            <Typography
            className={classes.status}
            style={{
            backgroundColor: 
            ((DL.EM_Status === '?????????????????????????????????' && 'green') ||
            (DL.EM_Status === '??????????????????????????????????????????' && 'red') ||
            (DL.EM_Status === '???????????????????????????????????????' && 'blue'))
            }}
            >{DL.EM_Status}</Typography>
            </TableCell>
            <TableCell>
            <div className="SerachTable_button">
            <a href={"/detail/"+DL.EM_ID}><Button variant="contained" startIcon={<ArticleOutlinedIcon />} color="info" style={{minWidth: '120px'}} size="small" value={DL.EM_ID} >??????????????????????????????</Button></a>
            </div>
            <div className="SerachTable_button">
            {(cookies.get('Status_User') === "Admin" && 
            <a href={"/historyEM/"+DL.EM_ID}><Button variant="contained" startIcon={<HistoryEduIcon />} color="success" style={{minWidth: '120px'}}  size="small" value={DL.EM_ID} >???????????????????????????????????????</Button></a>           
            )} 
            </div>
            
            <div className="SerachTable_button">
            {(cookies.get('Status_User') === "Admin" && 
            <a href={"/edit/"+DL.EM_ID}><Button variant="contained" startIcon={<EditOutlinedIcon />} color="warning" style={{minWidth: '120px'}}  size="small" value={DL.EM_ID} >????????????????????????????????????</Button></a>                  
            )} 
            </div>
            <div className="SerachTable_button">
            {(cookies.get('Status_User') === "Admin"&& DL.EM_UseQuantity === 0 && 
            <Button variant="contained" startIcon={<DeleteIcon />} color="error" style={{minWidth: '120px'}} onClick={()=>handleClickOpen1(DL.EM_ID)} size="small" value={DL.EM_ID} >???????????????????????????</Button>                  
            )} 
            </div>
            <div className="SerachTable_button">
            {(cookies.get('Status_User') === "Admin"&& DL.EM_UseQuantity !== 0 && 
            <Button variant="contained" startIcon={<DeleteIcon />} color="error" style={{minWidth: '120px'}} onClick={()=>handleClickOpen1(DL.EM_ID)} size="small" value={DL.EM_ID} disabled="true">??????????????????????????? </Button>                  
            )} 
            </div>
            
            
            


            </TableCell>
            </TableRow>
            
          )
          )
          }
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

export default SearchTable;