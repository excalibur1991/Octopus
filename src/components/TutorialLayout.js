import {
    View,
    Image,
    Ripple,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    tut_overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: 0.78,
        zIndex: 999
    },
    tut_exit: {
        position: 'absolute',
        alignItems: 'flex-end',
        right: 24,
        top: 40,
    },
    tut_content: {
        width: '80%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        marginLeft: 0
        
    },
    next_tut_btn: {
        position: 'absolute',
        right: -40
    }

});

const TutorialLayout = (props) => {
    const {
        children,
        handleNextTut,
        onExitTutorial,

    }  = props || {};

    return (
        <>
            <View style={styles.tut_overlay}>
            <View style={styles.tut_exit}>
                <Ripple 
                onPress={()=>onExitTutorial()}
                ><Image source={require('../../assets/exit.png')} />
                </Ripple>
                <Text style={{color: '#FFF', marginTop: 7}}>EXIT WALKTHROUGH</Text>
            </View>
            <View style={styles.tut_content}>
                {children}
            </View>
            <View style={styles.next_tut_btn}>
                <Ripple onPress={()=>handleNextTut()}>
                <Image source={require('../../assets/btn_tut_next.png')} />
                </Ripple>
            </View>
            </View>
        </>
    );
}

