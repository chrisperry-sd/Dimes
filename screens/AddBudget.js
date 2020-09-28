import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddBudget ({ navigation, createBudget }) {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [expiry, setExpiry] = useState(Date.now());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    setExpiry(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(!show);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  function handleOnPress (event) {
    event.preventDefault();
    createBudget(category, budget, expiry);
    navigation.navigate('ChildParentView');
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.accountSetup}>
        <Text style={styles.header}>Add Child Budget</Text>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Category or Activity"
            onChangeText={(input) => setCategory(input)}
            placeholderTextColor="grey"
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Amount"
            onChangeText={(input) => setBudget(input)}
            placeholderTextColor="grey"
          />
        </View>
        <View style={styles.centerbtn}>
          <TouchableOpacity onPress={showDatepicker} style={styles.dateBtnContainer}>
            <View style={styles.btn}>
              <Text style={styles.text}>Add an expiry date here</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={expiry}
              is24Hour={true}
              display="spinner"
              onChange={onChange}
              textColor="white"
            />
          )}
        </View>

      </View>
      <View style={styles.centerbtn}>
        <TouchableOpacity onPress={handleOnPress} style={styles.btnContainer}>
          <View style={styles.btn}>
            <Text style={styles.text}>Add Budget</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#161925',
    flex: 1,
  },
  accountSetup: {
    marginTop: 50,
  },
  header: {
    color: 'white',
    fontSize: 48,
  },
  inputContainer: {
    marginTop: 56,
  },
  btn: {
    backgroundColor: '#A34861',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnContainer: {
    margin: 50,
    width: 250,
  },
  dateBtnContainer: {
    margin: 10,
    width: 350,
  },
  centerbtn: {
    alignItems: 'center',
  },
  signUp: {
    color: 'white',
    textDecorationLine: 'underline',
    margin: 50,
  },
  textInput: {
    color: 'black',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    width: 350,
    height: 60,
    backgroundColor: 'white',
    margin: 20,
    fontSize: 24,
  },
  centerContent: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});
