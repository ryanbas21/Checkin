import React from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import Router from 'next/router';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTeam, createOrJoinSelector } from '../createTeam.reducer';

const style = {
  height: 1000,
  width: 1200,
  margin: 20,
  textAlign: 'center',
  paper: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
class CreateTeam extends React.Component {
  state = {
    finished: false,
    stepIndex: 0,
    team: {
      name: undefined,
      invites: [],
    },
  };
  saveTeam = e => {
    const { actions } = this.props;
    const teamNameExists = R.reject(
      team => team.name === this.state.team.name,
      this.props.team.teams,
    );
    if (teamNameExists) {
      return actions.addTeam({ name: this.state.team.name, uid: this.props.team.uid });
    }
    this.state.stepIndex -= 1;
    return this.setState({ ...this.state, error: true });
  };
  handleTeamName = e => {
    this.setState({
      ...this.state,
      team: {
        name: e.target.value,
      },
    });
  };
  handleNext = e => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  renderStepActions(step) {
    const { stepIndex } = this.state;
    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label={stepIndex === 1 ? 'Finish' : 'Next'}
          disableTouchRipple
          disableFocusRipple
          onClick={stepIndex === 0 ? this.saveTeam : Router.push('/')}
          primary
          onTouchTap={this.handleNext}
          style={{ marginRight: 12 }}
        />
        {step > 0 &&
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple
            disableFocusRipple
            onTouchTap={this.handlePrev}
          />}
      </div>
    );
  }

  render() {
    const { finished, stepIndex } = this.state;
    return (
      <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
        <Paper style={style.paper}>
          <Stepper activeStep={stepIndex} orientation="vertical">
            <Step>
              <StepLabel>Create Your Scrum Team</StepLabel>
              <StepContent>
                {this.state.error ? <div>Name Taken</div> : <div />}
                <TextField
                  hintText="Team Name"
                  errorText="This field is required"
                  value={this.state.team.name}
                  onChange={this.handleTeamName}
                />
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Invite Teammates</StepLabel>
              <StepContent>
                <Subheader>Or Hit Next to skip</Subheader>
                <TextField hintText="Enter Email" errorText="" />
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
          </Stepper>
          {finished && <p style={{ margin: '20px 0', textAlign: 'center' }} />}
        </Paper>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  team: createOrJoinSelector(state),
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addTeam }, dispatch),
});

CreateTeam.propTypes = {
  team: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    addTeam: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);
