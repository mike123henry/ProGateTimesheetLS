import  React from 'react';
import  {Router, Route, IndexRoute } from 'react-router';

import Main from '../components/Main.js'



module.exports = (
    <Route path='/' component={Main}>
        {/*add */}
        {/*if not logged in */}
            {/*show login path*/}
            {/* show sign up path*/}
        {/*if logged in */}
            {/* show logout route*/}
            {/* show current schedule path*/}
            {/* show my next shift route*/}
            {/* show this pay period summary of hours worked*/}
            {/* show next pay period schedule*/}
            {/*if not on shift */}
                {/*show start shift route*/}
            {/*if on shift */}
                {/*show end shift route*/}
    </Route>
    )
