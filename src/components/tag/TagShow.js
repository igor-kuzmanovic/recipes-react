import React from "react";
import { connect } from "react-redux";
import { fetchTag, reset } from "../../actions/tag/show";
import requireAuth from "../requireAuth";
import { BackButton } from "../form";
import { ErrorAlert, Spinner } from "../misc";

class TagShow extends React.Component {
    componentDidMount() {
        this.props.fetchTag(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const { tag, isLoading, error } = this.props;

        return (
            <div>
                {tag && (
                    <h3 className="my-3 text-center">
                        <strong>{tag.name}</strong>{" "}
                        <Spinner isLoading={isLoading} />
                    </h3>
                )}
                <BackButton link="/tags" />
                <ErrorAlert error={error} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: state.tags.isLoading,
        error: state.tags.error,
        tag: state.tags.items[ownProps.match.params.id]
    };
};

const mapDispatchToProps = {
    fetchTag,
    reset
};

export default requireAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TagShow)
);
