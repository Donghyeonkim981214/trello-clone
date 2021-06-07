import _ from 'lodash'
import React, { Component } from 'react'
import {
  Container,
  Dropdown,
  Menu,
  Visibility,
} from 'semantic-ui-react'

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '2em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
  backgroundColor: 'teal'
}

const fixedMenuStyle = {
  backgroundColor: 'teal',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}

class StickyLayout extends Component {
  state = {
    menuFixed: false,
    overlayFixed: false,
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  handleOverlayRef = (c) => {
    const { overlayRect } = this.state

    if (!overlayRect) {
      this.setState({ overlayRect: _.pick(c.getBoundingClientRect(), 'height', 'width') })
    }
  }

  stickOverlay = () => this.setState({ overlayFixed: true })

  stickTopMenu = () => this.setState({ menuFixed: true })

  unStickOverlay = () => this.setState({ overlayFixed: false })

  unStickTopMenu = () => this.setState({ menuFixed: false })

  render() {
    const { menuFixed } = this.state
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
        <Menu.Menu position='right'>
            <Menu.Item
                name='logout'
                onClick={this.props.logout}
            />
        </Menu.Menu>
    )
  
      const guestLinks = (
        <Menu.Menu>
                <Dropdown text='GUEST MENU' pointing className='link item'>
                  <Dropdown.Menu>
                  <Link to="/register" className="nav-link"><Dropdown.Item text="Sign Up" style={{color: "black"}}></Dropdown.Item></Link>
                  <Link to="/login" className="nav-link"><Dropdown.Item text="Log In" style={{color: "black"}}></Dropdown.Item></Link>
                  </Dropdown.Menu>
                </Dropdown>
        </Menu.Menu>
      );

    return (
      <div>
        {/* Heads up, style below isn't necessary for correct work of example, simply our docs defines other
            background color.
          */}
        <style>
          {`
          html, body {
            background: #fff;
          }
        `}
        </style>

        {/* Attaching the top menu is a simple operation, we only switch `fixed` prop and add another style if it has
            gone beyond the scope of visibility
          */}
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu
            borderless
            fixed={menuFixed ? 'top' : undefined}
            style={menuFixed ? fixedMenuStyle : menuStyle}
            inverted
          >
            <Container text>
              <Menu.Item header>DRELLO</Menu.Item>
              <Link to="/register"><Menu.Item>BoardList</Menu.Item></Link>

              <Menu.Menu position='right'>
              {isAuthenticated ? authLinks : guestLinks}
              </Menu.Menu>

            </Container>
          </Menu>
        </Visibility>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
export default connect(mapStateToProps, { logout })(StickyLayout);