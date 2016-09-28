import React from 'react';
import { Navbar, Nav, NavItem, Input, Button, ButtonToolbar } from 'react-bootstrap'
import timeStamp from '../utils/timeStamp.js'
var geoStuff = require("./../../geostuff.js");
var noPromiseGeoStuff = require("./../../aaageostuff.js")

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
            date: 0
        }
    },

    handleLogin: function(){
        if (this.state.isLoggedIn){
            this.setState({ isLoggedIn: false})
        } else {
            this.setState({isLoggedIn: true})
        }
    },
    handleSignIn: function(){

    },
    handleLocation: function(){
        var that = this;
        geoStuff().then(function(position){
            console.log("this is my position", position);
            that.setState({
                geolocation: true,
                geolat: position.latitude,
                geolng: position.longitude
            })
        }).catch(function(err){
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
      this.handleTimeStamp()
    },
    handleTimeStamp: function(){
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

    render(){
        let loginFlag, signInFlag,geoFlag,geoLatLng,locationFlag,time;
        let floatRRight = {
            float: 'right',
            margin: 10
            }


        if(this.state.isLoggedIn){
            loginFlag = ( <Button bsSize="small" bsStyle="danger" type="submit"  onClick={this.handleLogin} >Log Out</Button>)
            locationFlag =  ( <Button bsSize="small" bsStyle="success" type="submit"  onClick={this.handleLocation} >Location</Button>)
        } else{
            loginFlag = ( <Button bsSize="small" bsStyle="success" type="submit" onClick={this.handleLogin} >Log In</Button>)
            signInFlag = ( <Button bsSize="small" bsStyle="info" type="submit" onClick={this.handleSignIn}>Sign Up</Button>)
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
                              {signInFlag}
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

