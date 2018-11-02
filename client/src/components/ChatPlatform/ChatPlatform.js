import React, { Component } from "react";
import { Widget, toggleWidget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
// import axios from "axios";

const boxBorder = {
  border: "1px transparent black",
  margin: "0px",
  padding: "0px"
};

const card = {
  width: "100%",
  height: "100%"
};

const cardBody = {
  width: "100%",
  background: "rgb(0, 0, 0, 0.01)",
  padding: "40px 20px 20px 20px",
  height: "100%"
};
const user = localStorage.getItem("username");
console.log("user", user);

export default class Chat extends Component {
  state = {
    isConnected: false,
    messages: [],
    connection: null
  };

  addUser() {
    let name = localStorage.getItem("username");
    console.log(name);
  }

  componentWillMount() {
    window.removeEventListener("beforeunload", this.onUnload);
  }

  componentDidMount() {
    toggleWidget();

    let port;
    if (window["location"]["port"] === "") {
      port = ":" + window["location"]["port"];
    } else {
      port = ":3000";
    }
    let wsProtocol = "ws://";
    if (window.location.protocol.substr(0, 5) === "https") {
      wsProtocol = "wss://";
    }
    let webSocketString =
      wsProtocol + window["location"]["hostname"].toString() + port + "/chat";
    console.log(webSocketString);

    let connection = new WebSocket(webSocketString);
    connection.onopen = this.onOpen;
    connection.onerror = this.onError;
    connection.onmessage = this.onMessage;

    this.setState({
      connection: connection
    });

    window.addEventListener("beforeunload", this.onUnload);
  }

  onOpen = () => {
    // connection is opened and ready to use
    console.log("connection.onopen happening");
    this.setState({
      isConnected: true
    });
  };

  onError = error => {
    // an error occurred when sending/receiving data
    console.log("connection.onerror: " + error);
  };

  onMessage = message => {
    addResponseMessage(message.data);
    console.log(`New message incoming! ${message.data}`);
  };

  handleNewUserMessage = newMessage => {
    console.log(`New message outgoing! ${newMessage}`);
    console.log(newMessage);
    if (!this.state.isConnected) {
      return;
    }

    this.state.connection.send(
      localStorage.getItem("username") + ": " + newMessage
    );
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="LiveChat"
                style={{
                  justifyContent: "center",
                  width: "256px",
                  height: "150px"
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xl-2" style={boxBorder} />

            <div className="col-xl-7 rounded-0" style={boxBorder}>
              <div className="card rounded-0" style={card}>
                <div className="card-header text-center font-weight-bold rounded-0" />
                <div className="card-body rounded-0" style={cardBody} />
              </div>
            </div>

            <div className="col-xl-3 rounded-0" style={boxBorder}>
              <Widget
                handleNewUserMessage={this.handleNewUserMessage}
                title="Live Chat OHOH"
                subtitle={user}
                senderPlaceHolder="Enter your message here!"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
