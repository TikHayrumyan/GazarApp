import React from 'react';
import {View} from 'react-native';
import {useAppSelector} from '../hooks';

import {components} from '../components';
import {screens} from '../screens';
import {tabs} from '../constants';
import { useTranslation } from 'react-i18next';

const TabNavigator: React.FC = (): JSX.Element => {
  const currentTabScreen = useAppSelector((state) => state.tab.screen);
  const {t} = useTranslation()
  const {Header, SmartView, TabBar, TabBarItem} = components;

  const renderHeader = () => {
    const title = () => {
      if (currentTabScreen === 'Profile') {
        return `${t("MyProfile")}`;
      }
      if (currentTabScreen === 'Shop') {
        return `${t("Shop")}`;
      }
      if (currentTabScreen === 'Order') {
        return `${t("Order")}`;
      }
    };

    const border = () => {
      if (currentTabScreen === 'Home') {
        return true;
      }
      if (currentTabScreen === 'Shop') {
        return true;
      }
      if (currentTabScreen === 'Order') {
        return true;
      }
      if (currentTabScreen === 'Profile') {
        return true;
      }
      if (currentTabScreen === 'Categories') {
        return true;
      }
    };

    const search = () => {
      if (currentTabScreen === 'Categories') {
        return true;
      }
    };

    return (
      <Header
        burgerMenu={true}
        goBack={false}
        basket={true}
        border={border()}
        title={title()}
        search={search()}
      />
    );
  };

  const renderScreen = () => {
    return (
      <View style={{flex: 1}}>
        {currentTabScreen === 'Home' && <screens.Home />}
        {currentTabScreen === 'Categories' && <screens.Categories />}
        {currentTabScreen === 'Order' && <screens.Order />}
        {currentTabScreen === 'Shop' && <screens.Shop />}
        {currentTabScreen === 'Profile' && <screens.Profile />}
      </View>
    );
  };

  const renderBottomBar = () => {
    return (
      <TabBar>
        {tabs.map((tab, index) => {
          return (
            <TabBarItem
              tab={tab}
              key={index}
              currentTabScreen={currentTabScreen}
            />
          );
        })}
      </TabBar>
    );
  };

  return (
    <SmartView>
      {renderHeader()}
      {renderScreen()}
      {renderBottomBar()}
    </SmartView>
  );
};

export default TabNavigator;
