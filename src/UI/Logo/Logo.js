import React from 'react';
import classes from './Logo.module.css';
import logoDark from '../../assets/logo-dark.png';
import logoBright from '../../assets/logo-bright.png';

const logo = props => {
	const logo = props.bright ? logoBright : logoDark;
	const logoContainerClasses = [classes.logo_container];
	props.bright && logoContainerClasses.push(classes['Logo-footer__container']);
	return (
		<div
			style={{ height: props.height, width: props.width }}
			className={logoContainerClasses.join(' ')}
		>
			{/* <Logo className={classes.logo} /> */}
			<img className={classes.logo_image} src={logo} />
			<span
				className={classes.logo_text}
				style={{
					color: props.spanSecond,
					fontSize: props.spanFontSize,
					marginTop: props.marginTop
				}}
			>
				<span style={{ color: props.spanFirst }}>Online</span>Bazar
			</span>
		</div>
	);
};

export default logo;
