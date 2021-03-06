import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

    renderContents(){

        // 3 parts to manage buttons ui in the header.

        // login process: 
        
        // Without login info in payload of reducer
        // -> null
        
        // With googleID info
        // -> error -> payload.data = undefined -> return false
        switch(this.props.auth) {

            case null:

                return;

            case false:

                return <li><a href = '/auth/google'>Login Again with Google Auth</a></li>;

            default:

                // Setup logout url 
                // comma at the first, no semicolon at the second
                //***************************************** important
                // use an array to deploy two elements in return without <div>
                // no map!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! map is always with the defined variable.
                
                // Whenever click "Add Creidts", it executes this.props.handleToken().
                // It updates "credtis" by using express();
                // Then, whenever, click $5.00 in stripe form, it rerender "App" which call fetchUser()
                //      and then the credits automatically are updated. (Ajax!!!) 
                return [ 

                    <li key = '1'><Payments /></li>,
                    <li key = '3' style = {{ margin : '0 10px' }}>

                        { console.log('auth: ', this.props.auth) }
                        Credits: { this.props.auth.credits }
                    
                    </li>,
                    <li key = '2'><a href = '/api/logout'>Logout</a></li> 

                ];

        }

    }

    render() {

        return (
            
            /*

             - apply for materialize-css we installed in "index.js"
             - it is same format of "Components" -> "Navbar" in http://materializecss.com/navbar.html 
             - It is really imortant to me for my app!!!!!

            */

            <nav>
            
                <div className = 'nav-wrapper'>
                    
                    {/*<a href = "#" className = 'left brand-logo'> 
                        Instead of anchor tag, Link can set up the route depending on the environment.
                    */}
                    <Link to = {this.props.auth ? '/surveys' : '/'} 
                          className = 'left brand-logo'

                    >
                        Customer Survey
                    
                    </Link>
                    {/* </a> */}

                    <ul className = 'right'>

                        { this.renderContents() }
                       
                    </ul>
            
                </div>
            
            </nav>

        );
    }
}

function mapStateToProps({ auth }) {

    console.log(auth);

    return { auth };
}

export default connect(mapStateToProps)(Header);