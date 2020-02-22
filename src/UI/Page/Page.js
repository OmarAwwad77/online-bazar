import React from 'react';
import classes from './Page.module.css';
import { Spring } from 'react-spring/renderprops';

const page = props => {
	return (
		<section className={classes['Page']}>
			<Spring from={{ opacity: 0, x: 10 }} to={{ opacity: 1, x: 0 }}>
				{animProps => (
					<>
						<h2
							style={{
								opacity: animProps.opacity,
								transform: `translateX(${animProps.x}rem)`
							}}
							className={classes['Page__title']}
						>
							{props.title}
						</h2>
						<div
							style={{
								opacity: animProps.opacity,
								transform: `translateX(-${animProps.x}rem)`
							}}
							className={classes['Page__divider']}
						/>
					</>
				)}
			</Spring>
			<section
				className={
					props.contentClassName
						? props.contentClassName
						: classes['Page__content-container']
				}
			>
				{props.children}
			</section>
			<div className={classes['Page__divider']} />
		</section>
	);
};

export default page;
