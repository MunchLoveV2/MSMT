import axios from "axios";
import * as actionTypes from "./actionTypes";

// puts the info of the user that is logged in into Redux
export const authSuccess = (username, password, email, id) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    username: username,
    password: password,
    email: email,
    userId: id
  };
};

export const authLogout = (username, password, email) => {
  //removes data from the local storage
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
  return {
    //changes these to null in the store
    type: actionTypes.AUTH_LOGOUT,
    username: username,
    password: password,
    email: email
  };
};

//error message comes from passport
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

// **WARNING - incoming long lines of code~~~~~!!!~!~!~!~!~
export const auth = (username, password, email, userType, isSignup) => {
  return dispatch => {
    const authData = {
      username: username,
      password: password,
      email: email,
      userType: userType
    };

    // url route depends on whether the user is logging in, or signing up
    let url = "/login";
    if (isSignup) {
      url = "/signup";
    }

    axios
      .post(url, authData)
      .then(response => {
        //puts user information into local storage after authentication
        localStorage.setItem("token", response.data.password);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("userId", response.data.id);

        //if there is no response, it will dispatch a failure (see below)
        if (response.data.username) {
          dispatch(
            authSuccess(
              response.data.username,
              response.data.password,
              response.data.email,
              response.data.id
            )
          );

          dispatch(authfetchUserPermissions(response.data.id));

          //this block of code below sets up user permissions when an account is created
          // first checks if the user is registering
          if (url === "/signup") {
            //grabs the userID of the authenticated user
            let userPermissionsData = {
              UserinfoId: response.data.id
            };

            //grabs the userType (admin, supervisor, user, etc)
            const userType = response.data.userType;

            //looks in the UserTypes table to grab the specific permissions based on the userType
            axios.get("/api/usertypes/" + userType).then(response => {
              //once we have the permissions, we add it to the userPermissionsData object above
              userPermissionsData.permissions =
                response.data.defaultPermissions;

              //and then we post it to the userPermissions table
              axios
                .post("/api/userpermissions", userPermissionsData)
                .then(response => {
                  console.log(response.data);
                });
            });
          }
        } else {
          //response.data.message is given to us from passport
          dispatch(authFail(response.data.message));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};

export const authfetchUserPermissions = userId => {
  return dispatch => {
    const url = "/api/userpermissions/" + userId;
    axios.get(url).then(response => {
      dispatch(
        authGetUserPermissions(
          response.data.userPermissions,
          response.data.userType
        )
      );
    });
  };
};

//this automatically logs a user in by checking local storage
//allows for persistent login (i.e. if the browser is closed)
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const username = localStorage.getItem("username");
      const userId = localStorage.getItem("userId");

      dispatch(authSuccess(username, token, null, userId));
      dispatch(authfetchUserPermissions(userId));
    }
  };
};

export const authGetUserPermissions = (userPermissions, userType) => {
  return {
    type: actionTypes.AUTH_GET_USER_PERMISSIONS,
    userPermissions: userPermissions,
    userType: userType
  };
};
