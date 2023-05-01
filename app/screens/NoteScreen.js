import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../appStyles/colors';
import moment from 'moment';
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import InputModal from '../components/InputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notes from '../components/Notes';

const NoteScreen = ({userName}) => {
  const [greet, setGreet] = useState('Morning');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [notes, setNotes] = useState([]);
  const [seletedNote, setseletedNote] = useState({});

  const addNotes = async(title, desc, id) => {
    const note = {id:moment().format('dddd, MMMM Do YYYY, h:mm:ss A'), title, desc};
    if(id && id !== null){
       const remainingNotes = notes.filter(n => id !== n.id);
        const updatedNotes = [...remainingNotes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    }else{
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
  };

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) {
      const notesArray = JSON.parse(result);
      setNotes(notesArray);
    }
  };
  const deleteNote = async (id) => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) {
        const notesArray = JSON.parse(result);
        remainingNotes = notesArray.filter(n => id !== n.id);
      }
      await AsyncStorage.setItem('notes', JSON.stringify(remainingNotes));
      setNotes(remainingNotes);
      closeModal();
  }

  useEffect(() => {
    const now = moment();
    // Determine the time of day
    let timeOfDay = '';
    if (now.hour() < 12) {
      timeOfDay = 'Morning';
    } else if (now.hour() < 17) {
      timeOfDay = 'Afternoon';
    } else if (now.hour() < 21) {
      timeOfDay = 'Evening';
    } else {
      timeOfDay = 'Night';
    }
    setGreet(timeOfDay);
    findNotes();
  }, []);

  const openModal = () => {
    setModalVisibility(true);
  };
  const closeModal = () => {
    setModalVisibility(false);
    setseletedNote({});
  };

  const listItemClicked = (list) => {
    setseletedNote(list);
    setModalVisibility(true);
  }
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
      <View style={styles.container}>
        <Text style={styles.header}>{`Good ${greet} ${userName}!`}</Text>
        <SearchBar setNotes = {setNotes} notes = {notes}/>
        {notes && notes.length > 0 ? 
        <Notes data= {notes} listItemClicked={listItemClicked} />:
         <View style={styles.emptyHeaderContainer}>
          <Text style={styles.emptyHeader}>Add notes</Text>
        </View>}
        <View style={styles.addNotesIcon}>
          <RoundIconBtn antIconName="addfile" onPress={openModal} />
        </View>
        <InputModal
          modalVisibility={modalVisibility}
          setModalVisibility={closeModal}
          addNotes={addNotes}
          seletedNote = {seletedNote}
          handleDelete={deleteNote}
        />
      </View>
    </>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.LIGHT
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.DARK,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyHeader: {
    fontSize: 24,
    textTransform: 'uppercase',
    color: colors.DARK,
    fontWeight: 'bold',
  },
  addNotesIcon: {
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end'
    position: 'absolute',
    right: 10,
    bottom: 40,
  },
});
