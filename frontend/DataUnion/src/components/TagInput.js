import React from 'react';
import {
    View,
    TouchableWithoutFeedback,
    Text,
    TextInput,
} from 'react-native'
import PropTypes from 'prop-types'

/**
 * 
 * @param {
 * bEditEnabled //show|hide this input
 * tagEditValue //tag Value
 * onChangeText //
 * onSubmitEditing //
 * } props 
 * @returns 
 */

const TagInput = (props) => {

    const {
        bEditEnabled=false,
        tagEditValue = '',
        filteredTags = [],
        onChangeText = ()=>{},
        onSubmitEditing = ()=>{},
        setTextEditor = ()=>{},
        setTagEditValue = ()=>{},
        keyboardOffset = ()=>{}
    }= props || {};

    return(
        <>
         <View
          style={{
            flex:1,
            position : 'absolute', 
            width:'100%',
            zIndex: 9999,
            bottom : props.keyboardOffset
        }}
        >
          {
            props.filteredTags.map((item, index)=>(
              <TouchableWithoutFeedback style={{
                  width:'100%', 
                }} 
                onPress={()=>{
                    props.setTagEditValue(item)
                }} key={index}>
                <Text style={{ 
                    backgroundColor:'#F2F2F2', 
                    fontSize: 16, 
                    borderColor:'#dddddd',
                    borderTopWidth: 1, 
                    paddingVertical: 5, 
                    paddingLeft: 10}}>
                        {item}
                </Text>
              </TouchableWithoutFeedback>
            ))

          }
        <TextInput
          ref={input => (props.setTextEditor(input))}
          value={props.tagEditValue}
          blurOnSubmit={true} 
          autoCorrect={false}
          onChangeText={props.onChangeText}
          onSubmitEditing={props.onSubmitEditing}
          returnKeyType="done"
          style={{
            height: 50,
            width: '100%',
            marginBottom: 0,
            backgroundColor: '#0B132B',
            color: 'white',
        }}/>
        </View>
        </>
    );
};




TagInput.propTypes = {
    filteredTags: PropTypes.array,
    bEditEnabled: PropTypes.bool,
    tagEditValue:PropTypes.string,
    keyboardOffset: PropTypes.number,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    setTextEditor: PropTypes.func,
    setTagEditValue: PropTypes.func,
};

export default TagInput;