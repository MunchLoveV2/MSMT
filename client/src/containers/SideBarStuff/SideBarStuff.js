// const mapStateToProps = state => {
//   return {
//     username: state.auth.username,
//     isAuth: state.auth.password !== null,
//     error: state.auth.error,
//     userPermissions: state.auth.userPermissions,
//     userTypes: state.auth.userTypes,
//     userId: state.auth.userId
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onAuth: (username, password, email, userType, isSignup) =>
//       dispatch(actions.auth(username, password, email, userType, isSignup)),
//     logOut: () => dispatch(actions.authLogout())
//   };
// };

// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(Auth)
// );

// <Sidebar userType={props.userTypes} />;
