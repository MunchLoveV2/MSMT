import React from 'react';
import {reduxForm, Field} from "redux-form";
import Aux from "../../hoc/Aux"; 


let WorkOrderForm = (props) => {

    const { handleSubmit } = props;
    return (
        <Aux>

            {/* handleSubmit is given to use by Redux Forms, it helps us 
            determine what happens after the form is submitted */}
            
            <form onSubmit= {handleSubmit(props.workOrderSubmit)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <Field name="title" component="input" type="text" />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <Field name="category" component="input" type="text" />
                </div>
                <div>
                    <label htmlFor="location">Location</label>
                    <Field name="location" component="input" type="text" />
                </div>

                <button type="submit">Submit</button>
            </form>
    

        </Aux>
    );
}
    

    
WorkOrderForm = reduxForm({
    form: "workOrderForm",
    destroyOnUnmount: false
})(WorkOrderForm)


export default WorkOrderForm;