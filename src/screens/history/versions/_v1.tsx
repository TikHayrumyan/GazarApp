import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Accordion from 'react-native-collapsible/Accordion';

import {components} from '../../../components';
import {history} from '../../../constants';

const _v1 = ({data}:{data:any}) => {
  const [activeSections, setActiveSections] = useState<any[]>([]);
  const setSections = (data: any) => {
    setActiveSections(data.includes(undefined) ? [] : data);
  };
 
  const contentStyles = {
    paddingRight: 20,
    marginLeft: 20,
  };

  const accordionHeader = (data: any) => {
    
    return <components.HistoryDataHeader data={data} />;
  };

  const accordionContent = (data: object) => {
    return (
      <View style={{...contentStyles}}>
        <components.ContainerData type='history' data={data} />
        {/* <components.HistoryDataFooter version={1} /> */}
      </View>
    );
  };

  const renderContent = () => {
    return (
      <Accordion
        activeSections={activeSections}
        sections={data}
        touchableComponent={TouchableOpacity}
        renderHeader={accordionHeader}
        renderContent={accordionContent}
        duration={400}
        onChange={setSections}
      />
      
    );
  };

  return renderContent();
};

export default _v1;
