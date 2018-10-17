import React, {Component} from "react";
import Aux from "../../hoc/Aux";
import axios from "axios"; 
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import FormInput from "../../components/UI/FormInputs/FormInputs";
import CameraApp from "../../components/CameraApp/CameraApp";

import {Form, Button} from 'react-bootstrap';


class WorkOrderForm extends Component {
    
    state = {
        workOrderForm: {
            title: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter a brief description'
                },
                value: ''
            },
            category: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Category'
                },
                value: ''
            },
            location: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Location'
                },
                value: ''
            }
        },
        imageFile: {
            url: ""
        }
    }

    onTakePhoto = (dataUri) => {

    
        //camera capture grabs dataUri of photo captured
        //then converts dataUri (string) to an image file

        fetch(dataUri)
        .then(res => res.blob())
        .then(blob => {

            function blobToFile(theBlob, fileName){
                //A Blob() is almost a File() - it's just missing the two properties below which we will add
                theBlob.lastModifiedDate = new Date();
                theBlob.name = fileName;
                return theBlob;
            }

            let workOrderImage = blobToFile(blob, "my-image.png");

            let imageFile = {
                ...this.state.imageFile
            }
            imageFile.url = workOrderImage;
    
            this.setState({imageFile: imageFile});
        })
    
      }

    //logic to set the state of whatever user types into the forms
    inputChangedHandler = (event, inputIdentifier) => {
        const workOrderForm = {
            ...this.state.workOrderForm
        };
        const workOrderFormElement = { 
            ...workOrderForm[inputIdentifier]
        };
        workOrderFormElement.value = event.target.value;
        workOrderForm[inputIdentifier] = workOrderFormElement;
        this.setState({workOrderForm: workOrderForm});
    }

    // sends work order data to SQL via Sequelize
    // if no employee is logged in, the userID is, by default, set to "69"
    // otherwise, it grabs the userID via Redux (via mapStateToProps)
    
    workOrderSubmit = () => {
        
        const url = "/api/workorders";

        const workOrderData = {};

        let userID = 69

        if (this.props.userID) {
            userID = this.props.userID
        }

        for (let formElementIdentifier in this.state.workOrderForm) {
            workOrderData[formElementIdentifier] = this.state.workOrderForm[formElementIdentifier].value;
        }

        workOrderData.UserinfoId = userID
        workOrderData.workOrderImage = this.state.imageFile.url

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
        const formElementsArray = [];
        for (let key in this.state.workOrderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.workOrderForm[key]
            });
        }

        let form = (
            formElementsArray.map(formElement => (
                <FormInput 
                    key={formElement.id}
                    heading = {formElement.id}
                    placeholder = {formElement.id}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))
        );


        return (
            <Aux>
                <Form>
                    {form}
                    <Button
                        onClick = {this.workOrderSubmit}> Submit </Button>
                </Form>
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



export default withRouter(connect(mapStateToProps)(WorkOrderForm));