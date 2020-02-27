import React, { useState, useEffect } from 'react';
import classes from './Sign.module.css';
import Button from '../../UI/Button/Button';
import { ReactComponent as Google } from '../../assets/google.svg';
import { ReactComponent as Facebook } from '../../assets/facebook.svg';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import Model from '../Model/Model';
import Spinner from '../../UI/Spinner/Spinner';

const checkValidity = (val, validationObj) => {
	let isValid = true;
	const errorsArr = [];

	if (validationObj.isRequired) {
		isValid = val.trim() !== '' && isValid;
		val.trim() === '' && errorsArr.push('Required Field');
	}
	if (validationObj.match) {
		isValid = val.trim() === validationObj.match && isValid;
		val.trim() !== validationObj.match &&
			errorsArr.push('Passwords Should Match');
	}
	if (validationObj.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test(val) && isValid;
		!pattern.test(val) && errorsArr.push('Invalid Email');
	}
	if (validationObj.isNumeric) {
		const pattern = /^\d+$/;
		isValid = pattern.test(val) && isValid;
		!pattern.test(val) && errorsArr.push('Not A Number');
	}
	if (validationObj.maxLen) {
		isValid = val.length <= validationObj.maxLen && isValid;
		!(val.length <= validationObj.maxLen) &&
			errorsArr.push('Maximum 12 Characters');
	}
	if (validationObj.minLen) {
		isValid = val.length >= validationObj.minLen && isValid;
		!(val.length >= validationObj.minLen) &&
			errorsArr.push('Minimum 6 Characters');
	}

	return { isValid, errors: errorsArr };
};

const Sign = props => {
	const [isSignInState, setSingInState] = useState(true);
	const signInStateHandler = () => {
		setSingInState(prevState => !prevState);
	};
	const [isFormValidState, setFromValidity] = useState(false);
	const [inputsState, setInputsState] = useState({
		email: {
			value: '',
			isValid: false,
			touched: false,
			validation: { isRequired: true, isEmail: true },
			errors: []
		},
		password: {
			value: '',
			isValid: false,
			touched: false,
			validation: { isRequired: true, minLen: 6, maxLen: 12 },
			errors: []
		},
		confirmPassword: {
			value: '',
			isValid: false,
			touched: false,
			validation: { isRequired: true, match: '' },
			errors: []
		}
	});

	const checkOverallFormValidity = stateObj => {
		let isFormValid = true;
		for (let element in stateObj) {
			if (element === 'confirmPassword' && isSignInState) {
				continue;
			}
			isFormValid = stateObj[element].isValid && isFormValid;
		}
		return isFormValid;
	};

	useEffect(() => setFromValidity(checkOverallFormValidity(inputsState)), [
		isSignInState
	]);

	const inputChangedHandler = (e, inputIdentifier) => {
		const newVal = e.target.value;
		const confirmPasswordObj = { ...inputsState['confirmPassword'] };
		if (inputIdentifier === 'password') {
			const validationObject = { ...confirmPasswordObj.validation };
			validationObject.match = newVal;
			confirmPasswordObj.validation = validationObject;
		}
		const inputUpdatedState = { ...inputsState[inputIdentifier] };
		const { isValid, errors } = checkValidity(
			newVal,
			inputUpdatedState['validation']
		);
		inputUpdatedState['value'] = newVal;
		inputUpdatedState['touched'] = true;
		inputUpdatedState['isValid'] = isValid;
		inputUpdatedState['errors'] = errors;
		const newInputsState = {
			...inputsState,
			confirmPassword: confirmPasswordObj,
			[inputIdentifier]: inputUpdatedState
		};
		setInputsState(newInputsState);
		setFromValidity(checkOverallFormValidity(newInputsState));
	};

	const formOnSubmitHandler = async (provider, email, password) => {
		if (provider) {
			props.authenticateUserWithProvider(provider);
		} else {
			props.authenticateUser(email, password, isSignInState);
		}
	};

	return (
		<Model modelClass={classes['model']} goBack={props.history.goBack}>
			{props.loading ? (
				<Spinner />
			) : props.error && !props.error.message ? (
				<>
					<div className={classes['error-title']}>Error</div>
					<p className={classes['error-message']}>Something Went Wrong.</p>
				</>
			) : (
				<form className={classes.form} onSubmit={formOnSubmitHandler}>
					<div
						onClick={() => formOnSubmitHandler('google')}
						className={classes.sign_with_button}
					>
						<Google />
						<span>Sign in with Google</span>
					</div>
					<div
						onClick={() => formOnSubmitHandler('facebook')}
						className={classes.sign_with_button}
					>
						<Facebook />
						<span>Sign in with Facebook</span>
					</div>
					<input
						style={
							!inputsState.email.isValid && inputsState.email.touched
								? { borderBottom: '1px solid red' }
								: null
						}
						onChange={e => inputChangedHandler(e, 'email')}
						value={inputsState.email.value}
						placeholder='Email'
						className={classes.input}
					/>
					<span className={classes.error_messages}>
						{inputsState.email.errors[0] === 'Required Field'
							? 'Required Field'
							: inputsState.email.errors.join(', ')}
					</span>

					<input
						style={
							!inputsState.password.isValid && inputsState.password.touched
								? { borderBottom: '1px solid red' }
								: null
						}
						onChange={e => inputChangedHandler(e, 'password')}
						value={inputsState.password.value}
						placeholder='Password'
						className={classes.input}
					/>
					<span className={classes.error_messages}>
						{inputsState.password.errors[0] === 'Required Field'
							? 'Required Field'
							: inputsState.password.errors.join(', ')}
					</span>

					{isSignInState ? null : (
						<>
							{' '}
							<input
								style={
									!inputsState.confirmPassword.isValid &&
									inputsState.confirmPassword.touched
										? { borderBottom: '1px solid red' }
										: null
								}
								onChange={e => inputChangedHandler(e, 'confirmPassword')}
								value={inputsState.confirmPassword.value}
								placeholder='Confirm Password'
								className={classes.input}
							/>
							<span className={classes.error_messages}>
								{inputsState.confirmPassword.errors[0] === 'Required Field'
									? 'Required Field'
									: inputsState.confirmPassword.errors.join(', ')}
							</span>
						</>
					)}
					<span className={classes.error_messages}>
						{props.error && props.error.message}
					</span>
					<Button
						onClick={() =>
							formOnSubmitHandler(
								null,
								inputsState.email.value,
								inputsState.password.value
							)
						}
						disabled={!isFormValidState}
						className={classes.button}
						styles={{
							borderRadius: '2.5rem',
							border: '1px solid #ff0061',
							backgroundColor: '#fff',
							color: '#ff0061'
						}}
						hoverable
					>
						{' '}
						{isSignInState ? 'Sign In' : 'Sign Up'}
					</Button>
					<Button
						onClick={e => signInStateHandler(e)}
						className={classes.button}
						styles={{
							borderRadius: '2.5rem',
							border: '1px solid #ff0061',
							backgroundColor: '#fff',
							color: '#ff0061'
						}}
						hoverable
					>
						{' '}
						{isSignInState ? 'Switch To Sign Up' : 'Switch To Sign In'}
					</Button>
				</form>
			)}
		</Model>
	);
};

const mapStateToProps = ({ auth }) => ({
	loading: auth.loading,
	error: auth.error
});
const mapDispatchToProps = dispatch => {
	return {
		authenticateUserWithProvider: provider =>
			dispatch(actionCreators.providerSignIn(provider)),
		authenticateUser: (email, password, isSignIn) =>
			dispatch(actionCreators.auth(email, password, isSignIn))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sign);
