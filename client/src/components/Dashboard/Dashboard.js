import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";

class Dashboard extends React.Component {
  componentDidMount() {
    //renderWorkOrders has an axios get request, that hits the "api/workorders" route
    //the function will then dispatch "getWorkOrders" (see store => actions => workOrders)
    //getWorkOrder puts work order data in the redux store
    const query = "/api/workorders";
    this.props.renderWorkOrders(query);
  }

  render() {
    let workOrdersData = [];

    //data needs to be loaded before anything can be rendered onto the page
    if (!this.props.workOrders[0]) {
    } else {
      console.log(
        "HELLLLOPPOOOOOIGEOHHP>>>>>>",
        this.props.workOrders[0].workOrderAssignment.UserinfoId
      );
      //once data is stored in the redux store.... via props.renderWorkOrders, we can access it, and iterate over it
      const userId = localStorage.getItem("userId");
      console.log("USERRRRRRID>>>>>", userId);
      this.props.workOrders.forEach(function(workOrder) {
        if (workOrder.workOrderAssignment.UserinfoId === userId) {
          workOrdersData.push(workOrder);
        } else {
          console.log("no work orders associated with your user");
        }
      });
      // let myWorkOrders = this.props.workOrders.filter(
      //   workOrder => workOrder.workOrderAssignment.UserinfoId === userId
      // );

      //   workOrdersData.push(myWorkOrders);
      // }

      const user = localStorage.getItem("username");
      const d = new Date();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];

      const month = months[d.getMonth()];
      const day = days[d.getDay()];
      const date = d.getDate();
      const year = d.getFullYear();
      const hour = d.getHours();
      const minute = d.getMinutes();

      // let dateTime = month + "/" + day + "/" + year;
      return (
        <div className="col-md-6 center">
          <h2>Welcome Back {user}!</h2>
          <h3>
            Today is {day}, {month}/{date}/{year} and it is currently {hour}:
            {minute}
          </h3>
          <h3>
            You have the following items on your to-do list today:
            {workOrdersData}
          </h3>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    workOrders: state.workOrders.workOrders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    renderWorkOrders: query => dispatch(actions.renderWorkOrders(query))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
