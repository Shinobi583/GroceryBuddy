import React, { useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import GestureRecognizer from 'react-native-swipe-gestures';
import AppText from '../text';

const StyledItem = styled.Pressable`
  background-color: white;
  max-height: 50px;
  ${'' /* Value below will turn to pixels only for some reason */}
  margin-left: ${({ marginLeft }) => `${marginLeft}px`};
`;

const AnimatedItem = Animated.createAnimatedComponent(StyledItem);

const Item = (props) => {
  const { index, aisleID, id, value, qtyValue, removeItem } = props;

  const marginLeftAnimatedValue = useRef(new Animated.Value(0)).current;

  const onSwipeRight = () => {
    Animated.timing(marginLeftAnimatedValue, {
      toValue: 360,
      duration: 350,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        removeItem(aisleID, id, index);
      }
    });
  };

  const gestureConfig = {
    velocityThreshold: 0.1,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer onSwipeRight={onSwipeRight} config={gestureConfig}>
      <AnimatedItem marginLeft={marginLeftAnimatedValue}>
        <AppText>{qtyValue === '' ? value : `${value} - ${qtyValue}`}</AppText>
      </AnimatedItem>
    </GestureRecognizer>
  );
};

export default Item;
