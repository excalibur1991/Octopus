import {
    View,
    Text,
    Ripple,
    Image,
    StyleSheet

} from 'react-native';
import { dark_theme } from '../../services/Common/theme';

const styles = StyleSheet.create({
    tut_desc_heading: {
        color: '#FFF',
        fontFamily: 'Moon-Bold',
        fontSize: 24,
        lineHeight: 24,
    },
    tut_description: {
        marginTop: 15,
        color: '#FFF',
        fontFamily: 'Moon-Light',
        fontSize: 12,
        lineHeight: 20,
    }
});


const tutStepDesc = [
    'tut_description',
    'tut_drawface',
    'tut_press_annotate',
    'tut_annotation',
    'tut_aiframe',
    'tut_need_editing',
    'tut_edit_annotation',
    'tut_swipe_left',
    'tut_swiipe_right',
    'tut_completed'
];

const TutDesc = ({title, desc}) =>{
    return (
      <>
        <Text style={styles.tut_desc_heading}>{title}</Text>
        <Text style={styles.tut_description}>{desc}</Text>
        <View style={{height: 50}}></View>
       </>
    );

}

const handleNextTut = () =>{
    if(tutStepIndex < tutStepDesc.length){
      setTutStepIndex(tutStepIndex+1);
      setTutStep(tutStepDesc[tutStepIndex + 1]);
    }
}

const TutorialOverlay = (props) => {
return (
    <>
    {(tutStep === 'tut_description') && (
    <View>
        <TutDesc 
        title={'ABOUT PLAY AI'}
        desc={'Play AI is a game where Sed sed interdum est. Donec iaculis et tortor non porta. Donec suscipit fermentum purus, in dictum mi consequat ut. Mauris vulputate turpis vestibulum tortor pretium condimentum. Donec leo elit, luctus et feugiat sit amet, vulputate nec est. Mauris bibendum ante ultrices tellus laoreet'}
        />

        <TutDesc 
        title={'How to Play:'}
        desc={'Play AI is a game where Sed sed interdum est. Donec iaculis et tortor non porta. Donec suscipit fermentum purus, in dictum mi consequat ut. Mauris vulputate turpis vestibulum tortor pretium condimentum. Donec leo elit, luctus et feugiat sit amet, vulputate nec est. Mauris bibendum ante ultrices tellus laoreet, in pharetra risus.'}
        />
    </View>
    )}
    {
    (tutStep === 'tut_drawface') && (
        <View style={{flex:1, justifyContent: 'flex-end'}}>
        <TutDesc 
            title={'DRAW THE FACE'}
            desc={'Annotate the face by clicking on the boxes'}
        />
        </View>
    )
    }
    {
    (tutStep === 'tut_press_annotate') && (
        <View>
        <TutDesc 
            title={'PRESS \'ANNOTATE\''}
            desc={'Press Annotate to finish'}
        />
        </View>
    )
    }
    {
    (tutStep === 'tut_annotation' ) && (
        <View>
        <TutDesc 
            title={'ANNOTATION'}
            desc={'Annotation is displayed in the coloured boxes'}
        />
        </View>
    )
    }
    {(tutStep === 'tut_aiframe') && (
    <View>
        <TutDesc 
        title={'AI FRAME'}
        desc={'AI frame is displayed in the gradient square'}
        />
    </View>
    ) } 
    {(tutStep === 'tut_need_editing') && (
    <View>
        <TutDesc 
        title={'IMAGE NEEDS EDITING'}
        desc={'If the AI framedoese not match the annotation, you can edit incoreect parts'}
        />
    </View>
    )}
    {(tutStep === 'tut_edit_ai') && (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TutDesc
        title={'EDIT AI'}
        desc={'If the annotation does not match the AI frame annotation, you can reannotate the face.'} 
        />
    </View>
    )}
    {(tutStep === 'tut_edit_annotation') && (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TutDesc
        title={'EDIT ANNOTATION'}
        desc={'If the annotation does not match the AI frame annotation, you can reannotate the face.'} 
        />
    </View>
    )}
    {(tutStep === 'tut_swipe_left') && (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TutDesc
        title={'SWIPE LEFT TO REPORT'}
        desc={'If the image contains inappropriate content, You canallways report it to be removed.'}
        />
    </View>
    )}
    {(tutStep === 'tut_swiipe_right') && (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TutDesc
        title={'SWIPE RIGHT TO VERIFY'}
        desc={'If the AI frame matches the annotation, you can verify.'}
        />
    </View>
    )}
    {(tutStep === 'tut_completed') && (
    <View style={{
        flex: 1, 
        justifyContent: 'center', 
        alignContent:'center', 
        alignItems: 'center'}}>
        <Text style={{
        color: '#FFF',
        fontFamily: 'Moon-Bold',
        fontSize: 32,
        textAlign: 'center'
        }}>TUTORIAL COMPLETED</Text>
        <Text style={{
        color: '#FFF',
        fontFamily: 'Moon-Bold',
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 20
        }}>EXIT TUTORIAL MODE BY CLICKING THE BUTTON BELOW</Text>

        <Ripple
        onPress={() =>{
            onExitTutorial();
        }}
        outerStyle={{
            borderRadius: 30,
            backgroundColor: dark_theme.COLORS.BG_GREY,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center'
        }}
        innerStyle={{
            height: 60,
            width: 60,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Image source={require('../../assets/ico_close.png')} />
        </Ripple>
    </View>
    )}
    </>
);

}
