import React, { useState, useContext } from 'react';
import { ParentContext } from '../ParentContext';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Switch,
} from 'react-native';
import colors from '../myAssets/theme';

const initialState = {
  name: '',
  allowanceFrequency: 'Monthly',
  allowanceAmount: 0,
  allowanceDate: new Date(),
};

export default function AddChild({ navigation }) {
  const { state, setState } = useContext(ParentContext);

  const [tempState, setTempState] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTempState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.accountSetup}>
        <Text style={styles.header}>Register</Text>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="My child's name"
            name="name"
            value={tempState.name}
            onChange={handleChange}
          />
        </View>
        <View>
          <Text>Allowance Frequency</Text>
          <Switch
            trackColor={{ false: colors.purple, true: colors.plum }}
            name="allowanceFrequency"
            value={tempState.allowanceFrequency}
            onValueChange={handleChange}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Allowance amount"
            name="allowanceAmount"
            value={tempState.allowanceAmount}
            onChange={handleChange}
            maxLength={5}
            keyboardType="numeric"
          />
        </View>
        <View>
          <TextInput style={styles.textInput} placeholder="Account no..." />
        </View>
        <View style={styles.centerbtn}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => navigation.navigate('ParentDashboard')}>
            <View style={styles.btn}>
              <Text style={styles.text}>Create Account</Text>
            </View>
          </TouchableOpacity>
        </View>
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
