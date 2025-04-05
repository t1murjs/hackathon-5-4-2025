import React from 'react'
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from '../../Hooks/useAuth';
import Axios from 'axios'

export default function NavigationBar() {
  let isRegistered = useAuth()

  const handleLogOut = async() => {
    await Axios.post('http://localhost:5001/user/logout', {}, {withCredentials: true})
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  if(isRegistered)
  {
    return (
      <Navbar>
      <NavbarBrand href='/'> The Roast Team </NavbarBrand>
      <Nav>
        <NavItem>
            <NavLink href='/'> Home </NavLink>
        </NavItem>
        <NavItem>
            <NavLink onClick={() => handleLogOut()}> Log out</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
    )
  }
  else
  {
    return (
      <Navbar>
      <NavbarBrand href='/'> The Roast Team </NavbarBrand>
      <Nav>
        <NavItem>
            <NavLink href='/'> Home </NavLink>
        </NavItem>
        <NavItem>
            <NavLink href='log in'> Log in</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href='sign up'> Sign up</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
    )
  }

}
