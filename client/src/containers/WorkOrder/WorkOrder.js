import React, {Component} from "react";
import Aux from "../../hoc/Aux";
import axios from "axios"; 
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import WorkOrderForm from "../../components/WorkOrderForm/WorkOrderForm";
import CameraApp from "../../components/CameraApp/CameraApp";



class WorkOrder extends Component {
    


    onTakePhoto = (dataUri) => {

        console.log(dataUri)


        let imageFile = {
            ...this.state.imageFile
        }
        
        imageFile.url = dataUri;

        this.setState({imageFile: imageFile});

    
      }


    // sends work order data to SQL via Sequelize
    // if no employee is logged in, the userID is, by default, set to "69"
    // otherwise, it grabs the userID via Redux (via mapStateToProps)
    
    workOrderSubmit = (value) => {
        
        const url = "/api/workorders";

        const workOrderData = {
            title: value.title,
            category: value.category,
            location: value.location,
        };

        let userID = 69

        if (this.props.userID) {
            userID = this.props.userID
        }


        workOrderData.UserinfoId = userID
        //workOrderData.workOrderImage = this.state.imageFile.url


        axios(url, {
            method: 'POST',
            data: workOrderData
          })
            .then(response => response.data)
            .catch(error => {
              throw error;
            });

    }

    render () {


        return (
            <Aux>   
                <WorkOrderForm workOrderSubmit = {this.workOrderSubmit}/>
                    
                <CameraApp
                    onTakePhoto ={this.onTakePhoto}/>
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        userID: state.auth.userId
    }
}



export default withRouter(connect(mapStateToProps)(WorkOrder));