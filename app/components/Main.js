import React from 'react';

export default React.createClass({
    render(){
        return (
            <div className="main-container">
            <div className="container">
                {/*add navbar*/}
                <nav className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            {/*add the mobile responsive collapsable nav bar 'hamburger' */}
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                                {/*sr-only is screen rider only*/}
                                <span className="sr-only">Toggler Navigaton</span>
                                {/*each icon-bar is a layer in the "hamgerger*/}
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            {/*add the company brand (when we get the logo put it here)*/}
                            <a className="nav-brand" href="#">PGS TimeSheet</a>
                        </div>
                        {/*put the navbar stuff here -in desk mode they are the buttons -in mobile it the stuff in the hamberger */}
                        <div className="collapse navbar-collapse navbar-ex1-collapse">
                            <ul className="nav navbar-nar navbar-right">
                                <li><a href="/api/getEmpColl">/api/getEmpColl</a></li>
                                <li><a href="/api/getEmpColl">/api/getEmpColl</a></li>
                                <li><a href="/api/getEmpColl">/api/getEmpColl</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/*add page title*/}
            </div>
            </div>
        )
    }
})

// let Main = React.createClass({

//     render: function(){
//         return(
//             <div className="main-container">
//                 <h1>This is Main.js</h1>
//             </div>
//         )
//     }
// });

// module.exports = Main;