import React, { useState } from 'react';
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
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../myAssets/theme';

import dimes from '../myAssets/images/logo_size_invert.jpg';
import ApiService from '../ApiService';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    const user = {
      username: username,
      password: password,
    };
    const result = await ApiService.login(user);
    try {
      const { accessToken } = result;
      await AsyncStorage.setItem('@accessToken', accessToken);
      navigation.navigate('ParentDashboard');
    } catch (error) {
      alert('Your email or password is incorrect. Please try again.');
      setUsername('');
      setPassword('');
    }
  };
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
            value={username}
            placeholder="Username"
            placeholderTextColor={colors.grey}
            onChangeText={(e) => {
              setUsername(e);
            }}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            value={password}
            placeholder="Password"
            placeholderTextColor={colors.grey}
            secureTextEntry={true}
            onChangeText={(e) => {
              setPassword(e);
            }}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.btnContainer} onPress={handleClick}>
            <View style={styles.btn}>
              <Text style={styles.text}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <View>
            <Text style={styles.signUp}>
              Don't have an account? Sign up here &rarr;
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
    color: colors.white,
    backgroundColor: colors.black,
    flex: 1,
  },
  text: {
    color: colors.white,
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
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnContainer: {
    margin: 50,
    width: 250,
  },
  signUp: {
    color: colors.white,
    textDecorationLine: 'underline',
    margin: 50,
  },
  textInput: {
    color: colors.black,
    borderRadius: 8,
    padding: 10,
    width: 350,
    height: 60,
    backgroundColor: colors.white,
    margin: 20,
    fontSize: 24,
  },
  centerContent: {
    alignItems: 'center',
  },
});
