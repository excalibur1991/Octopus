import React, { useState } from 'react';
import {
    Modal, 
    View, 
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import RoundButton from '../../components/RoundButton';
import { Divider } from "react-native-elements";

const styles = StyleSheet.create({
    heading: {

    },
    content: {

    },
    pagerView: {
        width: '100%',
        height: '60%',
        backgroundColor: 'transparent'
    },
    pageview: {
        alignItems: 'center',
        paddingVertical: '5%',
        paddingHorizontal: '5%',
        color: 'white'
    },
    heading: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 10

    },
    desc: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        lineHeight:20,
        fontWeight: '400'

    }
});

const AboutMission = (props) => {
    const {
        visible=false,
        onClose = ()=> {}
    } = props || {};
    const [show, setShow] = useState(visible);

    return (
        <>
            <Modal
                animationType="none"
                transparent={true}
                visible={show}
                statusBarTranslucent={true}
            >
                <View style={{alignItems:'center', justifyContent: 'center', width:'100%', height: '100%'}}>
                    <View style={{
                        height: '90%',
                        width: '90%',
                        borderRadius: 15,
                        backgroundColor: '#25262B',
                        alignItems: 'center'
                    }}>
                        <View style={{alignItems:'center', justifyContent: 'center', height: '25%', width: '100%', borderBottomWidth: 1,  borderBottomColor: '#61636e'}}>
                            <Image source={require('../../assets/ico_list_big.png')}  style={{width: 42, height: 42}}  />
                            <Text style={{color: 'white', fontSize: 24, fontWeight: '700', marginTop: 13}}>About Mission</Text>
                        </View>
                        <PagerView 
                            style={styles.pagerView} 
                            initialPage={0}
                            showPageIndicator={true}
                            >
                            <View key="1" style={styles.pageview}>
                                <Text style={styles.heading}>TITLE</Text>
                                <Text style={styles.desc}>LOREM IPSUM COLOR AMET CONSECTETUR ADIFICInG ELIT AENEANET TELLUS JUSTO SED NEC SODALES EST NUNC VENENATIS TELLUS AT LEO POSUERE VITAE INTERDuM MI CONSEQUAT PELLENTESQUE NECLACUS</Text>
                                <Text style={styles.heading}>REWARRDS</Text>
                                <Text style={styles.desc}>LOREM IPSUM COLOR AMET CONSECTETUR ADIFICInG ELIT AENEANET TELLUS JUSTO SED NEC SODALES EST NUNC VENENATIS TELLUS AT LEO POSUERE VITAE INTERDuM MI CONSEQUAT PELLENTESQUE NECLACUS</Text>
                            </View>
                            <View key="2" style={styles.pageview}>
                                <Text style={styles.heading}>TITLE</Text>
                                <Text style={styles.desc}>LOREM IPSUM COLOR AMET CONSECTETUR ADIFICInG ELIT AENEANET TELLUS JUSTO SED NEC SODALES EST NUNC VENENATIS TELLUS AT LEO POSUERE VITAE INTERDuM MI CONSEQUAT PELLENTESQUE NECLACUS</Text>
                                <Text style={styles.heading}>REWARRDS</Text>
                                <Text style={styles.desc}>LOREM IPSUM COLOR AMET CONSECTETUR ADIFICInG ELIT AENEANET TELLUS JUSTO SED NEC SODALES EST NUNC VENENATIS TELLUS AT LEO POSUERE VITAE INTERDuM MI CONSEQUAT PELLENTESQUE NECLACUS</Text>
                            </View>
                        </PagerView>
                        
                        <RoundButton
                            title='GOT IT'
                            type='outline'
                            backgroundColor='#25262B'
                            onPress={
                                ()=>{
                                    //setShow(false);
                                    onClose();
                                }
                            }
                        />  
                    </View>
                </View>

                
            </Modal>
        </>
    );
}

export default AboutMission;