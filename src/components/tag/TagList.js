import React from "react";
import { connect } from "react-redux";
import { ButtonGroup, ListGroup } from "react-bootstrap";
import { fetchTags, reset } from "../../actions/tag/list";
import {
    LinkButton,
    UpdateButton,
    DeleteButton,
    BackButton,
    CreateButton
} from "../form";
import { SuccessAlert, ErrorAlert, Spinner } from "../misc";

class TagList extends React.Component {
    componentDidMount() {
        this.props.fetchTags();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    renderList() {
        return this.props.tags.map(tag => {
            const { id, name } = tag;

            return (
                <ListGroup.Item key={id} className="p-0">
                    <ButtonGroup className="d-flex justify-content-between">
                        <LinkButton link={`/tags/${id}`}>{name}</LinkButton>
                        <UpdateButton link={`/tags/update/${id}`} />
                        <DeleteButton link={`/tags/delete/${id}`} />
                    </ButtonGroup>
                </ListGroup.Item>
            );
        });
    }

    render() {
        const { deleted, isLoading, error } = this.props;

        return (
            <div className="mx-auto col-md-10 col-lg-8">
                <h3 className="my-3 text-center">Tags</h3>
                <ListGroup className="mb-3">
                    {this.renderList()}
                    {isLoading && (
                        <ListGroup.Item>
                            <Spinner isLoading={isLoading} />
                        </ListGroup.Item>
                    )}
                </ListGroup>
                <div className="row mb-3">
                    <div className="col text-left">
                        <BackButton link="/" />
                    </div>
                    <div className="col text-right">
                        <CreateButton link="/tags/create" />
                    </div>
                </div>
                <ErrorAlert error={error} />
                <SuccessAlert
                    isShown={deleted}
                    message="Tag successfully deleted"
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.tags.isLoading,
        error: state.tags.error,
        tags: Object.values(state.tags.items),
        deleted: state.tags.deleted
    };
};

const mapDispatchToProps = {
    fetchTags,
    reset
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagList);
