import React from 'react';
import {FormattedMessage} from "react-intl"; 

import {Navbar} from 'reactstrap';

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
       
        <h1><FormattedMessage id="nav.dashboard" defaultMessage="Expense Dashboard" /></h1>
      </Navbar>
    );
  }
}

export default Header;

