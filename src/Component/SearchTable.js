import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';  
import './Table.css';
import { useEffect,useState } from 'react';
import { BsTable } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { getFirestore,collection, query, where, getDocs,orderBy } from '@firebase/firestore';
import FirebaseApp from '../firebase';
import Cookies from 'universal-cookie';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
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
        color: theme.palette.secondary.dark,
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
    //ทำงานตอนเริ่ม
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
        items.push(doc.data());    
      }
      else if(doc.data().EM_Status ==="Available" )
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
    
    <div className="page-set Home-Set-Title-2">
    </div>
    </div>
    </div>

    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCellCanHide} >Equipment ID</TableCell>
            <TableCell className={classes.tableHeaderCell} >Image</TableCell>
            <TableCell className={classes.tableHeaderCell} >Name</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide} >Location</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide} >Status</TableCell>
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
              else if(DL.EM_ID.toString().toLowerCase().includes(Search.toLowerCase()))
              {
                  return DL;
              }
              else if(DL.EM_Name.toLowerCase().includes(Search.toLowerCase()))
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
            <Typography className={classes.name}>{DL.EM_Location}</Typography>
            </TableCell>
            <TableCell  className={classes.CheckHide}>
            <Typography
            className={classes.status}
            style={{
            backgroundColor: 
            ((DL.EM_Status === 'Available' && 'green') ||
            (DL.EM_Status === 'Unavailable' && 'red') ||
            (DL.EM_Status === 'Pending' && 'blue'))
            }}
            >{DL.EM_Status}</Typography>
            </TableCell>
            <TableCell>
            <div className="SerachTable_button">
            <a href={"/detail/"+DL.EM_ID}><Button variant="contained" startIcon={<ArticleOutlinedIcon />} color="info" style={{minWidth: '110px'}} size="small" value={DL.EM_ID} >Detail</Button></a>
            </div>
            <div className="SerachTable_button">
            {(cookies.get('Status_User') === "Admin" && 
            <a href={"/historyEM/"+DL.EM_ID}><Button variant="contained" startIcon={<HistoryEduIcon />} color="success" style={{minWidth: '110px'}}  size="small" value={DL.EM_ID} >History</Button></a>           
            )} 
            </div>
            {(cookies.get('Status_User') === "Admin" && 
            <a href={"/edit/"+DL.EM_ID}><Button variant="contained" startIcon={<EditOutlinedIcon />} color="warning" style={{minWidth: '110px'}}  size="small" value={DL.EM_ID} >Edit</Button></a>           
            )} 
            
            


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