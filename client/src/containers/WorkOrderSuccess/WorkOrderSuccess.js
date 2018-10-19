import React, {Component} from "react";
import Aux from "../../hoc/Aux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";



class WorkOrderSuccess extends Component {
    
    render () {

        return (

            <Aux>
                <p> Sucess! Thank you for submitting work order </p>
            </Aux>
        );
    }

}



export default withRouter(connect(null, null)(WorkOrderSuccess));