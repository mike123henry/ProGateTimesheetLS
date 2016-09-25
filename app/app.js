import  React from 'react';
import { render } from'react-dom';
import  {Router, browserHistory } from 'react-router';
//import  {Router, Route, browserHistory, IndexRoute } from 'react-router';

//import Main from './components/Main.js'
//const routes = require('./config/routes.js')

import routes from './config/routes.js'

// render((
//     <Router history={browserHistory}>
//         <Route path="/" component={Main}/>
//     </Router>),
//     document.getElementById('app')
// );


render((
    <Router history={browserHistory}>
        {routes}
    </Router>),
    document.getElementById('app')
);