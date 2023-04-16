import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import colors from '../appStyles/colors';
const {width} = Dimensions.get('window');
const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.searchInput} placeholder="Search Is yet to implement..." />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    width: width - 20,
    padding: 8,
    paddingLeft: 15,
    borderRadius: 10,
    fontSize: 20,
  },
});
