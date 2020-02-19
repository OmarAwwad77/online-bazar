import React from 'react';
import classes from './Confirmation.module.css';
import Button from '../Button/Button';
import WithModelComponent from '../../components/Model/WithModelComponent';

const Confirmation = props => {
	const buttonsStyles = {
		borderRadius: '2.5rem',
		border: '1px solid #ff0061',
		backgroundColor: '#fff',
		color: '#ff0061'
	};
	// withModel = !props.withModel && (C => props => <C {...props} />);

	// if (!props.withModel) {
	// 	withModel = C => props => <C {...props} />;
	// }

	return (
		<WithModelComponent
			modelClass={classes['model']}
			cancel={props.cancel}
			usingRouter={props.usingRouter}
			noModel={props.noModel}
		>
			{closeModel => (
				<section className={classes['confirmation']}>
					<p className={classes['confirmation__title']}>{props.message}</p>
					<div className={classes['confirmation__buttons-container']}>
						<Button
							hoverable
							styles={{ ...buttonsStyles, width: '10rem', textAlign: 'center' }}
							onClick={props.action}
						>
							Yes
						</Button>
						<Button
							hoverable
							styles={{ ...buttonsStyles, width: '10rem', textAlign: 'center' }}
							onClick={closeModel}
						>
							Cancel
						</Button>
					</div>
				</section>
			)}
		</WithModelComponent>
	);
};

export default Confirmation;
