import React from 'react';
import styled from 'styled-components';

const Model = props => {
	return (
		<StyledModel
			styles={props.style}
			className={props.modelClass}
			onClick={e => e.stopPropagation()}
		>
			<StyledCancelButton onClick={props.goBack}>
				<StyledCancelSpan />
				<StyledCancelSpan />
			</StyledCancelButton>
			{props.children}
		</StyledModel>
	);
};

export default Model;

const StyledModel = styled.section`
	position: fixed;
	overflow-y: auto;
	background-color: #fff;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 350;
	pointer-events: all;
	${props => props.styles}
`;

const StyledCancelButton = styled.div`
	width: 2rem;
	height: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
	cursor: pointer;

	&:hover span {
		background-color: #ff0061;
	}
`;
const StyledCancelSpan = styled.span`
	position: absolute;
	width: 1px;
	height: 1.3rem;
	background-color: grey;
	display: inline-block;
	transform: rotate(45deg);
	transition: all 0.3s ease;

	&:last-of-type {
		transform: rotate(-45deg);
	}
`;
