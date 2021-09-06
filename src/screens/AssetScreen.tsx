import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AssetScreen = ({ route, navigation }) => {
  const { workspace } = route.params || [];
  //   console.log(workspace);
  return (
    <View>
      <Text>AssetScreen</Text>
    </View>
  );
};

export default AssetScreen;

const styles = StyleSheet.create({});
