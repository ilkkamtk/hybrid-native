import {Badge, Icon} from '@rneui/base';
import {Tabs} from 'expo-router';
import {View} from 'react-native';

import useUpdateContext from '../../../hooks/UpdateHook';
import useSocket from '../../../hooks/socketHooks';

const TabsLayout = () => {
  const {isConnected} = useSocket();
  const {newItems} = useUpdateContext();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <View style={{padding: 8}}>
              {newItems && <Icon name="refresh" />}
              <Badge status={isConnected ? 'success' : 'error'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="upload" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
