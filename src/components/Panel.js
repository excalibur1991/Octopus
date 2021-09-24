import React, {useState} from 'react';
import {Text, View, StyleSheet, Animated, Platform} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ripple from '../components/Ripple';

const Panel = ({title, children}) => {
  const [maxHeight, setMaxHeight] = useState();
  const [minHeight, setMinHeight] = useState();
  const [expanded, setExpanded] = useState(true);
  const [animation, setAnimation] = useState(null);

  const toggle = () => {
    let initialValue = expanded ? maxHeight + minHeight : minHeight,
      finalValue = expanded ? minHeight : maxHeight + minHeight;
    setExpanded(!expanded);
    animation.setValue(initialValue);
    Animated.spring(animation, {toValue: finalValue}).start();
  };

  const _setMaxHeight = (event) => {
    if (!animation) {
      setAnimation(
        new Animated.Value(event.nativeEvent.layout.height + minHeight),
      );
    }
    if (expanded) {
      setMaxHeight(event.nativeEvent.layout.height);
    }
  };

  const _setMinHeight = (event) => {
    setMinHeight(event.nativeEvent.layout.height);
  };

  return (
    <Animated.View style={[{height: animation}, styles.container]}>
      <Ripple
        outerStyle={styles.titleOuter}
        innerStyle={styles.titleInner}
        onLayout={_setMinHeight}
        onPress={toggle}>
        <>
          <AntIcon
            name={expanded ? 'caretup' : 'caretdown'}
            style={styles.caretIcon}
            color='#6C6C6C'
            size={13}
          />
          <Text style={styles.title}>{title}</Text>
        </>
      </Ripple>
      <View style={styles.bodyOuter}>
        <View style={styles.bodyInner} onLayout={_setMaxHeight}>
          {children}
        </View>
      </View>
    </Animated.View>
  );
};

export default Panel;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  caretIcon: {
    textAlign: 'center',
    marginRight: 5,
  },
  titleOuter: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#fff',
  },
  titleInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
  },
  title: {
    fontSize: 13,
    color: '#6C6C6C',
    fontWeight: Platform.OS === 'android' ? 'bold' : '500',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  bodyOuter: {
    backgroundColor: '#4a4a4a',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: '3%',
  },
  bodyInner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
