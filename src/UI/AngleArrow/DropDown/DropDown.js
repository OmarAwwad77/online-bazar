import React, { useState } from 'react';
import classes from './DropDown.module.css';

const DropDown = (props) => {
	const [isListShownState, setListShownState] = useState(false);

	const listClasses = [
		classes['drop-down__list'],
		isListShownState && classes['drop-down__list--show'],
	];

	const onClickHandler = (e, value) => {
		props.onChangeHandler(value);
		setListShownState(false);
		e.stopPropagation();
	};

	const xhandler = () => {
		setListShownState((prevState) => !prevState);
	};
	const containerClasses = [classes['drop-down']];
	props.className && containerClasses.push(props.className);
	return (
		<div className={containerClasses.join(' ')} onClick={xhandler}>
			<input
				id={props.list[0]}
				style={{
					height: '100%',
					width: '100%',
					position: 'absolute',
					top: '50%',
					left: '50%',
					zIndex: '2',
					transform: 'translate(-50%, -50%)',
					border: 'none',
					outline: 'none',
					cursor: 'pointer',
					color: 'transparent',
					background: 'transparent',
				}}
				onBlur={() => setListShownState(false)}
			/>
			<span className={classes['drop-down__chosen']}>{props.value}</span>
			<div className={listClasses.join(' ')}>
				{props.list.map((listItem) => (
					<span
						key={listItem}
						className={classes['drop-down__list-item']}
						onClick={(e) => onClickHandler(e, listItem)}
					>
						{listItem}
					</span>
				))}
			</div>
		</div>
	);
};

export default DropDown;
