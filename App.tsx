import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Routes from "./src/routes/Routes";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daddy Studies</Text>
      <Routes />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
  },
});

export default App;
