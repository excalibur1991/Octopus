import {

} from 'react-native'

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
        onChangeText = ()=>{},
        onSubmitEditing = ()=>{},
    }= props || {};

    return(
        <>
            <TextInput
                keyboardType = 'text'
                value={tagEditValue}
                blurOnSubmit={true}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                returnKeyType="done"
                style={[styles.inputbox, {bottom:bEditEnabled? 0: -100}]}
            />
        </>
    );
};

TagInput.propTypes = {
    bEditEnabled: PropTypes.bool,
    tagEditValue:PropTypes.string,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
};

export default TagInput;