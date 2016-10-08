import React from 'react';
import { Navbar, Nav, NavItem, Input, Button, ButtonToolbar } from 'react-bootstrap'

import timeStamp from '../utils/timeStamp.js'
import geoStuff from "../utils/geoStuff.js";
import helpers from "../utils/helpers.js";



let floatRRight = {
    float: 'right',
    margin: 10
    }
export default React.createClass({
    getInitialState: function(){
        return {
            isLoggedIn: false,
            geolocation: false,
            geolat: 0,
            geolng: 0,
            day: 0,
            hour: 0,
            minutes: 0,
            month: 0,
            date: 0,
            employeename: "",
            employeescreenname: "",
            employeeloginid: "",
            employeephone: "",
            isOnShift: "",
            firstName: "",
            lastName: "",
            loginFormOpen: false,
            signUpFormOpen: false,
            phone: "",
            screenName: "",
            loginId: "",
            newSignUp: false,
            newLogin: false,
            isInitialShiftDate: true //this is set to true because it is used in component will update and the change to only happens after the function runs
        }
    },
    handleLoginFormOpen: function(){
        this.setState({loginFormOpen: true})
    },
    handleSignUpFormOpen: function(){
        this.setState({signUpFormOpen: true})
    },
    handleLogin: function(){
        if (this.state.isLoggedIn){
            this.setState({ isLoggedIn: false})
        } else {
            this.setState({isLoggedIn: true})
        }

    },
    handleFirstName: function(e){
        //console.log("NavBar handleSignUp 1")
        this.setState( {firstName: e.target.value.trim().toUpperCase()} );
        console.log('this.state.firstName = ',this.state.firstName)
    },
    handleLastName: function(e){
        //console.log("NavBar handleSignUp 1")
        this.setState( {lastName: e.target.value.trim().toUpperCase()} );
        console.log('in handleLastName this.state.lastName = ',this.state.lastName)
    },
    handleScreenName: function(e){
        //console.log("NavBar handleSignUp 1")
        this.setState( {screenName: e.target.value.trim().toUpperCase()} );
        console.log('in handleScreenName this.state.screenName = ',this.state.screenName)
    },
    handlePhone: function(e){
        //console.log("NavBar handleSignUp 1")
        this.setState( {phone: e.target.value.trim()} );
        console.log('in handlePhone this.state.phone = ',this.state.phone)
    },
    handleLoginId: function(e){
        //console.log("NavBar handleSignUp 1")
        this.setState( {loginId: e.target.value.trim().toUpperCase()} );
        console.log('in handleLoginId this.state.loginId = ',this.state.loginId)
    },
    submitSignUpValue: function(){
        this.setState({
            employeename: this.state.firstName +" "+ this.state.lastName,
            employeeloginid: this.state.loginId,
            screenname: this.state.screenName,
            employeephone: this.state.phone,
            signUpFormOpen: false,
            newSignUp: true
        })
    },
    submitLoginValue: function(){
        this.setState({
            employeeloginid: this.state.loginId,
            loginFormOpen: false,
            newLogin: true
        });
    },
    handleShift: function(){
        //set that = to this because the scope of this will change when geoStuff() is called
        var that = this;
        geoStuff()
            .then(function(position){
                that.setState({
                    geolocation: true,
                    geolat: position.latitude,
                    geolng: position.longitude
                })
                console.log('b4 isOnShift',that.state.isOnShift);
                that.setState({isOnShift: !(that.state.isOnShift)})
                console.log('after isOnShift',that.state.isOnShift);
            })
            .catch(function(err){
                //display err
                console.log('geoStuff errored in NavBar.js', err)
            });
    },
    handleTimeStamp: function(){
        //console.log("TS")
        this.setState({
                day: timeStamp.getDayOfWeek(),
                hour: timeStamp.getHour(),
                month: timeStamp.getMonth(),
                date: timeStamp.getDayOfMonth()
            })
            var temp
            if ((temp = timeStamp.getMin()) < 10){
                temp    = "0"+ temp
                this.setState({ minutes: temp})
            } else {
                this.setState({ minutes: temp})
            }
    },
    componentWillUpdate: function(nextProps, nextState){
        if ( this.state.newSignUp !== nextState.newSignUp && nextState.newSignUp === true) {
            var signUpData = {
                employeename: nextState.employeename,
                employeeloginid: nextState.employeeloginid,
                employeescreenname: nextState.screenName,
                employeephone: nextState.employeephone
            };
            helpers.saveNewEmployee(signUpData);
            this.setState({newSignUp: false})
        };
         if ( this.state.newLogin !== nextState.newLogin && nextState.newLogin === true) {
            var loginData =  { employeeloginid: nextState.employeeloginid};
            var that = this;
            console.log('componentWillUpdate loginData = ',loginData)
            helpers.getInitialShift(loginData)
                .then(function(isOnShiftRtn){
                    console.log('componentWillUpdate isOnShiftRtn.isOnShift = ', isOnShiftRtn.isOnShift);
                    that.setState({
                    isOnShift: isOnShiftRtn.isOnShift,
                    isInitialShiftDate: true
                });
            });
            this.setState({newLogin: false});
            this.handleLogin();
            helpers.getLogin(this.state.employeeloginid)
        };
        if (this.state.isOnShift !== nextState.isOnShift ) {
            console.log('this.state.isOnShift = ',this.state.isOnShift);
            console.log('nextState.isOnShift = ', nextState.isOnShift);
            var shiftData = {
                employeename: nextState.employeename,
                employeeloginid: nextState.employeeloginid,

                isOnShift: nextState.isOnShift,
                geolat: nextState.geolat,
                geolng: nextState.geolng
            };
            if (nextState.isInitialShiftDate) {
                console.log('initialShiftData true this.state.isOnShift = ',this.state.isOnShift);
                console.log('initialShiftData nextState.isInitialShiftDate = ',nextState.isInitialShiftDate);
                console.log('initialShiftData this.state.isInitialShiftDate = ',this.state.isInitialShiftDate);
                this.setState({isInitialShiftDate: false});

            } else{
                console.log('initialShiftData false this.state.isOnShift = ',this.state.isOnShift);
                console.log('nextState.isInitialShiftDate = ',nextState.isInitialShiftDate);
                console.log('this.state.isInitialShiftDate = ',this.state.isInitialShiftDate);
                helpers.saveNewShift(shiftData);
                helpers.sendText({message:"build a better message here"});
            };

        };
    },
    render: function(){
        let loginFlag, signUpFlag,geoFlag,geoLatLng,shiftFlag,time,signUpForm,loginForm;

        if(this.state.signUpFormOpen){
            signUpForm = (
                <div>
                    <h3> First Name </h3>
                    <input value={this.state.firstName}  onChange={this.handleFirstName} />
                    <br />
                    <h3> Last Name </h3>
                    <input value={this.state.lastName} onChange={this.handleLastName} />
                    <br />
                    <h3> Screen Name </h3>
                    <input value={this.state.screenName} onChange={this.handleScreenName} />
                    <br />
                    <h3> Enter Phone Number (numbers only no spaces or extra characters)</h3>
                    <input value={this.state.phone} onChange={this.handlePhone} />
                    <br />
                    <h3> Enter login Id</h3>
                    <input value={this.state.loginId} onChange={this.handleLoginId} />
                    <br />
                    <button onClick={this.submitSignUpValue}>Submit Sign Up</button>
                </div>
            );
        };
        if(this.state.loginFormOpen){
            loginForm = (
                <div>
                    <h3> Enter login Id</h3>
                    <input value={this.state.loginId} onChange={this.handleLoginId} />
                    <br />
                    <button onClick={this.submitLoginValue}>Submit Login</button>
                </div>
            );
        };
        if(this.state.isLoggedIn ){
            loginFlag = ( <Button bsSize="small" bsStyle="danger" type="submit"  onClick={this.handleLogin} >Log Out</Button>)
            if(this.state.isOnShift){
                shiftFlag =  ( <Button bsSize="small" bsStyle="danger" type="submit"  onClick={this.handleShift} >End Shift</Button>)
            } else {
                shiftFlag =  ( <Button bsSize="small" bsStyle="success" type="submit"  onClick={this.handleShift} >Start Shift</Button>)
            };
        } else if(!this.state.signUpFormOpen && !this.state.loginFormOpen){
            loginFlag = ( <Button bsSize="small" bsStyle="success" type="submit" onClick={this.handleLoginFormOpen} >Log In xxx</Button>)
            signUpFlag = ( <Button bsSize="small" bsStyle="info" type="submit" onClick={this.handleSignUpFormOpen}>Sign Up</Button>)
        };
        if(this.state.geolocation){
            geoLatLng = (<p>latitude = {this.state.geolat} and longitude = {this.state.geolng} </p>)
            geoFlag = (<p></p>)
            time = (<p>TimeStamp = {this.state.day} {this.state.month} {this.state.date} at {this.state.hour} : {this.state.minutes}</p>)
        };
        return (
            <div className="container">
                {/*add navbar*/}
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand >
                            Pro Gate
                        </Navbar.Brand>
                        <ButtonToolbar style={floatRRight}>
                              {loginFlag}

                        </ButtonToolbar>
                    </Navbar.Header>
                </Navbar>

                {signUpForm}
                {loginForm}
                    {geoFlag}
                    {geoLatLng}
                    {time}
                  {shiftFlag}
                  {signUpFlag}
                {/*add page title*/}
            </div>
        )
    }
})

