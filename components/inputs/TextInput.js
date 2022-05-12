import React from 'react';
import { useColorScheme } from 'react-native';
import styled from 'styled-components/native';

const StyledTextInput = styled.TextInput`
  border: 1px solid gray;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 22px;
  text-align: center;
  ${({ isDarkMode }) => isDarkMode && 'color: white'};
`;

const TextInput = (props) => {
  const { value, placeholder, onChangeText } = props;

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <StyledTextInput
      value={value}
      placeholder={placeholder}
      placeholderTextColor={isDarkMode && 'white'}
      onChangeText={onChangeText}
      isDarkMode={isDarkMode}
    />
  );
};

export default TextInput;
