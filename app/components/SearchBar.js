import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../appStyles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width} = Dimensions.get('window');
const SearchBar = ({notes,setNotes}) => {

  const [searchInput, setSearchInput] = useState('');

 const filterList = (list) => {
    return list.filter(listItem => listItem?.title?.toLowerCase().includes(searchInput.toLowerCase()));
  }
  const searchNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) {
      const notesArray = JSON.parse(result);
      setNotes(notesArray);
    }
  }
useEffect(() => {
 if(searchInput === ''){
  searchNotes();
 }else {
  setNotes(filterList(notes));
 }
 
}, [searchInput])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholderTextColor={colors.DARK}
        placeholder="Search in your notes..."
        onChangeText={(search) => setSearchInput(search)}
      />
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
    color: colors.PRIMARY,
    paddingLeft: 15,
    borderRadius: 10,
    fontSize: 20,
  },
});
