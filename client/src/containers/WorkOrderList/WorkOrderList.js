import React, {Component} from "react";
import Aux from "../../hoc/Aux";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import WorkOrderTable from "../../components/WorkOrderTable/WorkOrderTable";
import {withRouter} from "react-router-dom";



class WorkOrderList extends Component {
    
    componentDidMount() {

        const query = "/api/workorders";
        this.props.renderWorkOrders(query);
    } 

    render () {

        let workOrders;

        if (!this.props.workOrders) {
            workOrders = <h1> loading  </h1>
            
        } else {

            console.log(this.props.workOrders[0].workOrderImage)

        


            workOrders = this.props.workOrders.map(workOrder => {
                return {
                    issue: workOrder.title,
                    category: workOrder.category,
                    location: workOrder.location,
                    dateCreated: workOrder.createdAt
                }
            })
            return (
                <WorkOrderTable workOrders = {workOrders}/>
            );
        }

    

        return (


            <Aux>
                {workOrders}
    
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        workOrders: state.workOrders.workOrders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        renderWorkOrders: (query) => dispatch(actions.renderWorkOrders( query ))
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkOrderList));