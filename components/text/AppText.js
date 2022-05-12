import React from 'react';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  color: ${({ head }) => (head ? '#fff' : '#000;')};
  font-size: 22px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const AppText = (props) => {
  const { head, children } = props;

  return <StyledText head={head}>{children}</StyledText>;
};

export default AppText;
