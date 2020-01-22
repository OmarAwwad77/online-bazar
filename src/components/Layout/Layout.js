import React from 'react';
import classes from './Layout.module.css';
import Toolbar from './Toolbar/Toolbar';
import Footer from './Footer/Footer';
import fb from '../../config/configfb'
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions'


const Layout = (props) => {

    const isAuth = localStorage.getItem('uid') || props.auth;
    !(isAuth) && fb.auth().onAuthStateChanged((ur) => {
        const user = ur && { uid: ur.uid, email: ur.email, providerId: ur.providerData[0].providerId };
        props.setCurrentUser(user);
        console.log('have an auth listener');
    });

    console.log('layout');

    (!props.auth && localStorage.getItem('uid')) && props.setCurrentUser('localStorage');

    return (
        <div className={classes.grid}>
            <Toolbar auth={isAuth} actions={{ 'Sing Out': null, 'Change Password': props.changePasswordRequest, 'Delete Account': props.deleteAccountRequest }} providerId={props.providerId} />
            {props.children}
            <Footer styleClass={classes.grid_footer} />
        </div>

    );
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: (user) => dispatch(actionCreators.setCurrentUser(user)),
        deleteAccountRequest: () => dispatch(actionCreators.deleteAccountRequest()),
        changePasswordRequest: () => dispatch(actionCreators.changePasswordRequest())

    }
}

const mapStateToProps = ({ user }) => {
    return {
        auth: user ? true : false,
        providerId: user ? user.providerId : null
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);