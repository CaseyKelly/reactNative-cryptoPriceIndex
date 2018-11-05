import React from 'react';
import { StyleSheet } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const coinList = [
  {
    title: 'litecoin',
    icon: 'litecoin'
  },
  {
    title: 'dogecoin',
    icon: 'dog'
  },
  {
    title: 'monero',
    icon: 'cash'
  }
];

const AssetList = ({ loading, price, onPress }) => {
  return (
    <List containerStyle={styles.list}>
      {coinList.map(item => (
        <ListItem
          key={item.title}
          title={item.title.toUpperCase()}
          hideChevron={true}
          subtitle={`Current price = ${
            loading ? 'Loading...' : price[item.title] + ' BTC'
          }`}
          leftIcon={
            <MaterialCommunityIcons name={item.icon} style={styles.icon} />
          }
        />
      ))}
      <Button
        large={true}
        raised={true}
        containerViewStyle={styles.button}
        backgroundColor={'#f4511e'}
        onPress={onPress}
        title="See Historical Price Data"
        accessibilityLabel="Learn more about this purple button"
        rightIcon={{ name: 'insert-chart' }}
      />
    </List>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 0
  },
  icon: {
    fontSize: 40,
    padding: 10
  },
  button: {
    padding: 20
  }
});

export default AssetList;
