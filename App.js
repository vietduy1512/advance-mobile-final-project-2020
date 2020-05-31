import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainLayout from './src/components/Main/MainLayout';
import {themes} from './src/constants/context';
import {ThemeContext} from 'context';
import {MockupDataContext} from 'context';
import mockupData from 'context/mockupData';

export default function App() {
  const [theme, setTheme] = useState(themes.light)

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <MockupDataContext.Provider value={mockupData}>
        <NavigationContainer>
          <MainLayout />
        </NavigationContainer>
      </MockupDataContext.Provider>
    </ThemeContext.Provider>
  );
}
