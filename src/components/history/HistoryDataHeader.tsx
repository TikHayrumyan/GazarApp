import {View, Text} from 'react-native';
import React, { useState } from 'react';

import {theme} from '../../constants';
import {text} from '../../text';

type Props = {
  data: any;
};

const HistoryDataHeader: React.FC<Props> = ({data}) => {
  const [DateOrder, setDateOrder] = useState<any>(data.date);

  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: theme.colors.lightBlue,
        padding: 20,
        paddingLeft: 0,
        marginLeft: 20,
      }}
    >
      
      <View>
      
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <text.H5>{data?.address}</text.H5>
        <text.H5>{data?.totalPrice}֏</text.H5>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 12,
            lineHeight: 12 * 1.5,
            // color: renderStatusColor(),
          }}
        >
        </Text>
        <Text
          style={{
            fontSize: 12,
            lineHeight: 12 * 1.5,
            color: theme.colors.textColor,
          }}
        >
          {new Date(DateOrder).toLocaleString()}
        </Text> 
       </View>
      </View>
    </View>
  );
};

export default HistoryDataHeader;
