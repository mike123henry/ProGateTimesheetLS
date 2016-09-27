import React from 'react';
import { Navbar, Nav, NavItem, Input, Button, ButtonToolbar } from 'react-bootstrap'

export default React.createClass({
    getInitialState: function(){
        return {
            isLoggedIn: false,
            geolocation: false,
            geolat: 0,
            geolng: 0
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
        }
    },


    render(){
        let loginFlag, signInFlag,geoFlag,geoLatLng,locationFlag;
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
                  <Button type="submit">Submit</Button>
                {/*add page title*/}
            </div>
        )
    }
})

