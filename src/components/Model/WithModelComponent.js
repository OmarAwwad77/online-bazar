import React, { useEffect, useState, useRef } from 'react';
import classes from './withModel.module.css';
import { withRouter } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';

const WithModelComponent = props => {
	const [showS, setShowS] = useState(false);
	const isInitialMount = useRef(true);
	useEffect(() => {
		if (isInitialMount.current && showS === props.show) {
		} else {
			setShowS(props.show);
			console.log('show', props.show);
		}
	}, [props.show]);

	useEffect(() => {
		if (!isInitialMount.current && showS !== props.show) {
			console.log('change route');
			// props.history.goBack();
		}
	}, [showS]);

	useEffect(() => {
		isInitialMount.current = false;
	}, []);

	const trans = useTransition(showS, null, {
		from: { top: '-50%', opacity: 0 },
		enter: { top: '50%', opacity: 1 },
		leave: { top: '-50%', opacity: 0 }
	});

	const backDropCloseHandler = props.usingRouter
		? () => {
				// setShowS(false);
				props.history.goBack();
		  }
		: () => props.cancel();

	if (props.noModel) {
		return props.children(backDropCloseHandler);
	} else if (!props.noAnim) {
		return trans.map(
			({ item, key, props: animProps }, index) =>
				item && (
					<animated.div
						key={index}
						onClick={backDropCloseHandler}
						className={classes.backdrop}
						// style={{ opacity: animProps.opacity }}
					>
						<animated.div
							onClick={e => e.stopPropagation()}
							style={{ ...animProps }}
							className={[classes.model, props.modelClass].join(' ')}
						>
							<div className={classes.cancel} onClick={backDropCloseHandler}>
								<span></span> <span></span>
							</div>
							{props.children(backDropCloseHandler)}
						</animated.div>
					</animated.div>
				)
		);
	} else {
		return (
			<section onClick={backDropCloseHandler} className={classes.backdrop}>
				<div
					onClick={e => e.stopPropagation()}
					className={[classes.model, props.modelClass].join(' ')}
				>
					<div className={classes.cancel} onClick={backDropCloseHandler}>
						<span></span> <span></span>
					</div>
					{props.children(backDropCloseHandler)}
				</div>
			</section>
		);
	}
};

export default withRouter(WithModelComponent);
