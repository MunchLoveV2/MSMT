import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout";
import {Route, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import Auth from "./containers/Auth/Auth"
import WorkOrder from "./containers/WorkOrder/WorkOrder"
import Guest from "./containers/Guest/Guest"
import WorkOrderList from "./containers/WorkOrderList/WorkOrderList"
import WorkOrderSuccess from "./containers/WorkOrderSuccess/WorkOrderSuccess"
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
          <Route path ="/guest" exact component = {Guest}/>
          <Route path ="/create" exact component = {WorkOrder}/>
          <Route path ="/workorders" exact component = {WorkOrderList}/>
          <Route path ="/success" exact component = {WorkOrderSuccess}/>
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
