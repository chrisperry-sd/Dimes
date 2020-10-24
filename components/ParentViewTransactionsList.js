import React, { useContext } from 'react';
import { ParentContext } from '../ParentContext';

import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../myAssets/theme';

export default function ParentViewTransactionsList() {
  const { state } = useContext(ParentContext);

  return (
    <View>
      <View style={styles.container}>
        <FlatList
          style={styles.flatListBorder}
          horizontal={true}
          data={state.transactions
            .filter((transaction) => {
              return transaction.parentId === state.user._id;
            })
            .sort((a, b) => {
              return (
                new Date(b.transactionDate).getTime() -
                new Date(a.transactionDate).getTime()
              );
            })}
          keyExtractor={(item, index) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.list}>
                <View style={styles.listContainer}>
                  <Text style={styles.text}>
                    {item.amount < 0
                      ? `${state.kids[item.kidId].name} spent £${
                          -1 * item.amount
                        } at ${item.merchant}`
                      : `${state.kids[item.kidId].name} recieved £${
                          item.amount
                        } from ${item.merchant}`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 30,
    borderRadius: 8,
  },
  flatListBorder: {
    borderRadius: 8,
  },
  list: {
    backgroundColor: colors.plum,
    marginRight: 10,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
  },
  listContainer: {
    margin: 10,
    flexDirection: 'row',
  },
  text: {
    color: colors.white,
    paddingHorizontal: 2,
    fontSize: 18,
  },
});
