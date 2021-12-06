import { useState } from 'react';
import {
    Modal, 
    View, 
    Text,
    Image,
    StyleSheet
} from 'react-native';



const styles = StyleSheet.create({
    heading: {

    },
    content: {

    }
});

const AboutMission = (props) => {
    const [show, setShow] = useState(true);

    return (
        <>
            <Modal
                animationType="none"
                transparent={true}
                visible={show}
                statusBarTranslucent={true}
                >
                <View>
                    <Image source={require('../../assets/ico_close.png')} />
                    <Text>About Mission</Text>
                </View>
                <Divider />
                <View>
                    <Text styles={styles.heading}>Requirements</Text>
                    <Text styles={styles.heading}>Title 1</Text>
                    <Text styles={styles.heading}>Title 2</Text>
                </View>
                <RoundButton
                    title='Got it'
                    type='secondary'
                    onPress={
                        ()=>{
                           setShow(false);
                        }
                    }
                />
            </Modal>
        </>
    );
}

export default AboutMission;