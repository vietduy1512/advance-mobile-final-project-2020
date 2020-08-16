import React from "react";
import ThemeSettings from "./Settings/ThemeSettings";
import LanguageSettings from "./Settings/LanguageSettings";
import UserInfo from "./Settings/UserInfo";
import UpdateUserInfo from "./Settings/UpdateUserInfo";
import SettingsMain from "./Settings/Settings";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingScreens } from "constants";

const SettingsStack = createStackNavigator();

const SettingsLayout = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name={SettingScreens.MAIN}
      component={SettingsMain}
      options={{ headerShown: false }}
    />
    <SettingsStack.Screen
      mode="modal"
      name={SettingScreens.THEME}
      component={ThemeSettings}
      options={{ headerShown: false }}
    />
    <SettingsStack.Screen
      mode="modal"
      name={SettingScreens.LANGUAGE}
      component={LanguageSettings}
      options={{ headerShown: false }}
    />
    <SettingsStack.Screen
      mode="modal"
      name={SettingScreens.USER_INFO}
      component={UserInfo}
      options={{ headerShown: false }}
    />
    <SettingsStack.Screen
      mode="modal"
      name={SettingScreens.UPDATE_USER_INFO}
      component={UpdateUserInfo}
      options={{ headerShown: false }}
    />
  </SettingsStack.Navigator>
);

export default SettingsLayout;
