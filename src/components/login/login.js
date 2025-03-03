import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Router from 'next/router';
import FlatButton from 'material-ui/FlatButton';
import LoginButton from './signin-button/index';
import Loading from '../loading-icon';

const login = {
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  width: 500,
  height: 500,
};
const card = {
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};

const Login = props =>
  <Paper style={login} zDepth={5}>
    <Card>
      <CardHeader
        style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}
        title={'Sign In With Github'}
        showExpandableButton={false}
      />
      <CardText style={card}>
        {props.actions.error ? <div>{props.actions.error}</div> : <div />}
        <FlatButton target="_blank" onClick={props.actions.fetchLogin} icon={<LoginButton />} />
      </CardText>
    </Card>
  </Paper>;

Login.propTypes = {
  error: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    startLogin: PropTypes.func.isRequired,
    fetchLogin: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
  }).isRequired,
};
export default Login;
