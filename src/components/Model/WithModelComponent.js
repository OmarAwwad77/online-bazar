import React from 'react';
import classes from './withModel.module.css';
import { withRouter } from 'react-router-dom';

const WithModelComponent = props => {
	const backDropCloseHandler = props.usingRouter
		? props.history.goBack
		: props.cancel;
	if (props.noModel) {
		return props.children(backDropCloseHandler);
	} else {
		return (
			<div onClick={backDropCloseHandler} className={classes.backdrop}>
				<section onClick={e => e.stopPropagation()} className={classes.model}>
					<div className={classes.cancel} onClick={backDropCloseHandler}>
						<span></span> <span></span>
					</div>
					{props.children(backDropCloseHandler)}
				</section>
			</div>
		);
	}
};

export default withRouter(WithModelComponent);