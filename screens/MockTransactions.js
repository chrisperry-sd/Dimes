import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function AddBudget({navigation, createBudget}) {
  // const [amount, setAmount] = useState('');
  // const [merchant, setMerchant] = useState('');
  // const [category, setCategory] = useState('');

  // function handleOnPress(event) {
  //   event.preventDefault();
  //   createBudget(category, budget);
  //   navigation.navigate('ChildParentView');
  // }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.accountSetup}>
        <Text style={styles.header}>Child Transaction</Text>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Amount"
            placeholderTextColor="grey"

            // onChangeText={(input) => setCategory(input)}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Merchant"
            placeholderTextColor="grey"

            // onChangeText={(input) => setBudget(input)}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Category"
            placeholderTextColor="grey"

            // onChangeText={(input) => setBudget(input)}
          />
        </View>
        <View style={styles.centerbtn}>
          <TouchableOpacity
            // onPress={handleOnPress}
            style={styles.btnContainer}>
            <View style={styles.btn}>
              <Text style={styles.text}>Add Transaction</Text>
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
