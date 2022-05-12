import React from 'react';
import styled from 'styled-components/native';

// Views and Text must have their own CSS for some reason
// Double check ziynx-mobile on how they do it
const StyledHeader = styled.View`
  background-color: #1936d1;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const StyledTitle = styled.Text`
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  margin: auto;
  color: #fff;
`;

const StyledText = styled.Text`
  font-size: 22px;
  text-align: center;
  color: #fff;
`;

const Header = (props) => {
  const { title, children } = props;
  return (
    <StyledHeader>
      <StyledTitle>{title}</StyledTitle>
      <StyledText>{children}</StyledText>
    </StyledHeader>
  );
};

export default Header;
