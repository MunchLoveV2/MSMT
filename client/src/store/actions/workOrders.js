import * as actionTypes from "./actionTypes";
import axios from "axios";

//puts all the workorders from SQL into Redux (see renderWorkOrders)
export const getWorkOrders = workOrders => {
  return {
    type: actionTypes.GET_WORK_ORDERS,
    workOrders: workOrders
  };
};

//puts the current workorder (that is selected from the table) into Redux
export const getCurrentWorkOrder = currentWorkOrder => {
  return {
    type: actionTypes.GET_CURRENT_WORK_ORDER,
    currentWorkOrder: currentWorkOrder
  };
};

// we get the currentWorkOrderId thanks to the work order data we previously set into Redux
// see handleWorkOrderEdit in containers => WorkOrderList => WorkOrderList
export const handleWorkOrderCompleted = currentWorkOrderId => {
  let updatedStatus = {
    status: "completed"
  };

  let url = "/api/workorders/" + currentWorkOrderId;
  console.log(url);
  return dispatch => {
    console.log("progress");
    console.log(url);
    axios
      .put(url, updatedStatus)
      .then(response => {
        url = "/api/workorders/";
        console.log(response);
        dispatch(renderWorkOrders(url));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

// action used to assign work orders to different users
// WARNING: the below code is long and complicated
export const assignWorkOrders = workOrderAssignmentData => {
  const url = "/api/workorderassignments";

  // we first get all of the data in SQL's WorkOrderAssignments table
  // we need to do this because we need to check if a workorder assignment already exists
  return dispatch => {
    axios(url, {
      method: "GET"
    })
      .then(response => {
        // workOrderAssignmentData is given to us from container => WorkOrderList => WorkOrderList (line 96)
        // here, we use the map method to structure it into array because we need to label whether the assigment is a POST or PUT
        /*         
                        EXAMPLE STRUCTURE: 
                        [
                          {type: PUT,
                          data: ...},
                          {type: pOST,
                          data: ...}
                        ] */
        const WorkOrderRequests = workOrderAssignmentData.map(assignment => {
          // checks if a workorder assignment already exists for the work order
          const WorkOrderId = response.data.find(
            workOrder => workOrder.WorkorderId === assignment.workOrderId
          );

          //if it already exists in the table, the type is PUT
          if (WorkOrderId) {
            return {
              type: "PUT",
              data: {
                UserinfoId: assignment.userId,
                WorkorderId: assignment.workOrderId
              }
            };
          } else {
            //if it DOESN'T exists in the table, the type is POST
            return {
              type: "POST",
              data: {
                UserinfoId: assignment.userId,
                WorkorderId: assignment.workOrderId
              }
            };
          }
        });

        // now that we have labeled the request type (POST or PUT) for each request,
        // we iterate over our structured array and send the requests to the backend via axios
        WorkOrderRequests.forEach(request => {
          // if the request type is a PUT, then we PUT
          if (request.type === "PUT") {
            axios.put(url, request.data).then(response => {
              console.log(response.data);
              dispatch(
                sendWorkOrder(
                  response.data.Userinfo.phoneNumber,
                  response.data.Userinfo.username,
                  response.data.Workorder.location
                )
              );
              dispatch(updateWorkOrderStatus(response.data.WorkorderId));
            });
          } else {
            // if the request type is a POST, then we POST
            axios.post(url, request.data).then(response => {
              console.log(response.data);
              console.log(
                response.data.Userinfo.phoneNumber,
                response.data.Userinfo.username
              );
              dispatch(
                sendWorkOrder(
                  response.data.Userinfo.phoneNumber,
                  response.data.Userinfo.username,
                  response.data.Workorder.location
                )
              );

              // in addition, if this is a newly posted work assignment, we need to set
              // the work order's status from pending => assigned
              dispatch(updateWorkOrderStatus(response.data.WorkorderId));
            });
          }
        });
      })
      .catch(error => {
        throw error;
      });
  };
};

// renderWorkOrders is used to show all the work orders in the work order table
// see line 24 (under componentDidMount) in containers => WorkOrderList => WorkOrderList
export const renderWorkOrders = query => {
  return dispatch => {
    axios
      .get(query)
      .then(response => {
        console.log(response.data);
        dispatch(getWorkOrders(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const sendWorkOrder = (phoneNumber, username, location) => {
  const url = "/api/twilio";
  return dispatch => {
    axios
      .post(url, {
        phoneNumber: phoneNumber,
        username: username,
        location: location
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const updateWorkOrderStatus = workOrderId => {
  return dispatch => {
    let updatedStatus = {
      status: "assigned"
    };

    let url = "/api/workorders/" + workOrderId;

    console.log(url);

    axios
      .put(url, updatedStatus)
      .then(response => {
        console.log(response.data);
        let url = "/api/workorders";
        dispatch(renderWorkOrders(url));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
