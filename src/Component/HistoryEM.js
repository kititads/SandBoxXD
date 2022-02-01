import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Table.css';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { getFirestore,collection, query, where, getDocs,doc,deleteDoc,updateDoc,orderBy  } from '@firebase/firestore';
import FirebaseApp from '../firebase';
import moment from 'moment';
import { useEffect,useState } from 'react';
import Cookies from 'universal-cookie';
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
        borderRadius: 8,
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

        

function HistoryEM(PropID) {
    const [DataList,setDataList] = useState([]);   
    const db = getFirestore();
    const [UserState,setUserState] = useState("");
    const [AdminState,setAdminState] = useState("");



    //ทำงานตอนเริ่ม
    useEffect(()=> {
    const cookies = new Cookies();
    if(cookies.get('Status_User') === "Admin")
    {
    getData();
    setUserState("true");
    setAdminState("");

    }
    else
    {
    window.location.href = "/NotFound"

    }



    },[]);
    
    const getData = async() => { 
    const cookies = new Cookies();
    const q = query(collection(db, "History"),orderBy("History_ID", "asc"));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => { 
 
        if(doc.data().EM_ID == PropID.ID)
        {
        items.push(doc.data());     
        }
      

      
    });
       setDataList(items);  
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
            <TableCell className={classes.tableHeaderCell} >รหัส</TableCell>
            <TableCell className={classes.tableHeaderCell} >ชื่อ</TableCell>
            <TableCell className={classes.tableHeaderCell} style={{minWidth:200}} >วันที่เริ่ม-สิ้นสุดการยืม</TableCell>
            <TableCell className={classes.tableHeaderCell} style={{minWidth:130}}>วันที่นำมาคืน</TableCell>
            <TableCell className={classes.tableHeaderCell} style={{minWidth:140}}>ประเภทการคืน</TableCell>

            <TableCell className={classes.tableHeaderCell} style={{minWidth:160}} >จำนวน</TableCell>        
            <TableCell className={classes.tableHeaderCell} >ชื่อผู้ยืม</TableCell>

            </TableRow>
            </TableHead>
            <TableBody>
            {DataList
              .filter((DL) =>{
              
              if(Search === "")
              {
                  return DL;     
              }
              else if(DL.History_ID.toString().toLowerCase().includes(Search.toLowerCase()))
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
              else if(ConvertTime(DL.Returned_Date).toString().toLowerCase().includes(Search.toLowerCase()))
              {
                  return DL;
              }  
              

              })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((DL) => (
            <TableRow key={DL.Pending_ID}>
            <TableCell >
            <Grid>
            <Typography className={classes.name}>{DL.History_ID}</Typography>
            </Grid>
            </TableCell>

            <TableCell >
            <Typography className={classes.name}>{DL.EM_Name}</Typography>
            </TableCell>
            <TableCell > 
            <Typography className={classes.name}>{ConvertTime(DL.Loan_Date)}</Typography>
            -
            <Typography className={classes.name}>{ConvertTime(DL.Due_Date)}</Typography>

            </TableCell>
            <TableCell >
            <Typography className={classes.name}>{ConvertTime(DL.Returned_Date)}</Typography>
            </TableCell>
            <TableCell >
            <Typography className={classes.name}>{DL.ReturnType}</Typography>
            </TableCell>
            <TableCell>
            <Typography className={classes.name}>จำนวนที่ขอยืม : {DL.Borrow_Quantity}</Typography>
            <Typography className={classes.name}>จำนวนที่มาคืน : {DL.Borrow_Quantity-DL.EquipmentBroken}</Typography>

            <Typography className={classes.name}>จำนวนที่ชำรุด : {DL.EquipmentBroken}</Typography>

            </TableCell>
            <TableCell>
            <Typography className={classes.name}>{DL.User_Name}</Typography>


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

export default HistoryEM;