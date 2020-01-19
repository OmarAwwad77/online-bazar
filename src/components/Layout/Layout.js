import React from 'react';
import classes from './Layout.module.css';
import Toolbar from './Toolbar/Toolbar';
import Footer from './Footer/Footer';
import fb from '../../config/configfb'
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions'


const Layout = (props) => {
    const auth = false;
    fb.auth().onAuthStateChanged(({ providerData }) => props.setCurrentUser(providerData[0]));
    return (
        <div className={classes.grid}>
            <Toolbar auth={auth} />
            {props.children}
            <Footer styleClass={classes.grid_footer} />
        </div>

    );
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: (user) => dispatch(actionCreators.setCurrentUser(user))
    }
}



export default connect(null, mapDispatchToProps)(Layout);