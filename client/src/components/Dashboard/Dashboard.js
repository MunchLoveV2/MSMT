import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";
import { Table } from "reactstrap";

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
    let workOrdersData = [];

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
    let workData = workOrdersData.map((item, i) => {
      return (
        <tr>
          <th scope="row" key={i} />
          <td>{item.id}</td>
          <td>{item.issue}</td>
          <td>{item.category}</td>
          <td>{item.location}</td>
          <td>{item.status}</td>
        </tr>
      );
    });

    // let dateTime = month + "/" + day + "/" + year;
    return (
      <div className="col-md-6 center">
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
