import React, { useRef } from "react";
import {View, Text } from "react-native";
import { Modalize } from 'react-native-modalize';

const BottomSheet = (props) => {

    const {
        panelHeight,
        children,
    } = props || {};

    const modalizeRef = useRef(null);

    return (
        <>
            <Modalize 
                ref={modalizeRef}
                withHandle={false}
                withOverlay={false}
                withReactModal={false}
                modalHeight={panelHeight+30}
//                childrenStyle={{height:panelHeight}}
//                adjustToContentHeight={true}
                alwaysOpen={panelHeight+30}
                handlePosition="outside"
                modalStyle={{backgroundColor: '#121212'}}
                >{children}</Modalize>
        </>
        );

}

export default BottomSheet;