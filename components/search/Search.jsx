import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Input, InputField, InputIcon, InputSlot } from "../ui/input";
import { SearchIcon } from "../ui/icon";


const styles = StyleSheet.create({});
export default function Search({onSearch}) {

  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (text) => {
    setSearchText(text);
    onSearch(text);  
  };

  return (
    <View>
      <Input
        variant="rounded"
        size="xl"
        className="m-[10] rounded-full border border-gray-300 focus:border-none"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
      >
        <InputSlot className="pl-3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField value={searchText}  onChangeText={handleSearchChange} placeholder="Search" />
      </Input>
    </View>
  );
}