import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchIngredient, updateIngredient } from "../../actions/ingredient";
import IngredientForm from "./IngredientForm";
import ErrorAlert from "../misc/ErrorAlert";

class IngredientUpdate extends React.Component {
    componentDidMount() {
        this.props.fetchIngredient(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.updateIngredient(this.props.match.params.id, formValues);
    };

    render() {
        const { ingredient, updated, isLoading, error } = this.props;

        if (updated) {
            return <Redirect to={`/ingredients/${updated}`} />;
        }

        return (
            <div className="mx-auto col-md-6 col-lg-4">
                <h3 className="my-3 text-center">Update this ingredient</h3>
                {ingredient && (
                    <IngredientForm
                        initialValues={_.pick(ingredient, "name")}
                        onSubmit={this.onSubmit}
                        isSubmitDisabled={isLoading}
                    />
                )}
                <ErrorAlert error={error} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: state.ingredients.isLoading,
        error: state.ingredients.error,
        ingredient: state.ingredients.items[ownProps.match.params.id],
        updated: state.ingredients.updated
    };
};

const mapDispatchToProps = {
    fetchIngredient,
    updateIngredient
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IngredientUpdate);
