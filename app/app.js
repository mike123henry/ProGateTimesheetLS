// improt dependencies
import  React from 'react';
import { render } from'react-dom';
import  {Router, browserHistory } from 'react-router';

//import files
import routes from './config/routes.js'

//render application to the broswer
//use browserHistory to clear the 'strange characters' in the address bar of the broswer
render((
    <Router history={browserHistory}>
        {routes}
    </Router>),
    document.getElementById('app')
);