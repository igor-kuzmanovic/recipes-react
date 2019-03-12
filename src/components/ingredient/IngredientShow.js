import React from "react";
import { connect } from "react-redux";
import { fetchIngredient, reset } from "../../actions/ingredient/show";
import requireAuth from "../requireAuth";
import { BackButton } from "../form";
import { ErrorAlert, Spinner } from "../misc";

class IngredientShow extends React.Component {
    componentDidMount() {
        this.props.fetchIngredient(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const { ingredient, isLoading, error } = this.props;

        return (
            <div>
                {ingredient && (
                    <h3 className="my-3 text-center">
                        <strong>{ingredient.name}</strong>{" "}
                        <Spinner isLoading={isLoading} />
                    </h3>
                )}
                <BackButton link="/ingredients" />
                <ErrorAlert error={error} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: state.ingredients.isLoading,
        error: state.ingredients.error,
        ingredient: state.ingredients.items[ownProps.match.params.id]
    };
};

const mapDispatchToProps = {
    fetchIngredient,
    reset
};

export default requireAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(IngredientShow)
);
