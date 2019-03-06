import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions/';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {

    onSubmit = (formValues) => {//because redux-form (handleSubmit) takes care of 'event', this function will not receive 'event' anymore
        //e.preventDefault(); not necessary anymore because of redux-form (this.props.handleSubmit) takes care of it 
        this.props.createStream(formValues);
    };

    render() {
        return (
           <div>
               <h3>Create a Stream</h3>
               <StreamForm onSubmit={this.onSubmit}/>
           </div>
        );
    }
}


export default connect(null, { createStream })(StreamCreate); //connect() is the outer function