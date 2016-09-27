import React from 'react';
import { Navbar, Nav, NavItem, Input, Button, ButtonToolbar } from 'react-bootstrap'
import timeStamp from '../utils/timeStamp.js'

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
        if(!this.state.geoocation){
            this.setState({
                geolocation: true,
                geolat: 30.25,
                geolng: -97.31
            })
            this.setState({
                day: timeStamp.getDayOfWeek(),
                hour: timeStamp.getHour(),
                minutes: timeStamp.getMin(),
                month: timeStamp.getMonth(),
                date: timeStamp.getDayOfMonth()
            })
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

