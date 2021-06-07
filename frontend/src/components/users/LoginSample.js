import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Login extends Component{

    state = {
        username: '',
        password: '',
      };
    
    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
      };
    
    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
      };
    
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
          }
        const { username, password } = this.state;
        return(
            <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
                </Header>
                <Form size='large' onSubmit={this.onSubmit}>
                    <Segment stacked>
                    <Form.Input 
                        fluid 
                        icon='user' 
                        iconPosition='left' 
                        placeholder='user' 
                        name="username" 
                        onChange={this.onChange} 
                        value={username}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name="password"
                        onChange={this.onChange}
                        value={password}
                    />

                    <Button color='teal' type="submit" fluid size='large'>
                        Login
                    </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <Link to="/register">Sign Up</Link>
                </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
  
export default connect(mapStateToProps, { login })(Login);