import React, { useState } from 'react';
import classes from './ReAuth.module.css';
import withModel from '../Model/withModel';
import * as actionCreators from '../../store/actions';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';
import fb from '../../config/configfb';

const ReAuth = (props) => {

    const [deleteConfirmed, setDeleteConfirmed] = useState(false);
    const [formInputsState, setformInputsState] = useState({ email: '', password: '', newPassword: '' });
    const inputChangeHandler = (e, identifier) => (
        setformInputsState({
            ...formInputsState,
            [identifier]: e.target.value
        })
    )

    const continueHandler = () => {
        const isDeleteAction = props.reAuthAction === 'delete' ? true : false;
        const credentials = (props.providerId === 'google.com' || props.providerId === 'facebook') ?
            null
            : { email: formInputsState.email, password: formInputsState.password, newPassword: formInputsState.newPassword };


        props.reAuth(user, isDeleteAction, credentials);
    }

    const buttonsStyles = {
        borderRadius: '2.5rem', border: '1px solid #ff0061',
        backgroundColor: '#fff', color: '#ff0061'
    };
    const user = fb.auth().currentUser;

    const signInWithPassword = (props.providerId !== 'google.com' && props.providerId !== 'facebook.com');

    const formContent = signInWithPassword ? (
        <>
            <input onChange={(e) => inputChangeHandler(e, 'email')} className={classes['reauth-form__input']} placeholder="Email" />
            <input onChange={(e) => inputChangeHandler(e, 'password')} className={classes['reauth-form__input']} placeholder="Password" />
            {props.reAuthAction === 'change' && <input onChange={(e) => inputChangeHandler(e, 'newPassword')} className={classes['reauth-form__input']} placeholder="New Password" />}
        </>
    ) : null;

    let content = (
        <form className={classes['reauth-form']}>
            <p className={classes['reauth-form__title']}>you need to login again in order to proceed with this action</p>
            {formContent}
            <Button
                styles={{ ...buttonsStyles, marginTop: '2rem' }}
                hoverable
                onClick={continueHandler}
            >
                Continue
            </Button>
        </form>
    );
    if (props.reAuthAction === 'delete' && !deleteConfirmed) {
        content = (
            <section className={classes['confirmation']} >
                <p className={classes['confirmation__title']}> are you sure you wanna delete your account</p>
                <div className={classes['confirmation__buttons-container']}>
                    <Button
                        hoverable
                        styles={{ ...buttonsStyles, width: '10rem', textAlign: 'center' }}
                        onClick={() => setDeleteConfirmed(true)}
                    >
                        Yes
                    </Button>
                    <Button
                        hoverable
                        styles={{ ...buttonsStyles, width: '10rem', textAlign: 'center' }}
                        onClick={props.closeModel}
                    >
                        Cancel
                    </Button>
                </div>
            </section>

        );

    }
    return (
        content
    );
}

const mapStateToProps = ({ reAuth, user }) => (
    {
        reAuthAction: reAuth,
        providerId: user && user.providerId
    }
)

const mapDispatchToProps = dispatch => (
    {
        reAuth: (user, isDeleteAction, credentials) => dispatch(actionCreators.reAuth(user, isDeleteAction, credentials))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(withModel(ReAuth));