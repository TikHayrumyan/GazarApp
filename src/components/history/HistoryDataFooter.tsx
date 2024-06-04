import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {svg} from '../../assets/svg';
import {theme} from '../../constants';
import Button from '../buttons/Button';
import {useAppNavigation} from '../../hooks';
import ArrowViewAllSvg from '../../assets/svg/ArrowViewAllSvg';

type Props = {
  version: number;
};

const HistoryDataFooter: React.FC<Props> = ({version}): JSX.Element => {
  const navigation = useAppNavigation();

  if (version === 1) {
    return (
      <Button
        title='repeat Order'
        containerStyle={{
          marginTop: 10,
          marginBottom: 20,
        }}
        onPress={() => navigation.navigate('TrackYourOrder')}
      />
    );
  }

  if (version === 2) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 10,
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <svg.RepeatSvg />
          <Text
            style={{
              marginLeft: 6,
              color: theme.colors.mainColor,
            }}
          >
            repeat order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('LeaveAReview')}
          style={{flexDirection: 'row', alignItems: 'center'}}
        >
          <Text
            style={{
              marginRight: 6,
              color: theme.colors.mainColor,
            }}
          >
            leave a review
          </Text>
          <ArrowViewAllSvg color={theme.colors.black} style={{marginTop: 1}} />
        </TouchableOpacity>
      </View>
    );
  }

  return <></>;
};

export default HistoryDataFooter;
