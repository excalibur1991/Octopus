import React, { useEffect, useRef } from "react";
import {View, Text } from "react-native";
import { Modalize } from 'react-native-modalize';

const BottomSheet = (props) => {

    const {
        panelHeight,
        children,
    } = props || {};

    const modalizeRef = useRef(null);

    useEffect(()=>{
        modalizeRef.current.open();
    }, [modalizeRef]);

    return (
        <>
            <Modalize 
                ref={modalizeRef}
                withHandle={false}
                withOverlay={false}
                withReactModal={false}
                panGestureEnabled={false}
                alwaysOpen={panelHeight}
                openAnimationConfig={{timing: { duration: 0 }}}
                handlePosition="outside"
                modalStyle={{backgroundColor: '#121212'}}
                >{children}</Modalize>
        </>
        );

}

export default BottomSheet;