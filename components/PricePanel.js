import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

const PricePanel = ({ assetName, lowestPrice, highestPrice }) => {
  return (
    <View>
      <Text h4 style={styles.heading}>
        {assetName}
      </Text>
      <Text style={styles.price}>{lowestPrice}</Text>
      <Text style={styles.subheading}>
        <Text style={styles.lowest}>Lowest</Text> price in
      </Text>
      <Text style={styles.subheading}>past 30 mins</Text>
      <View style={styles.highestSubhead}>
        <Text style={styles.price}>{highestPrice}</Text>
        <Text style={styles.subheading}>
          <Text style={styles.highest}>Highest</Text> price in
        </Text>
        <Text style={styles.subheading}>past 30 mins</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: '#f4511e',
    fontWeight: '200',
    paddingBottom: 10
  },
  subheading: {
    fontSize: 12,
    textAlign: 'center'
  },
  highestSubhead: {
    paddingTop: 20
  },
  price: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 2,
    fontWeight: '200'
  },
  lowest: {
    color: 'green'
  },
  highest: {
    color: 'red'
  }
});

export default PricePanel;
