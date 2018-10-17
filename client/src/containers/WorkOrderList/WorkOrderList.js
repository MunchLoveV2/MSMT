/* import React, {Component} from "react";
import Aux from "../../hoc/Aux";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "axios"; 
import {withRouter} from "react-router-dom";

import {Form, Button} from 'react-bootstrap';


class WorkOrderList extends Component {
    
    componentDidMount() {

        const query = "/api/workorders";
        this.props.renderWorkOrders(query);
    } 

    render () {

        return (


            <Aux>
                <p> lol </p>
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        userID: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        renderWorkOrders: (query) => dispatch(actions.auth( username, password, email, isSignup ))
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkOrderList)); */