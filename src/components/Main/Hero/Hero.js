import React from 'react';
import classes from './Hero.module.css';
import Button from '../../../UI/Button/Button';
import { Spring, config } from 'react-spring/renderprops';

const Hero = props => {
	return (
		<section className={classes.hero}>
			<Spring
				from={{ opacity: 0, transform: 'translateY(-10rem)' }}
				to={{ opacity: 1, transform: 'translateY(0)' }}
				config={config.gentle}
			>
				{animProps => <h2 style={animProps}>Welcome To</h2>}
			</Spring>

			<Spring
				from={{ opacity: 0, x: 10 }}
				to={{ opacity: 1, x: 0 }}
				config={{ friction: 5, tension: 170 }}
			>
				{animProps => (
					<>
						<h1
							style={{
								transform: `translateX(${animProps.x}rem)`,
								opacity: `${animProps.opacity}`
							}}
						>
							Online Bazar Marketplace
						</h1>
						<p
							style={{
								transform: `translateX(${-animProps.x}rem)`,
								opacity: `${animProps.opacity}`
							}}
						>
							Explore from thousands of premium quality second-hand products.
						</p>
					</>
				)}
			</Spring>

			<section className={classes.hero_action_buttons}>
				{props.auth ? (
					animatedButtonS('explore')
				) : (
					<>
						{animatedButtonS('explore')}
						{animatedButtonS('become a seller')}
					</>
				)}
			</section>
		</section>
	);
};

const animatedButtonS = type => {
	if (type === 'explore') {
		return (
			<Spring
				from={{ opacity: 0, transform: 'translateY(10rem)' }}
				to={{ opacity: 1, transform: 'translateY(0)' }}
				config={config.gentle}
			>
				{animProps => (
					<Button
						styles={{
							width: '20rem',
							backgroundColor: '#fff',
							color: '#4e002d',
							...animProps
						}}
						hoverable
						active
						activeStyles={{ backgroundColor: '#ff0061', color: '#fff' }}
					>
						Explore Now
					</Button>
				)}
			</Spring>
		);
	}
	return (
		<Spring
			from={{ opacity: 0, transform: 'translateY(10rem)' }}
			to={{ opacity: 1, transform: 'translateY(0)' }}
			config={config.gentle}
		>
			{animProps => (
				<Button
					styles={{ backgroundColor: '#fff', color: '#4e002d', ...animProps }}
					hoverable
					hoverStyles={{ backgroundColor: '#ff0061', color: '#fff' }}
				>
					Become a Seller
				</Button>
			)}
		</Spring>
	);
};

export default Hero;
