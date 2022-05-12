import React from 'react';
import { useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native';

// HashMap to find faster
const aisles = {
  Produce: 'Produce',
  Deli: 'Deli',
  Bakery: 'Bakery',
  Bread: 'Bread',
  Meat: 'Meat',
  Pharmacy: 'Pharmacy',
  Baby: 'Baby',
  Candy: 'Candy',
  Snacks: 'Snacks',
  Baking: 'Baking',
  Cereal: 'Cereal',
  Coffee: 'Coffee',
  Condiments: 'Condiments',
  'Canned Goods': 'Canned Goods',
  Pasta: 'Pasta',
  International: 'International',
  Drinks: 'Drinks',
  Cleaning: 'Cleaning',
  'Paper Products': 'Paper Products',
  Beer: 'Beer',
  Dairy: 'Dairy',
  Frozen: 'Frozen',
  Pets: 'Pets',
  General: 'General',
  'Prepared Foods': 'Prepared Foods',
  Floral: 'Floral',
  Seafood: 'Seafood',
};

const StyledPicker = styled(Picker)`
  ${({ isDarkMode }) => isDarkMode && 'color: white'};
  padding-top: 40px;
  padding-bottom: 40px;
`;

const SelectInput = (props) => {
  const { selectedValue, onValueChange } = props;

  const isDarkMode = useColorScheme() === 'dark';

  const renderAisles = () => {
    const allAisles = [];

    Object.keys(aisles).forEach((aisle) => {
      allAisles.push(
        <Picker.Item
          key={aisle}
          label={aisle}
          value={aisle}
          color={isDarkMode && 'white'}
        />,
      );
    });

    return allAisles;
  };

  return (
    <StyledPicker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      isDarkMode={isDarkMode}
      dropdownIconColor={isDarkMode && '#FFF'}
      prompt="Aisles">
      {renderAisles()}
    </StyledPicker>
  );
};

export default SelectInput;
