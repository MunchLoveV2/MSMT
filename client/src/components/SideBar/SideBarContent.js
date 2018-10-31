import React from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./TitlePanel";
import { Link } from "react-router-dom";

const styles = {
  sidebar: {
    width: 256,
    height: "100%"
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "#000000",
    textDecoration: "none"
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#000000"
  },
  content: {
    padding: "16px",
    height: "100%",
    backgroundColor: "white"
  }
};

const SidebarContent = props => {
  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;

  const links = [];

  return (
    <MaterialTitlePanel title="Menu" style={style}>
      <div style={styles.content}>
        <ul>
          <li style={styles.sidebarLink}>
            <Link to="/">Home</Link>
          </li>
          <li style={styles.sidebarLink}>
            <Link to="/create">Create Work Order</Link>
          </li>
          <li style={styles.sidebarLink}>
            <Link to="/chat">Live Chat</Link>
          </li>
        </ul>
        <div style={styles.divider} />
        {links}
      </div>
    </MaterialTitlePanel>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object
};

export default SidebarContent;
