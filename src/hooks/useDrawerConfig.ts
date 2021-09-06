import { Component } from "react";
import { DrawerConfig } from "../interfaces/Drawer";
import AssetScreen from "../screens/AssetScreen";
import CommentScreen from "../screens/CommentScreen";
import FeedScreen from "../screens/FeedScreen";

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
  ];

  return drawerConfig;
};

export default useDrawerConfig;
