import React from 'react';
import styled from 'styled-components/native';
import AppText from '../text';
import Item from '../items';

// View for now, use FlatList later
const StyledAisle = styled.View`
  margin-top: 20px;
  border: 1px solid #0e153a;
`;

const Aisle = (props) => {
  const { id, name, items, removeItem } = props;
  if (!items || items.length === 0) {
    return null;
  }

  const renderItems = () => {
    return items.map((item, index) => (
      <React.Fragment key={item.value + '2'}>
        <Item
          key={item.value}
          index={index}
          aisleID={id}
          id={item.id}
          value={item.value}
          qtyValue={item.qtyValue}
          removeItem={removeItem}
        />
      </React.Fragment>
    ));
  };

  return (
    <StyledAisle id={id}>
      <AppText head>{name}</AppText>
      {renderItems()}
    </StyledAisle>
  );
};

export default Aisle;
