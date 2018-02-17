import React, {Component} from 'react';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import './App.css';

class FormCom extends Component {
  static propTypes = {
    handleSub: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleS = this.handleS.bind(this);

    this.state = {
      title: ''
    }
  }

  handleChange(e) {
    this.setState({
      title: e.target.value
    })
  }

  handleS(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.handleSub(this.state.title);
    this.setState({
      title:''
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleS}>
        <FormGroup>
          <Label for="title">New Book</Label>
          <div className="row clearfix">
            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
              <Input type="text" onChange={this.handleChange} className="form-control" name="title" id="title"
                     value={this.state.title}/>
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
              <Button type="submit" color="success" value="add">ADD</Button>
            </div>
          </div>
        </FormGroup>
      </Form>
    )
  }
}

export default FormCom;
