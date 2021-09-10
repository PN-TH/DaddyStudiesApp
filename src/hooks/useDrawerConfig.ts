import { Component } from "react";
import { DrawerConfig } from "../interfaces/Drawer";
import AssetScreen from "../screens/AssetScreen";
import CommentScreen from "../screens/CommentScreen";
import FeedScreen from "../screens/FeedScreen";
import LoginScreen from "../screens/LoginScreen";


/*
 *  Gestion de la configuration du Drawer
 */
const useDrawerConfig = () => {
  const drawerConfig: DrawerConfig[] = [
    {
      routeName: "Feed",
      labelRoute: "Social",
      component: FeedScreen,
    },
    {
      routeName: "Assets",
      labelRoute: "Ressources",
      component: AssetScreen,
    },
    {
      routeName: "Comments",
      labelRoute: "Commentaire",
      component: CommentScreen,
    },
    {
      routeName: "Login",
      labelRoute: "Login",
      component: LoginScreen,
    },

  ];

  return drawerConfig;
};

export default useDrawerConfig;
