import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

export class GoogleAuth extends React.Component {
    state = { isSignedIn: null };

    componentDidMount() {
        // load client and auth2?
        window.gapi.load('client:auth2', () => {
            //initialize clinet
            window.gapi.client.init({
                client_id: '235468952329-a54mh0n835ie8ofnbcoapfs1o3rkdmpo.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = (isSignedIn) => { // => function will automatically bind this function
        if (isSignedIn){
            this.props.signIn();
        }else{
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button className="ui red google button" onClick={this.onSignInClick}>
                    <i className="google icon" />
                    Sign in with Google
                </button>
            );
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

export default connect(
    null,
    { signIn, signOut }
)(GoogleAuth);