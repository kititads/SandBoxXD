import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Table.css';
import { useEffect,useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { getFirestore,collection, query, getDocs,orderBy,doc,updateDoc } from '@firebase/firestore';
import FirebaseApp from '../firebase';
import Cookies from 'universal-cookie';
import Button from '@mui/material/Button'; 
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
import { TableSortLabel } from '@mui/material';



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
    nameStudent: {
      fontWeight: 'bold',
      textAlign: 'left',
      paddingLeft:20

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
        

function UserBorrowHistory() {
    const [DataList,setDataList] = useState([]);   
    const [DataListHistory,setDataListHistory] = useState([]);   

    //ทำงานตอนเริ่ม
    useEffect(()=> {
      if(cookies.get('Status_User') !== "Admin")
      {
        window.location.href = "/NotFound"

      }
      getData();
      getData2();


    },[]);
    const cookies = new Cookies();
    const [DocPlus,setDocPlus] = useState([]);   

    const getData = async() => { 
    const q = query(collection(db, "User"),orderBy("Count_Borrow", "desc"));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      if(cookies.get('Status_User') === "Admin")
      {
      
        items.push(doc.data());    
      }   
    });
    
      console.log();
      setDataList(items);
    };

    const getData2 = async() => { 
        const q2 = query(collection(db, "History"));
        const querySnapshot2 = await getDocs(q2);
        const items2 = [];
        querySnapshot2.forEach((doc) => {
         
            items2.push(doc.data());    
             
        });
        setDataListHistory(items2);
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
         
          <TableCell className={classes.tableHeaderCell} >รหัสนักศึกษา</TableCell>

          <TableCell style={{minWidth:120}} className={classes.tableHeaderCell} >ชื่อนักศึกษา</TableCell>
            
            <TableCell className={classes.tableHeaderCell} >
            
            จำนวนครั้งที่มายืม
            </TableCell>
            
            
            <TableCell className={classes.tableHeaderCell} >จำนวนครั้งที่คืนช้า</TableCell>
            <TableCell style={{maxWidth:160}} className={classes.tableHeaderCell} >จำนวนครั้งที่คืนอุปกรณ์ชำรุด
</TableCell>


            </TableRow>
            </TableHead>
            <TableBody>
              {DataList
              .filter((DL) =>{
              if(Search === "")
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
            <Typography className={classes.nameStudent}>{DL.Student_ID}</Typography>

            </Grid>
            </TableCell>
            <TableCell>
            <Grid>
            <Typography style={{textAlign:"left"}} className={classes.nameStudent}>{DL.User_Name}</Typography>

            </Grid>
            </TableCell>
            <TableCell>
            <Grid>
            <Typography className={classes.name}>
             
            <a href={"/HistoryUser/"+DL.Student_ID+"/All"}>{DL.Count_Borrow}</a>
            
            </Typography>
            </Grid>
            </TableCell>
            <TableCell>
            <Grid>
            <Typography className={classes.name}>
            <a href={"/HistoryUser/"+DL.Student_ID+"/Late"} style={{color:"red"}}>  
            {DataListHistory.filter(Data=>{
                if(Data.Student_ID === DL.Student_ID && Data.Borrow_Status === "ยืมเกินกำหนด")
                {
                    return DL
                }
            }).length}</a>  

            
            </Typography>


            </Grid>
            </TableCell>
            <TableCell>
            <Grid>
            <Typography className={classes.name}>
            <a href={"/HistoryUser/"+DL.Student_ID+"/Broken"} style={{color:"#494949"}}>    
            {DataListHistory.filter(Data=>{
                if(Data.Student_ID === DL.Student_ID && Data.ReturnType === "อุปกรณ์ชำรุดหรือสูญหาย")
                {
                    return DL
                }
            }).length}
            </a>  
            
            </Typography>


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

export default UserBorrowHistory;