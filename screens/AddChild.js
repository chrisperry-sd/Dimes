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

export default function AddChild({navigation, setChild}) {
  const [name, setName] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.accountSetup}>
        <Text style={styles.header}>Account Setup</Text>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <TextInput style={styles.textInput} placeholder="Full name" />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Screen name"
            onChangeText={(e) => {
              setName(e);
              console.log(name);
            }}
          />
        </View>
        <View>
          <TextInput style={styles.textInput} placeholder="Bank name" />
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
