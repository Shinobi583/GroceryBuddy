import React from 'react';
import styled from 'styled-components/native';

// Perhaps change to Pressable from React-Native? (newer)
const StyledButton = styled.TouchableOpacity`
  background-color: ${({ undo }) => (undo ? '#d12222' : '#2dcc4f')};
  height: 80px;
`;

const StyledText = styled.Text`
  text-align: center;
  font-size: 22px;
  margin: auto;
  color: ${({ undo }) => (undo ? '#fff' : '#0e153a')};
`;

const Button = (props) => {
  const { undo, onPress, children } = props;

  return (
    <StyledButton undo={undo} onPress={onPress}>
      <StyledText undo={undo}>{children}</StyledText>
    </StyledButton>
  );
};

export default Button;
