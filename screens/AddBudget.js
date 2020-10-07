import React, { useContext } from 'react';
import { ParentContext } from '../ParentContext';
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
import { colors } from '../myAssets/theme';
import ApiService from '../ApiService';
import moment from 'moment';

export default function AddBudget({ navigation }) {
  const { state, setState } = useContext(ParentContext);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  function findExpiryDate(frequency, allowance) {
    let expiry;
    if (frequency === 'monthly') expiry = moment(allowance).add(1, 'months');
    else if (frequency === 'fortnightly')
      expiry = moment(allowance).add(14, 'days');
    else expiry = moment(allowance).add(7, 'days');
    return expiry.getDate();
  }

  function createBudget(category, amount) {
    const newBudget = {
      category,
      amount,
      expiryDate: findExpiryDate(
        state.kids.allowanceFrequency,
        state.kids.allowanceDate,
      ),
      kidId: state.kids.kidId,
      parentId: state.user._id,
    };
    ApiService.postBudget(newBudget).then((newBudget) => {
      setState((prevState) => ({
        ...prevState,
        budgets: [...budgets, newBudget],
      }));
    });
  }

  // const createAlert = () => {
  //   Alert.alert('Budget added successfully');
  // };

  function handleOnPress(event) {
    event.preventDefault();
    // if (category.length === 0 || budget.length === 0 || expiry.length === 0) {
    //   return Alert.alert(' Input field empty/incorrect');
    // }
    createBudget(category, amount);
    setTimeout(() => {
      createAlert();
    }, 500);
    setTimeout(() => {
      navigation.navigate('ParentViewChildSummary');
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
            placeholder="Budget category"
            onChangeText={(input) => setCategory(input)}
            placeholderTextColor={colors.grey}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Budget amount"
            onChangeText={(input) => setAmount(input)}
            placeholderTextColor={colors.grey}
          />
        </View>
      </View>
      <View style={styles.centerbtn}>
        <TouchableOpacity onPress={handleOnPress} style={styles.btnContainer}>
          <View style={styles.btn}>
            <Text style={styles.text}>Add budget</Text>
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
