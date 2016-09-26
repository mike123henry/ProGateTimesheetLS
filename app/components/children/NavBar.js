import React from 'react';
import { Navbar, Nav, NavItem, Input, Button, ButtonToolbar } from 'react-bootstrap'

export default React.createClass({
    getInitialState: function(){
        return { isLoggedIn: false}
    },

    handleLogin: function(){
        if (this.state.isLoggedIn){
            this.setState({ isLoggedIn: false})
        } else {
            this.setState({isLoggedIn: true})
        }
    },

    render(){
        let loginFlag, signInFlag;
        let floatRRight = {
            float: 'right',
            margin: 10
            }


        if(this.state.isLoggedIn){
            loginFlag = ( <Button bsSize="small" bsStyle="danger" type="submit"  onClick={this.handleLogin} >Log Out</Button>)
        } else{
            loginFlag = ( <Button bsSize="small" bsStyle="success" type="submit" onClick={this.handleLogin} >Log In</Button>)
            signInFlag = ( <Button bsSize="small" bsStyle="info" type="submit" >Sign Up</Button>)
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
                        </ButtonToolbar>
                    </Navbar.Header>
                </Navbar>
                  <Button type="submit">Submit</Button>
                {/*add page title*/}
            </div>
        )
    }
})

