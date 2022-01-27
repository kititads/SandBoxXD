import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Navber from './Component/Navbar';
import Footer from './Component/Footer';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from './Pages/Home';
import Search from './Pages/Search';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Login from './Pages/Login';
import Welcome from './Pages/Welcome';
import NotFound from './Pages/NotFound';
import InsertEM from './Pages/InsertEM';
import EditEM from './Pages/EditEM';
import Pending from './Pages/Pending ';
import ShowReport from './Pages/ShowReport';
import ShowDetail from './Pages/ShowDetail';
import ShowBorrow from './Pages/ShowBorrow';
import AdminTools from './Pages/AdminTools';
import ShowHistory from './Pages/ShowHistory';
import ShowUser from './Pages/ShowUser';
import ShowHistoryEM from './Pages/ShowHistoryEM';
import Rules from './Pages/Rules';
import InsertUser from './Pages/InsertUser';
import ShowBorrowEM from './Pages/ShowBorrowEM';

function App() {


  return (


    <Router>
    <div className="App">
    <Navber/>
      <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/search" component={Search}/>
        <Route exact path="/about" component={AboutUs}/>
        <Route exact path="/contact" component={ContactUs}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/insert" component={InsertEM}/>
        <Route exact path="/edit/:id" component={EditEM}/>
        <Route exact path="/pending" component={Pending}/>
        <Route exact path="/report" component={ShowReport}/>
        <Route exact path="/admintools" component={AdminTools}/>
        <Route exact path="/borrow" component={ShowBorrow}/>
        <Route exact path="/detail/:id" component={ShowDetail}/>
        <Route exact path="/history" component={ShowHistory}/>
        <Route exact path="/alluser" component={ShowUser}/>
        <Route exact path="/historyEM/:id" component={ShowHistoryEM}/>
        <Route exact path="/rules" component={Rules}/>
        <Route exact path="/insertuser" component={InsertUser}/>
        <Route exact path="/borrowem" component={ShowBorrowEM}/>

        <Route component={NotFound} />
      </Switch>
      <Footer/>

    </div>


    
   </Router>
  );
}

export default App;
