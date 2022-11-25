import React, { useState } from 'react';
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from "react-router";
const BasicMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClickHome = () => {
    navigate("/")
  }
  const handleClickMovies = () => {
    navigate("/movies")
  }
  const handleClickCategory = () => {
    navigate("/category")
  }
  const handleClickSearch = () => {
    navigate("/search")
  }
  const handleClickMyList = () => {
    navigate("/")
  }
  return (
    <div className="md:!hidden">
    <Button
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      className="!capitalize !text-white"
    >
      Menu
    </Button>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      className="menu"
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleClickHome}>Home</MenuItem>
      <MenuItem onClick={handleClickMovies}>Movies</MenuItem>
      <MenuItem onClick={handleClickCategory}>Category</MenuItem>
      <MenuItem onClick={handleClickSearch}>Search</MenuItem>
      <MenuItem onClick={handleClose}>My List</MenuItem>
    </Menu>
  </div>
  );
};

export default BasicMenu;