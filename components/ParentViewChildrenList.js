import React, { useContext } from 'react';
import { ParentContext } from '../ParentContext';

import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../myAssets/theme';

export default function ParentViewChildrenList({ navigation }) {
  const { state, setState } = useContext(ParentContext);

  return (
    <View>
      <View style={styles.container}>
        <FlatList
          style={styles.flatListBorder}
          horizontal={true}
          data={Object.keys(state.kids)}
          keyExtractor={(item, index) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ParentViewChildSummary', { item })
              }>
              <View style={styles.list}>
                <View style={styles.listContainer}>
                  <Text style={styles.text}>{state.kids[item].name}</Text>
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
    marginHorizontal: 8,
    borderRadius: 8,
    flexDirection: 'row',
    margin: 20,
  },
  flatListBorder: {
    borderRadius: 8,
  },
  list: {
    backgroundColor: colors.blue,
    marginRight: 10,
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
  },
  listContainer: {
    margin: 10,
    padding: 10,
    width: 190,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    paddingHorizontal: 2,
    fontSize: 26,
  },
});
