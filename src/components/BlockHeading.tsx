import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {text} from '../text';
import ArrowViewAllSvg from '../assets/svg/ArrowViewAllSvg';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  onPress: () => void;
  containerStyle?: object;
  styleContent?: object;
};

const BlockHeading: React.FC<Props> = ({
  title,
  onPress,
  containerStyle,
  styleContent,
}) => {
  const {H3, T16, T14} = text;
  const {t} = useTranslation()
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
        ...containerStyle,
      }}
    >
      <H3 style={styleContent}>{title}</H3>
      <TouchableOpacity
        onPress={onPress}
        style={{flexDirection: 'row', alignItems: 'center'}}
      >
        <T16 style={{...styleContent, marginRight: 7}}>{t("viewAll")}</T16>
        <ArrowViewAllSvg color={"#000"} />
      </TouchableOpacity>
    </View>
  );
};

export default BlockHeading;
