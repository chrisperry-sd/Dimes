import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// import {CommonActions} from '@react-navigation/native';

import dimes from '../myAssets/images/logo_size_invert.jpg';

export default function LogIn({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.centerContent}>
        <View>
          <Image source={dimes} style={styles.dimesImg} />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Username..."
            placeholderTextColor="grey"
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="grey"
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => navigation.navigate('ParentDashboard')}>
            <View style={styles.btn}>
              <Text style={styles.text}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <View>
            <Text style={styles.signUp}>
              Don't have an account already?? Sign up here...
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#161925',
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  dimesImg: {
    marginTop: 100,
    marginBottom: 100,
    borderRadius: 18,
    width: 240,
    height: 120,
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
  signUp: {
    color: 'white',
    textDecorationLine: 'underline',
    margin: 50,
  },
  textInput: {
    color: 'black',
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
});
