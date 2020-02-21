import React from 'react';
import classes from './withModel.module.css';

const withModel = (Component, cssClass) => {
	return props => {
		const backDropCloseHandler = () => props.history.goBack();
		return (
			<div onClick={backDropCloseHandler} className={classes.backdrop}>
				<section
					onClick={e => e.stopPropagation()}
					className={[classes.model, cssClass].join(' ')}
				>
					<div className={classes.cancel} onClick={backDropCloseHandler}>
						<span></span> <span></span>
					</div>
					{<Component {...props} closeModel={backDropCloseHandler} />}
				</section>
			</div>
		);
	};
};

export default withModel;
