import React, {useState} from 'react';
import {
    Modal, 
    View, 
    Text, 
    TextInput,
    Pressable
} from 'react-native';
import {theme} from '../services/Common/theme';
import MultiSelect from '../components/Multiselect';
import ColorPicker from 'react-native-wheel-color-picker';

const AnonymModal = props => {
  const {modalVisible} = props || {};
  const [age, setAge] = useState(20);
  const [gender, setGender] = useState('Male');
  const [skinColor, setSkinColor] = useState('#FFFFFF');
  const [showSelf, setShowSelf] = useState(true);

  return showSelf? (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent={true}>
      <View style={{flex: 1, backgroundColor: 'rgba(52,52,52,0.5)'}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              maxWidth: '95%',
              minWidth: '95%',
              borderRadius: 5,
              backgroundColor: '#fff',
              paddingHorizontal: 15,
              paddingVertical: 20,
              elevation: 10,
            }}>
            <TextInput
                style={{
                    borderColor: '#e9e9e9',
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingLeft: 10,
                }}
                keyboardType={'numeric'}
                value={age}
                placeholder={'Age'}
                placeholderTextColor={'#A9A9A9'}
                onChangeText={setAge}
            />

            <MultiSelect 
              hideTags
              hideSubmitButton
              hideDropdown        
              items={[
              {name: 'Male', value:'Male'}, 
              {name: 'Female', value: 'Female'}, 
              {name: 'Other', value: 'Other'}]}
              uniqueKey="value"
              selectText={'Gender'}
              displayKey="name"
              single={true}
              showFilter={false}
              canAddItems={false}
              selectedItems={gender}
              onSelectedItemsChange={(items)=>{ setGender(items) }}
              textInputProps={{
              editable:false
              }}
              searchInputPlaceholderText={'Gender'}
              
              selectedItemTextColor={'#00A5FF'}
              styleMainWrapper={{
              marginTop: 10
              }}/>
            <Pressable
              style={{
                borderColor: '#e9e9e9',
                borderWidth: 1,
                borderRadius: 5,
                paddingVertical: 10,
                paddingLeft: 10,
                flexDirection: 'row',
              }}
              onPress={()=>{
              //setModalVisible(!modalVisible);
              }}>
              <Text style={{
              alignSelf: 'center'
              }} color={'#e9e9e9'}>{'Skin Color'}</Text>
              <View
              style={{
                  marginLeft: 10,
                  backgroundColor: skinColor,
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  borderColor: '#ADADAD',
                  borderWidth: 1
                }}>
                <Text>{skinColor}</Text>
              </View>
            </Pressable>
            <View
              style={{
                  borderColor: '#e9e9e9',
                  borderRadius: 5,
                  borderWidth: 1,
                  padding: 10,
                  marginTop: 10,
                  height: 200
              }}>
              <ColorPicker
                // ref={r => { this.picker = r }}
                color={skinColor ? skinColor: '#FFFFFF'}
                swatchesOnly={false}
                onColorChange={(color)=>{
                    console.log(color);
                }}
                onColorChangeComplete={(color)=>{
                    setSkinColor(color)
                    console.log(color);
                }}
                thumbSize={15}
                sliderSize={15}
                noSnap={false}
                row={true}
                swatchesLast={false}
                swatches={false}
                discrete={false}
                style={{
                    height: 200,
                    marginVertical: 10,
                }}/>
            </View>
            </View>
        </View>
      </View>
    </Modal>
  ) : null;
};

export default AnonymModal;
