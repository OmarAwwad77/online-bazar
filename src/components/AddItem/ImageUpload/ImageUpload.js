import React from 'react';
import classes from './ImageUpload.module.css';
import { ReactComponent as Plus } from '../../../assets/plus.svg';
import Spinner from '../../../UI/Spinner/Spinner';

const imageUpload = props => {
	let text = 'Additional Image';
	let requiredText = '(Optional)';
	if (props.inputId === 'main') {
		text = 'Main Image';
		requiredText = '(Required)';
	}
	return (
		<div className={classes['image-upload']}>
			{props.loading ? (
				<div>
					<Spinner />
				</div>
			) : (
				<>
					<input
						id={props.inputId}
						type='file'
						onChange={e => props.onChange(e)}
					/>
					{props.url ? (
						<div
							className={classes['image-upload__image-preview']}
							style={{ backgroundImage: `url(${props.url})` }}
						>
							<div className={classes['image-preview__overlay']}>
								<a
									onClick={props.onCancel}
									className={classes['overlay__links']}
								>
									Cancel
								</a>

								<label
									onClick={props.onSwitch}
									htmlFor={props.inputId}
									className={classes['overlay__links']}
								>
									Change
								</label>
							</div>
						</div>
					) : (
						<>
							<label
								htmlFor={props.inputId}
								className={classes['image-upload__icon']}
							>
								<Plus width='100%' height='100%' />
							</label>
							<span>{text}</span>
							<span style={{ whiteSpace: 'pre-line' }}>{requiredText}</span>
						</>
					)}
					<span className={classes['image-upload__error-message']}>
						{props.errorMessage}
					</span>
				</>
			)}
		</div>
	);
};

export default imageUpload;
