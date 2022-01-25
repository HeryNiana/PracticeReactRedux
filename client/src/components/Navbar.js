import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../image/logo.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }
	render(){
    const {isAuthenticated, user} = this.props.auth;
     const authLinks = (
            <ul className="navbar-nav ml-auto">
                 <a>
               	     <Link className="navbar-brand"  to={'/index'} className="nav-link">Produits </Link>
               	 </a>
                 <a>
                      <Link className="navbar-brand"  to={'/data'} className="nav-link">data </Link>
                 </a>
                <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px'}} />
                            Logout
                </a>
                <li className="nav-item dropdown open">
                <a href="javascript:;" className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown"aria-expanded="false">
                <i className="fa fa-user"></i>
                </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li className="dropdown-item"  href="javascript:;"><a href="#"> Profile</a></li>
                      <li className="dropdown-item"  href="javascript:;"><a href="#">Settings</a></li>
                      <li className="dropdown-item"  href="login.html"> <a href="#"><i className="fa fa-sign-out pull-right"></i> Log Out</a></li>
                    </ul>
                  </li>
            </ul>
        )
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/login">About us</Link>
            </li>
        </ul>
        )
		return(
     		 <nav className="navbar navbar-expand-lg navbar-right bg-light menu navbar-fixed-top navbar-header" >
     		 <img src={image} alt={image} className="rounded-circle" style={{ width: '150px'}} />
      		   <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
               	  {isAuthenticated ? authLinks : guestLinks}
           	   </ul>
        </div>
        </nav>
	   )
 }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
