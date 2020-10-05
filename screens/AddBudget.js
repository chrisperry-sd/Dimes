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
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../theme';

export default function AddBudget({ navigation, createBudget }) {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [expiry, setExpiry] = useState(Date.now());
  const [show, setShow] = useState(false);

  const createAlert = () => {
    Alert.alert('Budget Added');
  };
  const onChange = (event, selectedDate) => {
    const expiryDate = selectedDate;
    setShow(Platform.OS === 'ios');
    setExpiry(expiryDate);
  };
  const showMode = (currentMode) => {
    setShow(!show);
  };
  const showDatePicker = () => {
    showMode('date');
  };
  function handleOnPress(event) {
    event.preventDefault();
    if (category.length === 0 || budget.length === 0 || expiry.length === 0) {
      return Alert.alert(' Input field empty/incorrect');
    }
    createBudget(category, budget, expiry);
    setTimeout(() => {
      createAlert();
    }, 500);
    setTimeout(() => {
      navigation.navigate('IndividualChildSummary');
    }, 1000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.accountSetup}>
        <Text style={styles.header}>Add Budget</Text>
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
          <TouchableOpacity
            onPress={showDatePicker}
            style={styles.dateBtnContainer}>
            <View style={styles.btn}>
              <Text style={styles.text}>Add expiry date here</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              mode="date"
              value={expiry}
              is24Hour={true}
              display="spinner"
              onChange={onChange}
              textColor={colors.white}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    color: colors.white,
    backgroundColor: colors.black,
    flex: 1,
  },
  accountSetup: {
    marginTop: 50,
  },
  header: {
    color: colors.white,
    fontSize: 48,
  },
  inputContainer: {
    marginTop: 56,
  },
  btn: {
    backgroundColor: colors.plum,
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
  textInput: {
    color: colors.black,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    width: 350,
    height: 60,
    backgroundColor: colors.white,
    margin: 20,
    fontSize: 24,
  },
  text: {
    color: colors.white,
    fontSize: 24,
  },
});
