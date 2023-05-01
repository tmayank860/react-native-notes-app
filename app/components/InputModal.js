import {
    Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../appStyles/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import RoundIconBtn from './RoundIconBtn';

const {width, height} = Dimensions.get('window');
const InputModal = ({modalVisibility, setModalVisibility, addNotes, seletedNote, handleDelete}) => {
  const [heading, setHeading] = useState('');
  const [noteBody, setNoteBody] = useState('');

  const handleTextChange = (text, textFor) => {
    textFor === 'noteTitle' ? setHeading(text) : setNoteBody(text);
  }

  const handleSubmit = () => {
    if(!heading.trim() && !noteBody.trim()){
        Alert.alert(  
            'No change is done',  
            'Do you want to continue updating?',  
            [  
                {  
                    text: 'YES',    
                    style: 'cancel',  
                },  
                {text: 'NO', onPress: () =>setModalVisibility(false)},  
            ]  
        );  
    }else{
        addNotes(heading !== '' ? heading : seletedNote?.title , noteBody !== '' ? noteBody : seletedNote?.desc, seletedNote?.id);
        setHeading('');
        setNoteBody('');
        setModalVisibility(false);
    }
  }

  return (
    <Modal
      visible={modalVisibility}
      style={styles.modalContainer}
      backgroundColor="green"
      animationType="fade">
      <View style={styles.contianer}>
       {seletedNote?.id ?  <Text numberOfLines={2} style={styles.timeStamp}>
          {`Last Updated at ${seletedNote?.id}`}
        </Text> :  <Text style={styles.timeStamp}>
          {moment().format('dddd, MMMM Do YYYY')}
        </Text>}
        <TextInput
        onChangeText={text => handleTextChange(text, 'noteTitle')}
          placeholder="Note Heading"
          placeholderTextColor={colors.DARK}
          style={[styles.noteHeading, styles.textInput]}
          defaultValue={seletedNote?.title}
        />
        <TextInput
        onChangeText={text => handleTextChange(text, 'noteBody')}
          placeholder="Add your note..."
          placeholderTextColor={colors.DARK}
          style={[styles.noteBody, styles.textInput]}
          defaultValue={seletedNote?.desc}
          multiline = {true}
          numberOfLines = {50}
        />
        <View style={styles.submitIcon}>
          <RoundIconBtn
            antIconName="close"
            onPress={() => setModalVisibility(false)}
          />
          <RoundIconBtn antIconName="check"  onPress={handleSubmit}/>
         {(seletedNote?.title || seletedNote?.desc)  && <RoundIconBtn antIconName="delete" color={colors.LIGHT} style={{backgroundColor: colors.ERROR}} onPress={() => handleDelete(seletedNote?.id)}/>}
        </View>
      </View>
      
    </Modal>
  );
};

export default InputModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: width,
    height: height,
    // backgroundColor:'red'
  },
  contianer: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  textView: {
    flex: 0.8,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.PRIMARY,
    color: colors.DARK,
  },

  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 10,
    borderRadius: 50,
  },
  submitIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeStamp: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.DARK,
  },
  noteHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 45,
  },
  noteBody: {
    marginVertical: 20,
    fontSize: 20,
    height: 150,
  },
  icon: {
    padding: 8,
    backgroundColor: colors.PRIMARY,
    borderRadius: 50,
    elevation: 5,
  },
});
