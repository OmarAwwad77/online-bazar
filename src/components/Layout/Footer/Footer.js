import React from 'react';
import classes from './Footer.module.css';
import Logo from '../../../UI/Logo/Logo';
import { ReactComponent as Envelope } from '../../../assets/envelope.svg';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setToolbarQuery } from '../../../store/actions';

const footer = props => {
	const sytleClasses = [classes.footer, props.styleClass];
	// const footerLinksStyle = { textDecoration: 'none' };
	const setQuery = category => ({
		category: category,
		subCategory: 'All SubCategories',
		ascending: 'Sort By Price: Low to High'
	});
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
						<HashLink
							smooth
							to='/#products'
							onClick={() => props.setQueryToolbar(setQuery('Phones'))}
						>
							phones
						</HashLink>
					</li>
					<li>
						<HashLink
							smooth
							to='/#products'
							onClick={() => props.setQueryToolbar(setQuery('Cameras'))}
						>
							cameras
						</HashLink>
					</li>
					<li>
						<HashLink
							smooth
							to='/#products'
							onClick={() => props.setQueryToolbar(setQuery('Laptops'))}
						>
							laptops
						</HashLink>
					</li>
					<li>
						<HashLink
							smooth
							to='/#products'
							onClick={() => props.setQueryToolbar(setQuery('Tablets'))}
						>
							tablets
						</HashLink>
					</li>
				</ul>
			</section>
			<section className={classes.links}>
				<h2 className={classes.links_title}>Links</h2>
				<ul className={classes.links_list}>
					{createFooterLinks(props.isAuth)}
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

const mapDispatchToProps = dispatch => ({
	setQueryToolbar: query => dispatch(setToolbarQuery(query))
});

const mapStateToProps = ({ auth }) => ({
	isAuth: auth.user ? true : false
});

export default connect(mapStateToProps, mapDispatchToProps)(footer);

const createFooterLinks = isAuth =>
	isAuth ? (
		<>
			<li>
				<Link to='/'>home</Link>
			</li>
			<li>
				<Link to='/my-items'>my items</Link>
			</li>
			<li>
				<Link to='/add-item'>add item</Link>
			</li>
			<li>
				<Link to='/favorites'>favorites</Link>
			</li>
		</>
	) : (
		<>
			<li>
				<Link to='/'>home</Link>
			</li>
			<li>
				<Link to='/sign'>add item</Link>
			</li>
			<li>
				<Link to='/sign'>Sign in/up</Link>
			</li>
		</>
	);
