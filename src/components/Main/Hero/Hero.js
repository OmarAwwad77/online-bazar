import React from 'react';
import classes from './Hero.module.css';
import Button from '../../../UI/Button/Button';
import { NavHashLink } from 'react-router-hash-link';
import { useHistory } from 'react-router-dom';
import { useSprings, animated, config } from 'react-spring';

const Hero = props => {
	const push = useHistory().push;
	const welcome = <h2>Welcome To</h2>;
	const onlineBazar = <h1> Online Bazar Marketplace </h1>;
	const paragraph = (
		<p> Explore from thousands of premium quality second-hand products. </p>
	);
	const exploreButton = (
		<NavHashLink style={{ textDecoration: 'none' }} to='/#products' smooth>
			<Button
				hoverable
				active
				hoverStyles={{ color: '#ff0061', backgroundColor: '#fff' }}
				activeStyles={{ backgroundColor: '#ff0061', color: '#fff' }}
			>
				Explore Now
			</Button>
		</NavHashLink>
	);

	const becomeSellerButton = (
		<Button
			onClick={() => push('/sign')}
			styles={{ backgroundColor: '#fff', color: '#4e002d' }}
			hoverable
			hoverStyles={{ backgroundColor: '#ff0061', color: '#fff' }}
		>
			Become a Seller
		</Button>
	);

	const items = [
		{
			// welcome to h2
			component: welcome,
			from: { opacity: 0, transform: 'translateY(-10rem)' },
			to: { opacity: 1, transform: 'translateY(0)' },
			config: config.gentle
		},

		{
			// Online Bazar Marketplace h1
			component: onlineBazar,
			from: { opacity: 0, transform: 'translateX(10rem)' },
			to: { opacity: 1, transform: 'translateX(0rem)' },
			config: { friction: 5, tension: 170 }
		},

		{
			// Explore from p
			component: paragraph,
			from: { opacity: 0, transform: 'translateX(-10rem)' },
			to: { opacity: 1, transform: 'translateX(0rem)' },
			config: { friction: 5, tension: 170 }
		},

		{
			// button 1
			component: exploreButton,
			from: { opacity: 0, transform: 'translateY(10rem)' },
			to: { opacity: 1, transform: 'translateY(0)' },
			config: config.gentle
		},

		{
			// button 2
			component: becomeSellerButton,
			from: { opacity: 0, transform: 'translateY(10rem)' },
			to: { opacity: 1, transform: 'translateY(0)' },
			config: config.gentle
		}
	];

	const springs = useSprings(
		items.length,
		items.map(item => ({
			to: item.to,
			from: item.from,
			config: item.config
		}))
	);

	const animatedItems = springs.map((spring, index) => (
		<animated.div style={spring}>{items[index].component}</animated.div>
	));

	return (
		<section className={classes.hero}>
			{animatedItems[0]}
			{animatedItems[1]}
			{animatedItems[2]}
			<section className={classes.hero_action_buttons}>
				{props.auth ? (
					animatedItems[3]
				) : (
					<>
						{animatedItems[3]} {animatedItems[4]}
					</>
				)}
			</section>
		</section>
	);
};

export default Hero;

// const Hero = props => {
// 	return (
// 		<section className={classes.hero}>
// 			<Spring
// 				from={{ opacity: 0, transform: 'translateY(-10rem)' }}
// 				to={{ opacity: 1, transform: 'translateY(0)' }}
// 				config={config.gentle}
// 			>
// 				{animProps => <h2 style={animProps}>Welcome To</h2>}
// 			</Spring>

// 			<Spring
// 				from={{ opacity: 0, x: 10 }}
// 				to={{ opacity: 1, x: 0 }}
// 				config={{ friction: 5, tension: 170 }}
// 			>
// 				{animProps => (
// 					<>
// 						<h1
// 							style={{
// 								transform: `translateX(${animProps.x}rem)`,
// 								opacity: `${animProps.opacity}`
// 							}}
// 						>
// 							Online Bazar Marketplace
// 						</h1>
// 						<p
// 							style={{
// 								transform: `translateX(${-animProps.x}rem)`,
// 								opacity: `${animProps.opacity}`
// 							}}
// 						>
// 							Explore from thousands of premium quality second-hand products.
// 						</p>
// 					</>
// 				)}
// 			</Spring>

// 			<section className={classes.hero_action_buttons}>
// 				{props.auth ? (
// 					animatedButtonS('explore')
// 				) : (
// 					<>
// 						{animatedButtonS('explore')}
// 						{animatedButtonS('become a seller')}
// 					</>
// 				)}
// 			</section>
// 		</section>
// 	);
// };

// const animatedButtonS = type => {
// 	if (type === 'explore') {
// 		return (
// 			<Spring
// 				from={{ opacity: 0, transform: 'translateY(10rem)' }}
// 				to={{ opacity: 1, transform: 'translateY(0)' }}
// 				config={config.gentle}
// 			>
// 				{animProps => (
// 					<Button
// 						styles={{
// 							width: '20rem',
// 							backgroundColor: '#fff',
// 							color: '#4e002d',
// 							...animProps
// 						}}
// 						hoverable
// 						active
// 						activeStyles={{ backgroundColor: '#ff0061', color: '#fff' }}
// 					>
// 						Explore Now
// 					</Button>
// 				)}
// 			</Spring>
// 		);
// 	}
// 	return (
// 		<Spring
// 			from={{ opacity: 0, transform: 'translateY(10rem)' }}
// 			to={{ opacity: 1, transform: 'translateY(0)' }}
// 			config={config.gentle}
// 		>
// 			{animProps => (
// 				<Button
// 					styles={{ backgroundColor: '#fff', color: '#4e002d', ...animProps }}
// 					hoverable
// 					hoverStyles={{ backgroundColor: '#ff0061', color: '#fff' }}
// 				>
// 					Become a Seller
// 				</Button>
// 			)}
// 		</Spring>
// 	);
// };

// export default Hero;
