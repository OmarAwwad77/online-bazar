import React from 'react';
import Model from './Model';
import Backdrop from './Backdrop';
import styled, { css } from 'styled-components';

export const StyledTitle = styled.div`
	position: absolute;
	top: 0rem;
	left: 0rem;
	font-size: 3rem;
	width: 100%;
	background-color: #ff0061;
	color: #fff;
	padding: 2rem;
`;

export const StyledMessage = styled.p`
	font-size: 2.5rem;
	text-transform: capitalize;
	@media screen and (max-width: 470px) {
		font-size: 1.8rem;
	}
`;

export const modelStyles = css`
	width: 40rem;
	height: 32rem;
	display: flex;
	justify-content: center;
	align-items: center;

	@media only screen and (max-width: 470px){
		& {
			width: 80%;
			height: 40%;
		}
	}
}

`;

const withErrorModel = Component => {
	return props => {
		return props.hasError ? (
			<>
				<Component {...props} />
				<Backdrop cancel={props.clearItemsError} />
				<Model style={modelStyles}>
					<StyledTitle>Error</StyledTitle>
					<StyledMessage>something went wrong</StyledMessage>
				</Model>
			</>
		) : (
			<Component {...props} />
		);
	};
};

export default withErrorModel;
