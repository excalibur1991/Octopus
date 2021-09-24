import {
    View,
    StyleSheet,
    Dimensions,
    VirtualizedList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../services/State/State';
import {theme} from '../services/Common/theme';
import {withTranslation} from 'react-i18next';
import HTML from 'react-native-render-html';
/**
 * Privacy Information
 * https://alpha.dataunion.app/image_categorization/
 * 
 * @param {*} param0 
 * @returns 
 */



const ImageCategorization = ({navigation, t}) => {

    const [, dispatch] = useStateValue();
    const [listView, setListView] = useState(null);

    
const image_categorization = [
    {
        tag: 'header',
        content: t('ImageCategorization.mainHeader.content')
    },
    {
        tag: 'info',
        content: t('ImageCategorization.info.content')
    },
    {
        tag: 'why',
        content: t('ImageCategorization.why.content')

    },
    {
        tag: 'how',
        content: t('ImageCategorization.how.content')

    },
    {
        tag: 'biometric',
        content: t('ImageCategorization.biometric.content')

    },
    {
        tag: 'faces',
        content: t('ImageCategorization.faces.content')

    },
    {
        tag: 'nonFaces',
        content: t('ImageCategorization.nonFaces.content')

    },
    {
        tag: 'nonPII',
        content: t('ImageCategorization.nonPII.content')

    },
];
   
    useEffect(()=>{
        }, []);

    const classesStyles = {
    
    }
        
    const tagsStyles = {
        h1: {
            color: '#6C6C6C',
            textAlign: 'center',
            marginBottom: 10
        },
        h2: {
            color: '#6C6C6C',
        },
        h4: {
            color: '#41474E',
            fontSize: 16,
            textAlign: 'center'
        },
        img: {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 20,
            width: Dimensions.get('window').width * .85,
        },
        label: {
            color: '#41474E',
        },
        b: {
            color: '#000000'
        },
        a: {
            color: '#ff4092'
        },
        p: {
            textAlign: 'justify',
            color: '#4a4a4a',
        }
    };

    const renderersProps = {
        a: {
          onPress(event, url, htmlAttribs, target) {
            Linking.openURL(url)
          }
        }
    };
     
    return (
        <View style={styles.container}>
             <VirtualizedList 
            showsVerticalScrollIndicator={false}
            ref={(view)=>{setListView(view)}}
            data={image_categorization}
            keyExtractor={(item, index) => index}
            renderItem={(item ) => {
                    if(item.item.tag == 'header'){
                        return (
                            <HTML 
                            source={{html: item.item.content}} 
                            imagesMaxWidth={Dimensions.get('window').width * .9 } 
                            staticContentMaxWidth={Dimensions.get('window').width * .9 }
                            tagsStyles={tagsStyles}
                            classesStyles={classesStyles}
                            renderersProps={renderersProps}
                        />
                        )
                    }else{
                        return (
                            <HTML 
                                source={{html: item.item.content}} 
                                imagesMaxWidth={Dimensions.get('window').width * .9 } 
                                staticContentMaxWidth={Dimensions.get('window').width * .9 }
                                tagsStyles={tagsStyles}
                                classesStyles={classesStyles}
                                renderersProps={renderersProps}
                            />
                        )
                    }

            }}
            getItem={(data, index)=>(data[index])}
            getItemCount={()=>image_categorization.length}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      marginTop: '2%',
      paddingTop: '5%',
      paddingHorizontal: 25,
      alignItems: 'center',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: theme.SCREEN_BACK_COLOR_1,
    }
});


export default withTranslation()(ImageCategorization);