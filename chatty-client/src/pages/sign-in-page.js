import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import PageHeader from 'components/page-header';
import SignInForm from 'components/sign-in-form';
import PageSpinner from 'components/common/page-spinner';

class SignInPage extends React.Component {
    componentDidMount() {
        if (localStorage.getItem('jwtToken')) {
            this.props.history.replace('/chat');
        }
    }

    componentWillUpdate() {
        if (localStorage.getItem('jwtToken')) {
            this.props.history.replace('/chat');
        }
    }

    render() {
        return (
            <div>
                <PageSpinner visible={this.props.loading} />
                <PageHeader items={[
                    <Link to="/" className="item">Home</Link>,
                    <Link to="/sign-in" className="item">Sign In</Link>,
                    <Link to="/sign-up" className="item">Sign Up</Link>
                ]} />

                <SignInForm loading={this.props.loading} errorsList={this.props.errorsList} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errorsList: state.authReducer.errorsList,
        loading: state.authReducer.loading
    };
};

export default connect(
    mapStateToProps
)(SignInPage);
