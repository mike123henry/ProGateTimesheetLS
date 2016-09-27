import React from 'react';
import { Navbar, Nav, NavItem, Input, Button, ButtonToolbar } from 'react-bootstrap'

export default React.createClass({
    getInitialState: function(){
        return {
            isLoggedIn: false,
            geolocation: false,
            geolat: 0,
            geolng: 0,
            day: 0,
            month: 0,
            hour: 0,
            minute: 0
        }
    },

    handleLogin: function(){
        if (this.state.isLoggedIn){
            this.setState({ isLoggedIn: false})
        } else {
            this.setState({isLoggedIn: true})
        }
    },

    handleLocation: function(){
        // if (!navigator.geolocation){
        //     this.state({geolocation: false})
        // } else {
        //      navigator.geolocation.getCurrentPosition(function(position) {
        //         console.log("yes ")
        //         this.setState({
        //             geolocation: true,
        //             geolat: position.coords.latitude,
        //             geolng: position.coords.longitude
        //         })
        //     })
        // }
        if(!this.state.geoocation){
            this.setState({
                geolocation: true,
                geolat: 30.25,
                geolng: -97.31
            })
            var datetime = new Date();
            var theday = datetime.getDay()
            switch (theday){
                case 1:
                    this.setState({day: "Mon"})
                    break
                case 2:
                    this.setState({day: "Tues"})
                    break
            }

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
            signInFlag = ( <Button bsSize="small" bsStyle="info" type="submit" >Sign Up</Button>)
        }
        if(this.state.geolocation){
            geoLatLng = (<p>latitude = {this.state.geolat} and longitude = {this.state.geolng} </p>)
            geoFlag = (<p></p>)
            time = (<p>day = {this.state.day}</p>)
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

