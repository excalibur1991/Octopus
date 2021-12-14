import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native'
import {Checkbox} from 'react-native-paper'
import PropTypes from 'prop-types'


const BountyView = (props) => {

    const {
        wrapperStyle={},
        bountyData = [],
        handlePress = ()=>{}
    }= props || {};

    return(
        <View style={{...styles.CheckboxWrapper,
            ...props.wrapperStyle
          }}>
            <View style={styles.column}>
            {
                props.bountyData.filter((value, index)=>(index % 2 == 0)).map((pii, index)=>(
                    <Checkbox.Item
                        position='leading'
                        style={styles.CheckboxItem}
                        labelStyle={styles.CheckboxLabel}
                        disabled={!pii.disabled}
                        label={pii.tag}
                        status={pii.checked ? 'checked': 'unchecked'}

                        onPress={()=>props.handlePress(index * 2)}
                        />
                ))
            }
            </View>
            <View style={styles.column}>
            {
                props.bountyData.filter((value, index)=>(index % 2 != 0)).map((pii, index)=>(
                    <Checkbox.Item
                        position='leading'
                        style={styles.CheckboxItem}
                        labelStyle={styles.CheckboxLabel}
                        disabled={!pii.disabled}
                        label={pii.tag}
                        status={pii.checked ? 'checked': 'unchecked'}

                        onPress={()=>props.handlePress(index * 2 + 1)}
                        />
                ))
            }
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    
    CheckboxWrapper: {
      flexDirection: 'row',
      zIndex: 0,
    },
    column: {
      flexDirection: 'column',
      flex: 0.5
    },
    CheckboxItem: {
      paddingHorizontal: 0
    },
    CheckboxLabel: {
      textAlign: 'left'
    }
  })


BountyView.propTypes = {
    onPress: PropTypes.func,
    bountyData: PropTypes.array,
    wrapperStyle: PropTypes.object
};

export default BountyView;