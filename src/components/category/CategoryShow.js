import React from "react";
import { connect } from "react-redux";
import { fetchCategory, reset } from "../../actions/category/show";
import { BackButton } from "../form";
import { ErrorAlert, Spinner } from "../misc";

class CategoryShow extends React.Component {
    componentDidMount() {
        this.props.fetchCategory(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const { category, isLoading, error } = this.props;

        return (
            <div className="mx-auto col-md-6 col-lg-4">
                <h3 className="my-3 text-center">
                    {category && <strong>{category.name}</strong>}{" "}
                    <Spinner isLoading={isLoading && !category} />
                </h3>
                <div className="mb-3 text-center">
                    <BackButton link="/categories" />
                </div>
                <ErrorAlert error={error} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: state.categories.isLoading,
        error: state.categories.error,
        category: state.categories.items[ownProps.match.params.id]
    };
};

const mapDispatchToProps = {
    fetchCategory,
    reset
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryShow);
