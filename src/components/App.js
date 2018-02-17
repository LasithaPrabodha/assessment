import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem, Button} from 'reactstrap';
import FormCom from './FormCom';
import {fetchBooksWhenNeeded, createBookWhenNeeded, deleteBookWhenNeeded} from "../actions/bookAction";
import './App.css';

class App extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchBooksWhenNeeded())
  }

  listView(data) {
    return (
      <ListGroupItem key={data.id}>
        {data.title}
        <Button onClick={(e) => this.deleteBook(data.id)} className="btn btn-danger pull-right">Remove</Button>
      </ListGroupItem>
    )
  }

  deleteBook(ID){
    const { dispatch } = this.props;
    dispatch(deleteBookWhenNeeded(ID));
  }

  handleSubmit(title) {
    if (title.length > 0) {
      let book = {
        title: title
      };
      const {dispatch} = this.props;
      dispatch(createBookWhenNeeded(book))
    }
  }
  render() {
    return (
      <div className="container">
        <h1>Book List Application</h1>
        <hr/>
        <FormCom handleSub={this.handleSubmit}/>
        <hr/>
        {<ListGroup>
          {this.props.books.map((book) => this.listView(book))}
        </ListGroup>}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.books.data
  }
};


export default connect(mapStateToProps)(App);
