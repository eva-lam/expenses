import React from 'react';

import {Container, Navbar, NavbarBrand } from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);

  
    this.state = {
      isOpen: false
    };
  }

  

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand>
            <span><h1>Expense DashBoard</h1></span>
          </NavbarBrand>
        </Container>
      </Navbar>
    );
  }
}

export default Header;

