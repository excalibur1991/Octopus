import React from 'react';
import {
    View, 
    StyleSheet,
} from 'react-native';
import { Chip } from 'react-native-paper';
import PropTypes from 'prop-types';



const Tags = (props) => {
    const {
      tags=[],
      tag_type="verification",
      selectedTag = "",
      deleteTag = ()=>{},
      editTag = ()=>{},
      bIndent = false
    } = props || {};

    return (
      <>
      {props.tags.map((vtag, index)=>(
        <View style={ index == 0 && bIndent? styles.ChipWrapperOdd: styles.ChipWrapper}>
          <Chip  
            title={vtag}
            onLongPress={()=>{props.deleteTag(vtag, props.tag_type)}}
            onPress={()=>{props.editTag(vtag, index, props.tag_type)}}
            textStyle={styles.ChipText}
            style={[styles.Chip, {    
              backgroundColor:  props.selectedTag == vtag ? "#EB5454" : "#3A506B",
            }]}>
            {vtag}
          </Chip>
        </View>
      ))}              
     </>
    );
};


const styles = StyleSheet.create({
  ChipWrapperOdd: {
    marginHorizontal: 2,
    marginVertical: 3,
    flexWrap: 'wrap',
    marginLeft:60,
   },
  ChipWrapper: {
    marginHorizontal: 2,
    marginVertical: 3,
    flexWrap: 'wrap',
   },
   ChipText: {
    fontSize: 15,
    color: '#ffffff',
  },
  Chip: {
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 26,
    paddingLeft: 10,
    paddingRight: 10
  },
  })

Tags.propTypes = {
  tags: PropTypes.array,
  tag_type: PropTypes.string,
  selectedTag: PropTypes.string,
  deleteTag : PropTypes.func,
  editTag: PropTypes.func,
  bIndent: PropTypes.bool
};

export default Tags;