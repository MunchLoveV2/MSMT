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
    //renderWorkOrders has an axios get request, that hits the "api/workorders" route
    //the function will then dispatch "getWorkOrders" (see store => actions => workOrders)
    //getWorkOrder puts work order data in the redux store
    const query = "/api/workorders";
    this.props.renderWorkOrders(query);
    axios("/api/users", {
      method: "GET"
    })
      .then(response => {
        const users = response.data.map(user => {
          return {
            label: user.username,
            value: user.id
          };
        });
        this.setState({ users: users });
      })
      .catch(error => {
        throw error;
      });
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
    let workData;
    let myWorkOrders = [];
    if (!this.props.workOrders[0] || !this.state.users) {
      workData = <h1> loading </h1>;
    } else {
      // console.log(this.props.workOrders[0].workOrderAssignment.UserinfoId);
      console.log(this.props.workOrders[0].workOrderAssignment);
      this.props.workOrders.forEach(function(element) {
        // console.log(element.workOrderAssignment.UserinfoId);
        // console.log("HI THIS IS MY USERID>>>>>>", idUser);
        if (element.workOrderAssignment.UserinfoId == idUser) {
          myWorkOrders.push(element);
          console.log(myWorkOrders);
        } else {
          console.log("this doesn't belong to you");
        }
      });
      // myWorkOrders = this.props.workOrders.filter(
      //   workOrder => workOrder.workOrderAssignment.UserinfoId === idUser
      // );
      console.log(myWorkOrders);

      workData = myWorkOrders.map((item, i) => {
        return (
          <tr>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.category}</td>
            <td>{item.location}</td>
            <td>{item.status}</td>
          </tr>
        );
      });
    }

    // let dateTime = month + "/" + day + "/" + year;
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
          <tbody>{workData}</tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.auth.users,
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