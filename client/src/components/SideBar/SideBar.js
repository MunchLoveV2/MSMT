// import React from "react";
// import Sidebar from "react-sidebar";
// import SidebarContent from "./SideBarContent";

// const mql = window.matchMedia(`(min-width: 800px)`);

// class NavBar extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       docked: mql.matches,
//       open: false
//     };

//     this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
//     this.toggleOpen = this.toggleOpen.bind(this);
//     this.onSetOpen = this.onSetOpen.bind(this);
//   }

//   componentWillMount() {
//     mql.addListener(this.mediaQueryChanged);
//   }

//   componentWillUnmount() {
//     mql.removeListener(this.mediaQueryChanged);
//   }

//   onSetOpen(open) {
//     this.setState({ open });
//   }

//   mediaQueryChanged() {
//     this.setState({
//       docked: mql.matches,
//       open: false
//     });
//   }

//   toggleOpen(ev) {
//     this.setState({ open: !this.state.open });

//     if (ev) {
//       ev.preventDefault();
//     }
//   }

//   render() {
//     const sidebar = <SidebarContent />;

//     const sidebarProps = {
//       sidebar,
//       docked: this.state.docked,
//       open: this.state.open,
//       onSetOpen: this.onSetOpen
//     };

//     return <Sidebar {...sidebarProps} pullRight />;
//   }
// }

// export default NavBar;
