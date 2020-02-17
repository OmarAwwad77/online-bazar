import React from 'react';
import classes from './Hero.module.css';
import Button from '../../../UI/Button/Button';

const Hero = props => {
	return (
		<section className={classes.hero}>
			<h2>Welcome To</h2>
			<h1>Online Bazar Marketplace</h1>
			<p>Explore from thousands of premium quality second-hand products.</p>
			<section className={classes.hero_action_buttons}>
				{props.auth ? (
					<Button
						styles={{
							width: '20rem',
							backgroundColor: '#fff',
							color: '#4e002d'
						}}
						hoverable
						active
						activeStyles={{ backgroundColor: '#ff0061', color: '#fff' }}
					>
						Explore Now
					</Button>
				) : (
					<>
						<Button
							styles={{
								backgroundColor: '#fff',
								color: '#4e002d'
							}}
							hoverable
							active
							activeStyles={{ backgroundColor: '#ff0061', color: '#fff' }}
						>
							Explore Now
						</Button>
						<Button
							styles={{ backgroundColor: '#fff', color: '#4e002d' }}
							hoverable
							hoverStyles={{ backgroundColor: '#ff0061', color: '#fff' }}
						>
							Become a Seller
						</Button>
					</>
				)}
			</section>
		</section>
	);
};

export default Hero;
