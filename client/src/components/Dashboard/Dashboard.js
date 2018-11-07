import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";
import { Table } from "reactstrap";
import axios from "axios";
import { runInNewContext } from "vm";

class Dashboard extends React.Component {
  state = {
    users: null
  };
  componentDidMount() {
    const query = "/api/workorders";
    this.props.renderWorkOrders(query);
  }

  render() {
    const user = localStorage.getItem("username");
    const idUser = localStorage.getItem("userId");
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
    console;
    let dashboardData;
    if (!this.props.workOrders[0] || !this.props.userId) {
      dashboardData = <h1> loading </h1>;
    } else {
      console.log(this.props.workOrders);
      dashboardData = this.props.workOrders.map(tableRow => {
        if (
          tableRow.workOrderAssignment &&
          tableRow.workOrderAssignment.UserinfoId ===
            parseInt(this.props.userId)
        ) {
          return (
            <tr>
              <td>{tableRow.id}</td>
              <td>{tableRow.title}</td>
              <td>{tableRow.category}</td>
              <td>{tableRow.location}</td>
              <td>{tableRow.status}</td>
            </tr>
          );
        }
      });
    }
    return (
      <div className="container col-md-6 center">
        <h2>Welcome Back {user}!</h2>
        <h3>
          Today is {day}, {month}/{date}/{year} and it is currently {hour}:
          {minute}
        </h3>
        <h3>You have the following items on your to-do list today:</h3>
        <Table hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Issue</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{dashboardData}</tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
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
