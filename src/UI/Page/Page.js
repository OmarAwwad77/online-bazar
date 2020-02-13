import React from 'react';
import classes from './Page.module.css';

const page = props => {
	return (
		<section className={classes['Page']}>
			<h2 className={classes['Page__title']}>{props.title}</h2>
			<div className={classes['Page__divider']} />
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
