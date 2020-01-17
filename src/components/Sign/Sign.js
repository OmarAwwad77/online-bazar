import React, { useState } from 'react';
import classes from './Sign.module.css';
import Button from '../../UI/Button/Button';
import withModel from '../Model/withModel';
import { ReactComponent as Google } from '../../assets/google.svg';
import { ReactComponent as Facebook } from '../../assets/facebook.svg'



const Sign = () => {

    const [signInState, setSingInState] = useState(true);
    const signInStateHandler = (e) => {
        setSingInState((prevState) => (!prevState));
    }

    return (
        <form className={classes.form}>
            <div className={classes.sign_with_button}>
                <Google />
                <span>Sign in with Google</span>
            </div>
            <div className={classes.sign_with_button}>
                <Facebook />
                <span>Sign in with Facebook</span>
            </div>
            <input placeholder="Email" className={classes.input} />
            <input placeholder="Password" className={classes.input} />
            {signInState ? null : <input placeholder="Contact Number" className={classes.input} />}
            <Button
                className={classes.button}
                styles={{ borderRadius: '2.5rem', backgroundColor: '#ff0061', color: '#fff' }}
                hoverable
            > {signInState ? "Sign In" : "Sign Up"}

            </Button>
            <Button
                onClick={(e) => signInStateHandler(e)}
                className={classes.button}
                styles={{ borderRadius: '2.5rem', backgroundColor: '#ff0061', color: '#fff' }}
                hoverable> {signInState ? 'Switch To Sign Up' : 'Switch To Sign In'}
            </Button>
        </form>
    );
}

export default withModel(Sign);