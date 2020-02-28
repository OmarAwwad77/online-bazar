import React, { useState } from 'react';
import classes from './ReAuth.module.css';
import WithModelComponent from '../Model/WithModelComponent';
import * as actionCreators from '../../store/actions';
import Button from '../../UI/Button/Button';
import Confirmation from '../../UI/Confirmation/Confirmation';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../config/configfb';
import Spinner from '../../UI/Spinner/Spinner';
import styled from 'styled-components';
import {
	StyledMessage,
	StyledTitle,
	modelStyles
} from '../Model/withErrorModel';

const ReAuth = props => {
	const [deleteConfirmed, setDeleteConfirmed] = useState(false);
	const [formInputsState, setformInputsState] = useState({
		email: '',
		password: '',
		newPassword: ''
	});
	const inputChangeHandler = (e, identifier) =>
		setformInputsState({
			...formInputsState,
			[identifier]: e.target.value
		});

	const continueHandler = () => {
		const isDeleteAction = props.reAuthAction === 'delete' ? true : false;
		const credentials =
			props.providerId === 'google.com' || props.providerId === 'facebook'
				? null
				: {
						email: formInputsState.email,
						password: formInputsState.password,
						newPassword: formInputsState.newPassword
				  };

		props.reAuth(auth().currentUser, isDeleteAction, credentials);
	};

	const buttonsStyles = {
		borderRadius: '2.5rem',
		border: '1px solid #ff0061',
		backgroundColor: '#fff',
		color: '#ff0061'
	};

	const signInWithPassword =
		props.providerId !== 'google.com' && props.providerId !== 'facebook.com';

	const formContent = signInWithPassword ? (
		<>
			<input
				onChange={e => inputChangeHandler(e, 'email')}
				className={classes['reauth-form__input']}
				placeholder='Email'
			/>
			<input
				onChange={e => inputChangeHandler(e, 'password')}
				className={classes['reauth-form__input']}
				placeholder='Password'
			/>
			{props.reAuthAction === 'change' && (
				<input
					onChange={e => inputChangeHandler(e, 'newPassword')}
					className={classes['reauth-form__input']}
					placeholder='New Password'
				/>
			)}
		</>
	) : null;

	let content = (
		<form className={classes['reauth-form']}>
			<p className={classes['reauth-form__title']}>
				you need to login again in order to proceed with this action
			</p>
			{formContent}
			<Button
				styles={{ ...buttonsStyles, marginTop: '2rem', marginBottom: '1rem' }}
				hoverable
				onClick={continueHandler}
			>
				Continue
			</Button>
		</form>
	);
	if (props.reAuthAction === 'delete' && !deleteConfirmed) {
		content = (
			<Confirmation
				usingRouter
				noModel
				message='are you sure you wanna delete your account'
				action={() => setDeleteConfirmed(true)}
			/>
		);
	}
	if (props.loading) {
		content = props.loading && <Spinner />;
	} else if (props.error) {
		const Div = styled.div`
			${props => props.styles}
		`;
		content = (
			<Div styles={modelStyles}>
				<StyledTitle>Error</StyledTitle>
				<StyledMessage>something went wrong</StyledMessage>
			</Div>
		);
	} else if (!props.reAuthAction || props.redirect) {
		props.redirect && props.resetRedirectAuth();
		content = <Redirect to='/' />;
	}

	return content;
};

const mapStateToProps = ({ auth }) => ({
	reAuthAction: auth.reAuth,
	providerId: auth.user && auth.user.providerId,
	loading: auth.loading,
	redirect: auth.redirect,
	error: auth.error
});

const mapDispatchToProps = dispatch => ({
	reAuth: (user, isDeleteAction, credentials) =>
		dispatch(actionCreators.reAuth(user, isDeleteAction, credentials)),
	resetRedirectAuth: () => dispatch(actionCreators.resetRedirectAuth())
});

const ReAuthWithModel = storeProps => (
	<WithModelComponent show usingRouter modelClass={classes['model']}>
		{close => <ReAuth closeModel={close} {...storeProps} />}
	</WithModelComponent>
);

export default connect(mapStateToProps, mapDispatchToProps)(ReAuthWithModel);
