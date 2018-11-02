import React from "react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //   user: {
      //     email: "",
      //     username: "",
      //     password: "",
      //     userType: ""
      //   },
      //   submitted: false
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Welcome Back You!</h2>
      </div>
    );
  }
}

export default Dashboard;
