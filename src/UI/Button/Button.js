import React from 'react';
import classes from './Button.module.css';
import styled from 'styled-components';

const Button = (props) => {
    // const styles = [classes.button];
    // props.active && styles.push(classes.active);
    const active = props.active && (props.activeStyles || { backgroundColor: props.colors.color, color: props.colors.backgroundColor });
    const hover = props.hoverable && (props.active ? props.colors : { color: props.colors.backgroundColor, backgroundColor: props.colors.color });
    const StyledLink = styled.a`
        ${props.colors}
        &:hover{
            ${hover}
        }
        &:active{
            box-shadow: 2px 3px 5px rgba(0,0,0,.25);
        }
        ${active}
        padding: 1rem 2rem;
        margin: 0 1.5rem;
        border-radius: .5rem;
        font-weight: 700;
        transition: all .5s ease , box-shadow .2s ease;
        box-shadow: 2px 8px 5px rgba(0,0,0,.25);
        cursor: pointer;
    `;
    return (
        <StyledLink >{props.children}</StyledLink>
    );
}

export default Button;