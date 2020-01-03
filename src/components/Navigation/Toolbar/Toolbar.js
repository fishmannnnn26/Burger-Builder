import React from 'react';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className = {classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}> </DrawerToggle>
        <div className = {classes.Logo}>
            <Logo />
        </div>
        <nav className = {classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;