import React, { Component } from 'react';
import Aux  from "../Aux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import NavBar from "../../components/UI/SideBar/SideBar";


class Layout extends Component {

    render () {

        return (
            <Aux>
                <NavBar />
                <main>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.password !== null
    }
}


export default withRouter(connect(mapStateToProps)(Layout));