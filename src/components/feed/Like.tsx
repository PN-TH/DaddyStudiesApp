import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icons from "@expo/vector-icons/AntDesign";

const Like = () => {
  return (
    <View>
      <View style={styles.likeContainer}>
        <Icons name="like1" size={24} style={styles.icons} />
        <Text style={{ fontSize: 16 }}>0</Text>
      </View>
    </View>
  );
};

export default Like;

const styles = StyleSheet.create({
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    color: "#3b3b3b",
    marginRight: 5,
  },
});
