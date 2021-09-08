/* eslint disable */
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useDrawerConfig from "../../hooks/useDrawerConfig";
import { DrawerConfig } from "../../interfaces/Drawer";
import { useQuery, gql } from "@apollo/client";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { iWorkspace } from "../../interfaces/Workspace";
import { AppContext } from "../../contexts/AppProvider";
import Ionicons from "@expo/vector-icons/Ionicons";

const GET_WORKSPACES = gql`
  query allWorkspaces($input: InputWorkspaceGet!) {
    allWorkspaces(input: $input) {
      id
      title
      isSchoolWorkspace
      feed {
        id
        feedName
      }
      assets {
        id
        assetName
      }
      visio
    }
  }
`;

function CustomDrawerContent(props) {
  const drawerConfig = useDrawerConfig();
  const { data } = useQuery(GET_WORKSPACES, {
    variables: {
      input: {
        isSchoolWorkspace: false,
        schoolId: "2",
      },
    },
  });
  const [workspacesStudent, setWorkspacesStudent] = useState<iWorkspace[]>([]);

  useEffect(() => {
    if (data) {
      setWorkspacesStudent(data.allWorkspaces);
    }
  }, [data]);
  const { workspaces, firstFeedOnHomePage, loading } = useContext(AppContext);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const navigation: any = useNavigation();

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.appLogo}>
        <Image
          style={{ width: 170, height: 120 }}
          source={require("../../../assets/logo-ds.png")}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <View style={styles.titleContainer}>
          <Ionicons name="home" size={20} />
          <Text style={styles.title}>Ecoles / Formation</Text>
        </View>
        {workspaces.map((el: iWorkspace) => {
          return (
            <List.AccordionGroup key={el.id}>
              <List.Accordion
                style={styles.listAccordion}
                title={el.title}
                id={el.id}>
                <List.Item
                  style={styles.listItem}
                  title={el.feed[0].feedName}
                  onPress={() => {
                    navigation.navigate("Feed", {
                      workspace: el,
                    });
                  }}
                />
                <List.Item
                  style={styles.listItem}
                  title={el.assets[0].assetName}
                  onPress={() => {
                    navigation.navigate("Assets", {
                      workspace: el,
                    });
                  }}
                />
              </List.Accordion>
            </List.AccordionGroup>
          );
        })}
        <View style={styles.titleContainer}>
          <Ionicons name="person" size={20} />
          <Text style={styles.title}>Espace de Travail</Text>
        </View>
        {workspacesStudent.map((el: iWorkspace) => {
          return (
            <List.AccordionGroup key={el.id}>
              <List.Accordion
                style={styles.listAccordion}
                title={el.title}
                id={el.id}>
                <List.Item
                  style={styles.listItem}
                  title={el.feed[0].feedName}
                  onPress={() => {
                    navigation.navigate("Feed", {
                      workspace: el,
                    });
                  }}
                />
                <List.Item
                  style={styles.listItem}
                  title={el.assets[0].assetName}
                />
              </List.Accordion>
            </List.AccordionGroup>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "white",
  },
  appLogo: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 5,
    color: "#2b2b2b",
    fontWeight: "400",
  },
  listAccordion: {
    backgroundColor: "white",
    paddingLeft: 30,
  },
  listItem: {
    paddingLeft: 50,
    backgroundColor: "white",
  },
});

export default CustomDrawerContent;
