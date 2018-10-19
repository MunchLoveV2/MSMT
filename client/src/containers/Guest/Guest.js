import React, {Component} from "react";
import Aux from "../../hoc/Aux";
import GuestAuth from "../../components/GuestAuth/GuestAuth";

import history from '../../history';


class Guest extends Component {

    // for now, just redirects a guest to the work order page
    guestAuthClick = (values) => {
        console.log(values)
        history.push('/create/');
    };



    render () {

        return (
            <Aux>
                <GuestAuth guestAuthClick = {this.guestAuthClick}/>
            </Aux>
        );
    }

}


export default Guest;