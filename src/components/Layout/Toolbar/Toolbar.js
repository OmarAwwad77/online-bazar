import React from 'react';
// import { ReactComponent as Logo } from '../../assets/logo.svg';
import classes from './Toolbar.module.css'
import NavItems from './NavItems/NavItems';
import Logo from '../../../UI/Logo/Logo';

const toolbar = (props) => {
    const links = [
        {
            name: 'Home',
            path: '/',
            exact: true
        },
        {
            name: 'Categories',
            path: '/home/#products',
            noActiveStyle: true
        },
        {
            name: 'My Items',
            path: '/my-items',
        },
        {
            name: 'Favourites',
            path: '/favourites',
        }
    ];

    const dropDowns = [
        {
            itemIndex: 1,
            dropDownItems: {
                'Phones': ['Android', 'IOS'],
                'Cameras': ['Canon', 'Sony'],
                'Laptop': ['MacOs', 'Windows'],
                'Tablets': ['IPad', 'Android']
            },
        }
    ];

    props.auth && dropDowns.push(
        {
            itemIndex: 4,
            dropDownItems: [
                'Sign Out',
                'Change Password',
                'Delete Account'
            ]
        });

    (props.providerId === 'google.com' || props.providerId === 'facebook.com') && dropDowns[dropDowns.length - 1].dropDownItems.splice(1, 1);

    !props.auth ? links.push({ name: 'Sign in/up', path: '/sign', relative: true }) : links.push({ name: 'Account', path: '/account', noActiveStyle: true });

    return (
        <header className={classes.toolbar}>
            <Logo height='80%' spanFirst="#ff0061" spanSecond="#4e002d" />
            <NavItems
                items={links}

                dropDowns={dropDowns} />
        </header>
    );
}

export default toolbar;