import React, { useState, useRef, useEffect } from 'react';
import classes from './DropDown.module.css';

const DropDown = props => {
	const [isListShownState, setListShownState] = useState(false);
	const listClasses = [
		classes['drop-down__list'],
		isListShownState && classes['drop-down__list--show']
	];
	const dropDownEl = useRef(null);
	// useEffect(() => (console.log(dropDownEl.current.isFocused())), [])
	const onClickHandler = (e, value) => {
		props.onChangeHandler(value);
		setListShownState(false);
		e.stopPropagation();
	};

	const xhandler = () => {
		setListShownState(!isListShownState);
		dropDownEl.current.focus();
	};
	const containerClasses = [classes['drop-down']];
	props.className && containerClasses.push(props.className);
	return (
		<div className={containerClasses.join(' ')} onClick={xhandler}>
			<input
				style={{
					height: '0',
					width: 0,
					position: 'absolute',
					border: 'none',
					outline: 'none'
				}}
				onBlur={() => setListShownState(false)}
				ref={dropDownEl}
			/>
			<span className={classes['drop-down__chosen']}>{props.value}</span>
			<div className={listClasses.join(' ')}>
				{props.list.map(listItem => (
					<span
						key={listItem}
						className={classes['drop-down__list-item']}
						onClick={e => onClickHandler(e, listItem)}
					>
						{listItem}
					</span>
				))}
			</div>
		</div>
	);
};

export default DropDown;
