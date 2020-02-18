import React from 'react';
import classes from './Footer.module.css';
import Logo from '../../../UI/Logo/Logo';
import { ReactComponent as Envelope } from '../../../assets/envelope.svg';

const footer = props => {
	const sytleClasses = [classes.footer, props.styleClass];
	return (
		<section className={sytleClasses.join(' ')}>
			<section className={classes.logo}>
				<Logo
					bright
					spanFirst='#ff0061'
					spanSecond='#fff'
					spanFontSize='3rem'
					marginTop='2rem'
				/>
			</section>
			<section className={classes.categories}>
				<h2 className={classes.categories_title}>Categories</h2>
				<ul className={classes.categories_list}>
					<li>
						<a>phones</a>
					</li>
					<li>
						<a>cameras</a>
					</li>
					<li>
						<a>laptops</a>
					</li>
					<li>
						<a>tablets</a>
					</li>
				</ul>
			</section>
			<section className={classes.links}>
				<h2 className={classes.links_title}>Links</h2>
				<ul className={classes.links_list}>
					<li>
						<a>home</a>
					</li>
					<li>
						<a>account</a>
					</li>
					<li>
						<a>my items</a>
					</li>
					<li>
						<a>add itme</a>
					</li>
					<li>
						<a>favourits</a>
					</li>
				</ul>
			</section>
			<section className={classes.contact}>
				<h2 className={classes.contact_title}>Contact Me</h2>
				<div className={classes.contact_email}>
					<span className={classes.contact_envelope}>
						<Envelope />
					</span>
					<span>OmarAwwad010@gmail.com</span>
				</div>
			</section>
		</section>
	);
};

export default footer;
