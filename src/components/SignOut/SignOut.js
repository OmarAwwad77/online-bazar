import React from 'react';
import withModel from '../Model/withModel';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import * as actionCreators from '../../store/actions';

const SignOut = (props) => {
    props.signOut()
    return (
        <Redirect to="/" />
    );
}

const mapDispatchToProps = dispatch => (
    {
        signOut: () => dispatch(actionCreators.signOut())
    }
)

export default connect(null, mapDispatchToProps)(withModel(SignOut));