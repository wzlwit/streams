import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {//deconstructure formProps
        const className = `field ${meta.error&&meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />{/*  {...formProps.input}, ... to list values of an object or array*/}
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = (formValues) => {//because redux-form (handleSubmit) takes care of 'event', this function will not receive 'event' anymore
        //e.preventDefault(); not necessary anymore because of redux-form (this.props.handleSubmit) takes care of it 
        console.log(formValues);
    }

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary" >Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    console.log(formValues);
    const error = {};
    if (!formValues.title) {
        error.title = "You must enter a title";
    };
    if (!formValues.description) {
        error.description = "You must enter a description";
    };
    return error;
}

export default reduxForm(
    {
        form: 'streamCreate',//form name
        validate //same as {validate: validate},provide the function for validation and formValues are passed in as args, 
    }
)(StreamCreate);