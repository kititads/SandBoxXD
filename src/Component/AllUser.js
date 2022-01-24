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
        

function AllUser() {
    const [DataList,setDataList] = useState([]);   
    //ทำงานตอนเริ่ม
    useEffect(()=> {
      getData();

    },[]);
    const cookies = new Cookies();
    
    const getData = async() => { 
    const q = query(collection(db, "User"),orderBy("User_ID", "asc"));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      if(cookies.get('Status_User') === "Admin")
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
    
    <div>
    </div>
    </div>
    </div>

    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCellCanHide} >User ID</TableCell>
            <TableCell className={classes.tableHeaderCell} >Student ID</TableCell>
            <TableCell className={classes.tableHeaderCell} >Name</TableCell>
            <TableCell className={classes.tableHeaderCellCanHide} >Status User</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              {DataList
              .filter((DL) =>{
              if(Search === "")
              {
                  return DL;     
              }
              else if(DL.User_ID.toString().toLowerCase().includes(Search.toLowerCase()))
              {
                  return DL;
              }
              else if(DL.Student_ID.toString().toLowerCase().includes(Search.toLowerCase()))
              {
                  return DL;
              }
              else if(DL.User_Name.toLowerCase().includes(Search.toLowerCase()))
              {
                  return DL;
              }
              
              })
            
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((DL) => (            

            <TableRow key={DL.EM_ID}>
            <TableCell>
            <Grid>
            <Typography className={classes.name}>{DL.User_ID}</Typography>
            </Grid>
            </TableCell>
            <TableCell>
            <Grid>
            <Typography className={classes.name}>{DL.Student_ID}</Typography>
            </Grid>
            </TableCell>
            <TableCell>
            <Grid>
            <Typography className={classes.name}>{DL.User_Name}</Typography>
            </Grid>
            </TableCell>
            <TableCell>
            <Grid>
            <Typography className={classes.name}>{DL.Status_User}</Typography>
            </Grid>
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

export default AllUser;