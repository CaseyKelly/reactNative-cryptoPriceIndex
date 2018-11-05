import React from 'react';
import { View, StyleSheet } from 'react-native';
import PricePanel from './PricePanel';
import fromExponential from 'from-exponential';

const PriceHighlighter = ({ priceData }) => {

  const calculatePrice = (assetName, highOrLow) => {
    if (priceData[assetName] !== []) {
      let priceArray = []
      priceData[assetName].map((priceObject) => priceArray.push(priceObject.close))
      if (priceArray.length === 0) {
        return
      } else {
        return highOrLow === 'low' ? fromExponential(Math.min(...priceArray)) : fromExponential(Math.max(...priceArray))
      }
    }
  }

  return (
    <View style={styles.container}>
      <PricePanel assetName={'Litecoin'} lowestPrice={calculatePrice('litecoin', 'low')} highestPrice={calculatePrice('litecoin', 'high')} />
      <PricePanel assetName={'Dogecoin'} lowestPrice={calculatePrice('dogecoin', 'low')} highestPrice={calculatePrice('dogecoin', 'high')} />
      <PricePanel assetName={'Monero'} lowestPrice={calculatePrice('monero', 'low')} highestPrice={calculatePrice('monero', 'high')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10
  }
});

export default PriceHighlighter;
