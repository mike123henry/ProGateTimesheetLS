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
            employeename: "x",
            employeeloginid: ""
        }
    },

    handleLogin: function(){
        if (this.state.isLoggedIn){
            this.setState({ isLoggedIn: false})
        } else {
            this.setState({isLoggedIn: true})
        }
    },
    handleSignUp: function(){
        console.log("NavBar handleSignUp 1")
        this.setState({
            employeename: "Fred",
            employeeloginid: "Fred0003"
        });

    },
    handleLocation: function(){
        //set that = to this because the scope of this will change when geoStuff() is called
        var that = this;
        geoStuff()
            .then(function(position){
                that.setState({
                    geolocation: true,
                    geolat: position.latitude,
                    geolng: position.longitude
                })
            })
            .catch(function(err){
                //display err
            });

        // noPromiseGeoStuff(function(position, err){
        //     console.log("this is my position", position);
        //     if(err) {
        //         return "blah"
        //         console.log("i errored")
        //     }
        //     that.setState({
        //         geolocation: true,
        //         geolat: position.latitude,
        //         geolng: position.longitude
        //     })
        // });
        console.log("hts")
      this.handleTimeStamp()
    },
    handleTimeStamp: function(){
        console.log("TS")
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
        var signUpData = {
            employeename: nextState.employeename,
            employeeloginid: nextState.employeeloginid
        };
        //var signUpData = {employeename: "george", employeeloginid: "georg0004"}
        console.log("signUpData", signUpData)
        helpers.saveNewEmployee(signUpData);
    },
    render: function(){
        let loginFlag, signUpFlag,geoFlag,geoLatLng,locationFlag,time;



        if(this.state.isLoggedIn){
            loginFlag = ( <Button bsSize="small" bsStyle="danger" type="submit"  onClick={this.handleLogin} >Log Out</Button>)
            locationFlag =  ( <Button bsSize="small" bsStyle="success" type="submit"  onClick={this.handleLocation} >Location</Button>)
        } else{
            loginFlag = ( <Button bsSize="small" bsStyle="success" type="submit" onClick={this.handleLogin} >Log In</Button>)
            signUpFlag = ( <Button bsSize="small" bsStyle="info" type="submit" onClick={this.handleSignUp}>Sign Up</Button>)
        }
        if(this.state.geolocation){
            geoLatLng = (<p>latitude = {this.state.geolat} and longitude = {this.state.geolng} </p>)
            geoFlag = (<p></p>)
            time = (<p>TimeStamp = {this.state.day} {this.state.month} {this.state.date} at {this.state.hour} : {this.state.minutes}</p>)
        } else {
            geoFlag = (<p>GeoLocation Service not available</p>)
        }
        return (
            <div className="container">
                {/*add navbar*/}
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand >
                            <a href="#">Pro Gate</a>
                        </Navbar.Brand>
                        <ButtonToolbar style={floatRRight}>
                              {loginFlag}
                              {signUpFlag}
                              {locationFlag}
                        </ButtonToolbar>
                    </Navbar.Header>
                </Navbar>
                    {geoFlag}
                    {geoLatLng}
                    {time}
                  <Button type="submit">Submit</Button>
                {/*add page title*/}
            </div>
        )
    }
})

