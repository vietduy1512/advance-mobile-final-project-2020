import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainLayout from './src/components/Main/MainLayout';
import {themes} from './src/constants/context';
import {ThemeContext} from 'context';

export default function App() {
  const [theme, setTheme] = useState(themes.light)

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <NavigationContainer>
        <MainLayout />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
