import React from "react";
import PropTypes from "prop-types";
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import _ from 'lodash';
import Alert from 'react-s-alert';
import { Link } from 'react-router-dom';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import { loginUser } from "actions/auth";
import ReactLoader from 'views/ReactLoader';
import VerificationPage from "./VerificationPage";
import ResetPassword from './ResetPassword';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: 'cardHidden',
      email: '',
      emailState: '',
      password: '',
      passwordState: '',
      openVerificationModal: false,
      loading: false,
      disabled: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ cardAnimaton: '' });
    }, 200);
  }

  verifyEmail(value) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRex.test(value);
  }

  verifyLength(value, length) {
    return value.length >= length;
  }

  login = () => {
    if (this.state.emailState === 'success' && this.state.passwordState === 'success') {
      this.setState({ loading: true, disabled: true }, () => {
        this.props.loginUser(this.state, (response) => {
          if (response) {
            if (response.status === 200) {
              this.props.history.push('/');
            } else {
              const newState = { loading: false, disabled: false };

              if (response.data.message === 'User is not confirmed.') {
                newState.openVerificationModal = true;
              } else {
                Alert.error(response.status === 500 ?
                  'Cannot connect to server' : 'Your email or password is incorrect',
                  { effect: 'bouncyflip' },
                );
              }

              this.setState(newState);
            }
          }
        });
      });
    }
  }

  loginClick = () => {
    const newState = {};

    if (this.state.emailState === '') {
      newState.emailState = 'error';
    }

    if (this.state.passwordState === '') {
      newState.passwordState = 'error';
    }

    this.setState(newState, this.login);
  }

  change(event, stateName) {
    const { value } = event.target;
    switch (stateName) {
      case 'email':
        this.setState({
          [stateName]: value,
          [`${stateName}State`]: this.verifyEmail(value) ? 'success' : 'error',
        });
        return;
      case 'password':
        this.setState({
          [stateName]: value,
          [`${stateName}State`]: _.isEmpty(value) ? 'error' : 'success',
        });
        return;
      default:
        return;
    }
  }

  render() {
    const { classes, history } = this.props;

    return (
      <div className={classes.content}>
        <div className={classes.container}>
          {this.state.loading && <ReactLoader loading={this.state.loading} />}
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={5}>
              <form>
                <Card login className={classes[this.state.cardAnimaton]}>
                  <CardHeader className={classes.headerWrapper}>
                    <h3 className={classes.cardTitle}>Log in</h3>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Email"
                      success={this.state.emailState === "success"}
                      error={this.state.emailState === "error"}
                      id="email"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        onChange: event => this.change(event, "email"),
                        type: "email"
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      success={this.state.passwordState === "success"}
                      error={this.state.passwordState === "error"}
                      id="password"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        onChange: event => this.change(event, "password"),
                        type: "password"
                      }}
                    />
                    <ResetPassword classes={classes} />
                    <div className={classes.alertWrapper}>
                      <span>
                        {`You don't have an account yet? `}
                      </span>
                      <Link to="/register" className={classes.alertLink}>Register a new account</Link>
                    </div>
                    {this.state.openVerificationModal && <VerificationPage page="login" email={this.state.email} classes={classes} history={history} />}
                  </CardBody>
                  <CardFooter className={classes.footerWrapper}>
                    <Button
                      color="rose"
                      disabled={this.state.disabled}
                      onClick={this.loginClick}
                    >
                      Log in
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </GridItem>
          </GridContainer>
        </div>
        <Alert stack />
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(loginPageStyle),
  connect(null, { loginUser })
)(LoginPage);
