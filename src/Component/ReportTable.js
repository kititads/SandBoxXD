import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Table.css';
import { useEffect,useState } from 'react';
import { BsTable } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { getFirestore,collection, query, where, getDocs,orderBy } from '@firebase/firestore';
import FirebaseApp from '../firebase';
import Cookies from 'universal-cookie';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Button2 from '@mui/material/Button';  
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        borderRadius: 0,
        margin: '30px 10px',
        
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
        borderRadius: 8,
        padding: '5px 10px',
        display: 'inline-block',
        textAlign: 'center',    
    }
    
    ,
    tableFooterCell: {
      fontWeight: 'bold',
      backgroundColor: '#212F3D',
      color: theme.palette.getContrastText(theme.palette.primary.dark),
      textAlign: 'center',
      fontSize: '1rem',
      }
    
      
    
    
  }));

const db = getFirestore();
        

function ReportTable() {
    const [DataList,setDataList] = useState([]);   
    const [TotalBorrow,setTotalBorrow] = useState([]);   
    const [TotalReturn,setTotalReturn] = useState([]);   
    const [TotalLate,setTotalLate] = useState([]);   
    const [StartDate, setStartDate] = useState(new Date(2021,0,1));
    const [EndDate, setEndDate] = useState(new Date());

    //???????????????????????????????????????
    useEffect(()=> {
      getData();

    },[]);
    const cookies = new Cookies();
    
   


    const getData = async() => { 
    const q = query(collection(db, "Borrow"));
    const querySnapshot = await getDocs(q);
    const itemsBorrow = [];
    const itemsReturned = [];
    const itemsLate = [];

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      itemsBorrow.push(doc.data())

     if(doc.data().Borrow_US)
     {
      itemsReturned.push(doc.data())
     if(doc.data().Borrow_Status === "????????????????????????????????????")
     {
      itemsLate.push(doc.data())
     }
     }
     
      
    });

    setTotalBorrow(itemsBorrow);
    setTotalReturn(itemsReturned);
    setTotalLate(itemsLate);

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
  

  const ResetDate = async() => { 
    const ResetA = new Date(2021,0,1);
    const ResetB = new Date()
    setStartDate(ResetA);
    setEndDate(ResetB);
    getData();
  }

  return (
   
      <><><div style={{ textAlign: "center" }}>
      {/* <Row>
        <Col sm={3}></Col>
        <Col sm={3}>
          <div>????????????????????????????????????????????????????????? </div>
          <DatePicker
            onChange={(date) => setStartDate(date)} selected={StartDate}
            dateFormat='dd/MM/yyyy' />

        </Col>
        <Col sm={3}>
          <div>?????????????????????????????????????????????????????? </div>
          <DatePicker
            onChange={(date) => setEndDate(date)} selected={EndDate}
            dateFormat='dd/MM/yyyy' />
        </Col>
        <Col sm={3}></Col>

      </Row>

    </div><div className="div-button">
        <Row>
          <Col sm={3}></Col>
          <Col sm={3}>
            <Button2 className="button-set" variant="contained" color="success" onClick={()=>getData()}> ???????????????</Button2>



          </Col>
          <Col sm={3}>
            <Button2  className="button-set" variant="contained" color="error" onClick={()=>ResetDate()}>??????????????????</Button2>


          </Col>
          <Col sm={3}></Col>
        </Row> */}
      </div></><TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>??????????????????</TableCell>
              <TableCell className={classes.tableHeaderCell}>???????????????</TableCell>
            </TableRow>
            </TableHead>
            <TableBody> 
            {/*  */}

            <TableRow ><TableCell><Typography className={classes.name}>
              ????????????????????????????????????????????????????????????
            </Typography ></TableCell><TableCell><Typography className={classes.name}>
              {TotalBorrow.length}
            </Typography></TableCell></TableRow>
            
            <TableRow ><TableCell><Typography className={classes.name}>
              ??????????????????????????????????????????????????????????????????
            </Typography ></TableCell><TableCell><Typography className={classes.name}>
              {TotalReturn.length}
            </Typography></TableCell></TableRow>
            <TableRow ><TableCell><Typography className={classes.name}>
              ?????????????????????????????????????????????????????????????????????
            </Typography ></TableCell><TableCell><Typography className={classes.name}>
              {TotalLate.length}
            </Typography></TableCell></TableRow>
            
            {/*  */}

          </TableBody>
          <TableHead>
            
          </TableHead>
        </Table>

        

      </TableContainer>
      
      </>

    
   )
}

export default ReportTable;