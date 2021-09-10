import React, { createContext, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { iWorkspace } from '../interfaces/Workspace';
import { iUsers } from '../interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext(null);

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

const AppProvider = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<iWorkspace[]>([]);
  const [firstFeedOnHomePage, setFirstFeedOnHomePage] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState<boolean>(false);

  const { loading, error, data } = useQuery(GET_WORKSPACES, {
    variables: {
      input: {
        isSchoolWorkspace: true,
        schoolId: '1',
      },
    },
  });

  useEffect(() => {
    if (data) {
      setWorkspaces(data.allWorkspaces);
      setFirstFeedOnHomePage(data.allWorkspaces[0].id);
    }
  }, [data]);

  return (
    <AppContext.Provider
      value={{
        workspaces,
        setWorkspaces,
        loading,
        firstFeedOnHomePage,
        refresh,
        setRefresh,
        userLogged,
        setUserLogged,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
