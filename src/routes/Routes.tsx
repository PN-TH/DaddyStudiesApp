import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import useDrawerConfig from "../hooks/useDrawerConfig";
import CustomDrawerContent from "../components/navigation/CustomDrawerContent";
import { NavigationContainer } from "@react-navigation/native";

// Création des Navigators
const Drawer = createDrawerNavigator();

// Navigator du Drawer
export const DrawerNavigator = () => {
  // Lors de l'implémentation d'une route, ajouter un objet au tableau drawerConfig dans hooks/useDrawerConfig.ts
  const drawerConfig = useDrawerConfig();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName={"Feed"}>
        {/* Déclaration des écrans selon configuration */}
        {drawerConfig.map((screen: any, index: number) => {
          return (
            <Drawer.Screen
              name={screen.routeName}
              component={screen.component}
              key={index}
            />
          );
        })}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
