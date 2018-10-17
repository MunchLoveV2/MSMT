import React from 'react';
import {Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';


function FormInputs(props) {

  return (
    <div>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={4}>
            {props.heading}
          </Col>
          <Col sm={4}>
            <FormControl type={props.type} placeholder={props.placeholder} onChange = {props.changed} />
          </Col>
        </FormGroup>

    </div>
  );
}

export default FormInputs;