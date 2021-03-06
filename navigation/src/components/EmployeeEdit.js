import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { text } from 'react-native-communications';
import { Card, CardItem, Button, Confirm } from './common';
import { updateEmployeeForm, updateEmployee, deleteEmployee } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.updateEmployeeForm({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    const uid = this.props.employee.uid;
    this.props.updateEmployee({ name, phone, shift, uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;
    text(phone, `Your upcoming shift is on ${shift}.`);
  }

  onFirePress() {
    this.setState({ showModal: true });
  }

  onAccept() {
    const uid = this.props.employee.uid;
    this.props.deleteEmployee({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardItem>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardItem>
        <CardItem>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardItem>;
        <CardItem>
          <Button onPress={this.onFirePress.bind(this)}>
            Fire Employee
          </Button>
        </CardItem>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to fire this employee?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = ({ employeeForm }) => {
  const { name, phone, shift } = employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  updateEmployeeForm,
  updateEmployee,
   deleteEmployee
})(EmployeeEdit);
