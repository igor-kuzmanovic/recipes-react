import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { deleteIngredient } from "../../actions/ingredient/delete";
import { ConfirmButton, BackButton } from "../form";
import { ErrorAlert } from "../misc";

class IngredientDelete extends React.Component {
    onDeleteClick = () => {
        this.props.deleteIngredient(this.props.match.params.id);
    };

    render() {
        const { deleted, isLoading, error } = this.props;

        if (deleted) {
            return <Redirect to="/ingredients" />;
        }

        return (
            <div className="mx-auto col-md-6 col-lg-4">
                <h3 className="my-3 text-center">
                    Are you sure you want to delete this ingredient?
                </h3>
                <div className="row mb-3 mt-5">
                    <div className="col text-left">
                        <BackButton link="/ingredients" />
                    </div>
                    <div className="col text-right">
                        <ConfirmButton
                            onClick={this.onDeleteClick}
                            disabled={isLoading}
                        />
                    </div>
                </div>
                <ErrorAlert error={error} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.ingredients.isLoading,
        error: state.ingredients.error,
        deleted: state.ingredients.deleted
    };
};

const mapDispatchToProps = {
    deleteIngredient
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IngredientDelete);
