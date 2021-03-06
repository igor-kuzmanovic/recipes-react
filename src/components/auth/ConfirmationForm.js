import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form } from "react-bootstrap";
import { Input, SubmitButton } from "../form";

class ConfirmationForm extends React.Component {
    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    component={Input}
                />
                <Field
                    label="Confirmation Token"
                    name="confirmationToken"
                    type="confirmationToken"
                    placeholder="Enter your confirmation token"
                    component={Input}
                />
                <div className="text-center my-4">
                    <SubmitButton disabled={this.props.isSubmitDisabled} />
                </div>
            </Form>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if (!formValues.email) {
        errors.email = "You must enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
        errors.email = "Email is not in the valid format";
    } else if (formValues.email.length > 180) {
        errors.email = "Email cannot be longer than 180 characters";
    }
    if (!formValues.confirmationToken) {
        errors.confirmationToken = "You must enter your confirmation token";
    } else if (formValues.confirmationToken.length !== 30) {
        errors.confirmationToken =
            "Confirmation token is not in the valid format";
    }
    return errors;
};

export default reduxForm({
    form: "confirmationForm",
    validate
})(ConfirmationForm);
