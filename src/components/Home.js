import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { Button, CardDeck, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { fetchRecipes, reset } from "../actions/recipe/list";
import { CreateButton } from "./form";
import { ErrorAlert, Spinner } from "./misc";

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchRecipes();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    renderList() {
        return this.props.recipes.map(recipe => {
            const { id, title, description, creationDate } = recipe;

            return (
                <div key={id} className="col-md-4">
                    <Card className="text-center m-2">
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>{description}</Card.Text>
                            <LinkContainer to={`/recipes/${id}`}>
                                <Button variant="info">Details</Button>
                            </LinkContainer>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            {moment(creationDate).fromNow()}
                        </Card.Footer>
                    </Card>
                </div>
            );
        });
    }

    render() {
        const { recipes, isLoading, error } = this.props;

        return (
            <div>
                <h3 className="mt-3 text-center">Welcome</h3>
                {isLoading && !recipes.length && (
                    <h1 className="text-center my-5">
                        <Spinner isLoading={true} />
                    </h1>
                )}
                <CardDeck className="my-2">{this.renderList()}</CardDeck>
                <div className="text-center mb-3">
                    <CreateButton link="/recipes/create" />
                </div>
                <ErrorAlert error={error} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.recipes.isLoading,
        error: state.recipes.error,
        recipes: Object.values(state.recipes.items)
    };
};

const mapDispatchToProps = {
    fetchRecipes,
    reset
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
