/**
 * @format
 */

import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './components/header';
import { TextInput, SelectInput } from './components/inputs';
import Button from './components/buttons';
import Aisle from './components/aisles';

// Use FlatList for data? Look at props
// Remember: Depending on the component, a VIEW type component can't change text size and a TEXT component can't change height!
// A good example is the TextInput component here. Just keep it the way it is, but that's why padding works and not height..it's Text!!
// Trying to do this without redux

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('grocerybuddy');
    return jsonValue !== null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log(e);
  }
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('grocerybuddy', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const ListContainer = styled.View`
  background-color: #1936d1;
  width: 100%;
  min-height: 200px;
`;

const App = () => {
  const [selectedValue, setSelectedValue] = useState('Produce');
  const onChangeAisleValue = (aisleValue, index) => {
    setSelectedValue(aisleValue);
  };

  const [itemValue, setItemValue] = useState('');
  const onChangeItemText = (text) => {
    setItemValue(text);
  };
  const [qtyValue, setQtyValue] = useState('');
  const onChangeQtyText = (text) => {
    setQtyValue(text);
  };

  const [aisles, setAisles] = useState([]);

  // Stack will reset when the state of the component does
  const [tempStack, setTempStack] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getData();
        setAisles(data);
      } catch (e) {
        console.log(e);
      }
    };

    loadData();
  }, []);

  const headExists = (aisleID) => {
    for (let i = 0, length = aisles.length; i < length; i++) {
      if (aisles[i].id === aisleID) {
        return true;
      }
    }
    return false;
  };

  // When adding an item to the list
  const addItem = (aisleID, itemVal, qtyVal) => {
    let result;
    if (headExists(aisleID)) {
      result = aisles.map((aisle) => {
        if (aisle.id === aisleID) {
          aisle.items.push({
            aisleID: aisleID,
            id: itemVal,
            value: itemVal,
            qtyValue: qtyVal,
          });
        }
        return aisle;
      });
      setAisles(result);
    } else {
      result = [
        ...aisles,
        {
          id: aisleID,
          name: aisleID,
          items: [{ id: itemVal, value: itemVal, qtyValue: qtyVal }],
        },
      ];
      setAisles(result);
    }
    setItemValue('');
    setQtyValue('');
    storeData(result);
  };

  // When removing an item from list
  const removeItem = (aisleID, itemId, index) => {
    let newItems = [];
    for (let i = 0, length = aisles.length; i < length; i++) {
      if (aisles[i]?.id === aisleID) {
        newItems = aisles[i]?.items?.filter((item) => item?.id !== itemId);
        // Place item into stack
        const newStack = [...tempStack, aisles[i]?.items?.[index]];
        setTempStack(newStack);
      }
    }
    const result = aisles.map((aisle) => {
      if (aisle.id === aisleID) {
        aisle.items = newItems;
      }
      return aisle;
    });
    setAisles(result);
    storeData(result);
  };

  const undoDelete = () => {
    // Pop the last item from the stack and add it to the aisles state
    const lastItem = tempStack.pop();
    addItem(lastItem?.aisleID, lastItem?.value, lastItem?.qtyValue);
  };

  const renderAisles = () => {
    const results = aisles.map((aisle, index) => {
      return (
        <Aisle
          key={aisle.name + index}
          id={aisle.name}
          name={aisle.name}
          items={aisle.items}
          removeItem={removeItem}
        />
      );
    });
    return <ListContainer>{results}</ListContainer>;
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Header title="Welcome to Grocery Buddy">
            Let me help you sort your list!
          </Header>
        </View>
        <View>
          <SelectInput
            selectedValue={selectedValue}
            onValueChange={onChangeAisleValue}
          />
          <TextInput
            value={itemValue}
            placeholder="Item"
            onChangeText={onChangeItemText}
          />
          <TextInput
            value={qtyValue}
            placeholder="Qty/Details"
            onChangeText={onChangeQtyText}
          />
          <Button onPress={() => addItem(selectedValue, itemValue, qtyValue)}>
            Add Item
          </Button>
          {!!tempStack.length && (
            <Button undo onPress={undoDelete}>
              Undo Delete
            </Button>
          )}
        </View>
        {renderAisles()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
