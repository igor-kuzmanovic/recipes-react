import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { deleteCategory } from "../../actions/category/delete";
import { ConfirmButton, BackButton } from "../form";
import { ErrorAlert } from "../misc";

class CategoryDelete extends React.Component {
    onDeleteClick = () => {
        this.props.deleteCategory(this.props.match.params.id);
    };

    render() {
        const { deleted, isLoading, error } = this.props;

        if (deleted) {
            return <Redirect to="/categories" />;
        }

        return (
            <div className="mx-auto col-md-6 col-lg-4">
                <h3 className="my-3 text-center">
                    Are you sure you want to delete this category?
                </h3>
                <div className="row mb-3 mt-5">
                    <div className="col text-left">
                        <BackButton link="/categories" />
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
        isLoading: state.categories.isLoading,
        error: state.categories.error,
        deleted: state.categories.deleted
    };
};

const mapDispatchToProps = {
    deleteCategory
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryDelete);
