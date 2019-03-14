import React from "react";
import { connect } from "react-redux";
import { confirmRegistration, reset } from "../../actions/auth/confirmRegistration";
import ConfirmationForm from "./ConfirmationForm";
import { ErrorAlert, Spinner } from "../misc";

class ConfirmRegistration extends React.Component {
    componentWillUnmount() {
        this.props.reset();
    }

    onSubmit = formValues => {
        this.props.confirmRegistration(formValues, () => this.props.history.push("/"));
    };

    render() {
        const { isLoading, error } = this.props;

        return (
            <div>
                <h3 className="my-3 text-center">
                    Confirm your registration <Spinner isLoading={isLoading} />
                </h3>
                <h4 className="text-center">
                    Please check your email
                </h4>
                <ConfirmationForm
                    onSubmit={this.onSubmit}
                    isSubmitDisabled={isLoading}
                />
                <ErrorAlert error={error} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading,
        error: state.auth.error
    };
};

const mapDispatchToProps = {
    confirmRegistration,
    reset
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmRegistration);
