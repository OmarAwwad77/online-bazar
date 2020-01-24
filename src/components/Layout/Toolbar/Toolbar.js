import React from 'react';
// import { ReactComponent as Logo } from '../../assets/logo.svg';
import classes from './Toolbar.module.css'
import NavItems from './NavItems/NavItems';
import Logo from '../../../UI/Logo/Logo';
import { withRouter } from 'react-router-dom'

const toolbar = (props) => {
    const toolbarBackgroundColor = (props.location.pathname === '/add-item') ?
        { backgroundColor: 'rgba(0,0,0,0.1)' } : { backgroundColor: '#fff' };
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
            hasNested: true,
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
            hasRoutes: true,
            hasCallBacks: true,
            dropDownItems: {
                'Sing Out': { func: () => { }, path: '/sign-out' },
                'Change Password': { func: () => { }, path: '/re-auth' },
                'Delete Account': { func: () => { }, path: '/re-auth' }
            }
        });

    const signWithPassword = (props.providerId !== 'google.com' && props.providerId !== 'facebook.com');

    !signWithPassword && delete dropDowns[dropDowns.length - 1].dropDownItems['Change Password'];
    dropDowns.forEach((dropDown, i) => {
        if (dropDown.hasCallBacks) {
            Object.keys(dropDown.dropDownItems).forEach((key) => {
                dropDowns[i].dropDownItems[key].func = props.actions[key];
            })
        }
    });

    // if (props.providerId === 'google.com' || props.providerId === 'facebook.com') {
    //     delete dropDowns[dropDowns.length - 1].dropDownItems['Change Password'];

    //     const dropDownsWithCallBacks = dropDowns.filter((obj) => (obj.hasCallBacks));
    //     dropDownsWithCallBacks.forEach((obj, i, arr) => (
    //         Object.keys(obj.dropDownItems).forEach((key) => (
    //             arr[i].dropDownItems[key].func = props.actions
    //         ))
    //     ));
    // }else{

    // }

    // (props.providerId === 'google.com' || props.providerId === 'facebook.com') && delete dropDowns[dropDowns.length - 1].dropDownItems['Change Password'];

    !props.auth ? links.push({ name: 'Sign in/up', path: '/sign', relative: true }) : links.push({ name: 'Account', path: '/account', noActiveStyle: true });

    return (
        <header style={toolbarBackgroundColor} className={classes.toolbar}>
            <Logo height='80%' spanFirst="#ff0061" spanSecond="#4e002d" />
            <NavItems
                items={links}

                dropDowns={dropDowns} />
        </header>
    );
}

export default withRouter(toolbar);