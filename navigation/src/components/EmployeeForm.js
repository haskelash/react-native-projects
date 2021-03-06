import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { updateEmployeeForm } from '../actions';
import { CardItem, Field } from './common';

class EmployeeForm extends Component {
  render() {
    return (
      <View>
        <CardItem>
          <Field
            label="Name"
            placeholder="John Doe"
            value={this.props.name}
            onChangeText={value => this.props.updateEmployeeForm({ prop: 'name', value })}
          />
        </CardItem>
        <CardItem>
          <Field
            label="Phone"
            placeholder="555-555-5555"
            value={this.props.phone}
            onChangeText={value => this.props.updateEmployeeForm({ prop: 'phone', value })}
          />
        </CardItem>
        <CardItem style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerLabelStyle}>Shift</Text>
          <Picker
            selectedValue={this.props.shift}
            onValueChange={value => this.props.updateEmployeeForm({ prop: 'shift', value })}
          >
            <Picker.Item label="Sunday" value="Sunday" />
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
          </Picker>
        </CardItem>
      </View>
    );
  }
}

const styles = {
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = ({ employeeForm }) => {
  const { name, phone, shift } = employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, { updateEmployeeForm })(EmployeeForm);
