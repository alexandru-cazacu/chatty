import React from "react";
import { Link } from "react-router-dom";
import HeaderWithDrawer from "../../components/header-with-drawer";
import InputField from "../../components/input-field";
import Button from "../../components/button";
import ErrorsList from "components/errors-list";

import store from "store";
import { signIn } from "action-creators";
import { connect } from "react-redux";

class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };

        this.handleStoreUpdate = this.handleStoreUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        store.subscribe(this.handleStoreUpdate);
    }

    componentDidMount() {
        this.handleStoreUpdate();
    }

    handleStoreUpdate() {
        if (localStorage.getItem("jwtToken")) {
            this.props.history.replace("/chat");
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit() {
        store.dispatch(signIn({
            username: this.state.username,
            password: this.state.password
        }));
    }

    render() {
        return (
            <div>
                <HeaderWithDrawer links={[
                    <Link to="/" className="text">Home</Link>,
                    <Link to="/sign-in" className="text">Sign In</Link>,
                    <Link to="/sign-up" className="text">Sign Up</Link>
                ]} />

                <div className="centered-card">
                    <h1 className='card-title'>Sign In</h1>
                    <InputField name='username' placeholder='Username...' onChange={this.handleChange.bind(this)} />
                    <InputField name='password' type='password' placeholder='Password...' onChange={this.handleChange.bind(this)} />
                    <Button value='Sign In' onClick={this.handleSubmit.bind(this)} />
                    <ErrorsList errors={this.props.errors} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors: [state.authReducer.errorMessage]
    };
};

export default connect(
    mapStateToProps
)(SignInPage);