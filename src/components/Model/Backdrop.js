import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const StyledBackDrop = styled.div`
	position: fixed;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.45);
	z-index: 290;
`;
const Backdrop = props => (
	<StyledBackDrop onClick={props.cancel || props.history.goBack} />
);
export default withRouter(Backdrop);
