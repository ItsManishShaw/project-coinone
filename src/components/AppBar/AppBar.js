import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import edit from '../../images/edit.svg';
import device from '../../images/device.svg';
import del from '../../images/del.svg';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import useWindowResize from '../../hooks/useWindowResize';
import './AppBar.css';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

export default function PrimarySearchAppBar() {

  const [windowWidth, windowHeight] = useWindowResize();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>{anchorEl?.innerText ? 'Class-Time' : 'Profile'}</MenuItem>
      {anchorEl?.innerText&& < MenuItem onClick={handleMenuClose}>{anchorEl?.innerText ? 'Study-Time' : 'Profile'}</MenuItem>}
      <MenuItem onClick={handleMenuClose}>{anchorEl?.innerText?'Free-Time':'My account'}</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <img className="w-5 h-5" src={device} alt="add"/>
        </IconButton>
        <p>Add Device</p>
      </MenuItem>
      <MenuItem>

      <IconButton aria-label="show 4 new mails" color="inherit">
          <img className="w-5 h-5" src={edit} alt="Edit"/>
        </IconButton>
        <p>Edit Details</p>
        </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
      <IconButton aria-label="show 4 new mails" color="inherit">
          <img className="w-5 h-5" src={del} alt="Delete "/>
        </IconButton>
        <p>Delete Child</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow }>
      <AppBar position="static">
        <Toolbar classKey="AppBar">
          <div className={classes.sectionDesktop+' flex flex-row items-center pl-2 md:pl-14'}>
            <IconButton
              edge="start"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="default"
            >
              <AccountCircle
                fontSize={windowWidth < 767 ? 'medium' : 'large'}
              />
            </IconButton>
            <h1 className="userName text-sm md:text-2xl -ml-2">Aditya Prasad</h1>
          </div>
        
          <div className="bg-white ml-auto rounded w-22 md:w-auto h-8 md:h-auto flex ">
            <Button variant="outlined" color="primary" size={windowWidth<768?'small':'large'} startIcon={<AddToQueueIcon />}>
              <span className="capitalize block text-xs md:text-base bg-white flex-shrink-0 ">Add Device</span>
            </Button>
          </div>
          <div className={'transform rotate-90 text-black -mr-4 md:mr-0'}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
