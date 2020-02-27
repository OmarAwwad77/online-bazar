import React from 'react';
import styled from 'styled-components';

const Button = props => {
	// const styles = [classes.button];
	// props.active && styles.push(classes.active);
	const active =
		props.active &&
		(props.activeStyles || {
			backgroundColor: props.styles.color,
			color: props.styles.backgroundColor
		});
	const hover =
		props.hoverable &&
		(props.hoverStyles ||
			(props.active
				? props.styles
				: {
						color: props.styles.backgroundColor,
						backgroundColor: props.styles.color
				  }));
	const disabled =
		props.disabled &&
		`
        opacity: 0.3;
        cursor: not-allowed;
    `;
	const StyledLink = styled.span`
        &:hover{
            ${!props.disabled && hover}
        }
        &:active{
            box-shadow: 2px 3px 5px rgba(0,0,0,.25);
        }
        padding: 1rem 2rem;
        margin: 0 1.5rem;
        border-radius: .5rem;
        font-weight: 700;
        transition: all .5s ease , box-shadow .2s ease;
        box-shadow: 2px 8px 5px rgba(0,0,0,.25);
        cursor: pointer;
        ${props.styles}
        ${active}
        ${disabled}
    `;
	return (
		<StyledLink onClick={props.onClick} className={props.className}>
			{props.children}
		</StyledLink>
	);
};

export default Button;
