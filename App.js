import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainLayout from './src/screens/MainLayout';
import {themes} from './src/constants/context';
import {ThemeContext, LoadingContext, MockupDataContext} from './src/config/context';
import AuthenticationProvider from './src/config/provider/authenticationProvider';
import mockupData from './src/config/context/mockupData';
import { Container } from 'native-base';
import {Provider} from 'react-redux';
import store from './src/core/store';
import './src/config/interceptors';

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
