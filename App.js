import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainLayout from './src/components/Main/MainLayout';
import {themes} from './src/constants/context';
import {ThemeContext, LoadingContext, MockupDataContext} from 'context';
import AuthenticationProvider from './src/provider/authenticationProvider';
import mockupData from 'context/mockupData';
import { Container } from 'native-base';
import {Provider} from 'react-redux';
import store from './src/store';
import './src/core/interceptors';

export default function App() {
  const [theme, setTheme] = useState(themes.light);
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <Provider store={store}>
        <ThemeContext.Provider value={{theme, setTheme}}>
          <LoadingContext.Provider value={{loading, setLoading}}>
            <MockupDataContext.Provider value={mockupData}>
              <AuthenticationProvider>
                <NavigationContainer>
                  <MainLayout />
                </NavigationContainer>
              </AuthenticationProvider>
            </MockupDataContext.Provider>
          </LoadingContext.Provider>
        </ThemeContext.Provider>
      </Provider>
    </Container>
  );
}
