import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout";
import {Route, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import Auth from "./containers/Auth/Auth"
import WorkOrderForm from "./containers/WorkOrderForm/WorkOrderForm"
import WorkOrderList from "./containers/WorkOrderList/WorkOrderList"
import * as actions from './store/actions/index';




class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Layout>
          <Route path ="/" exact component = {Auth}/>
          <Route path ="/create" exact component = {WorkOrderForm}/>
          <Route path ="/workorders" exact component = {WorkOrderList}/>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.password !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
