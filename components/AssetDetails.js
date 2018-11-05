import React from 'react';
import { StyleSheet, ActivityIndicator, ScrollView, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import PriceHighlighter from './PriceHighlighter';
import fromExponential from 'from-exponential';

class AssetDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      priceData: {
        litecoin: [],
        dogecoin: [],
        monero: []
      },
      loading: true
    };
  }

  static navigationOptions = {
    title: 'Recent Prices (in BTC)',
    headerStyle: {
      backgroundColor: '#f4511e',
      marginBottom: 0
    },
    headerTintColor: '#fff'
  };

  componentWillMount() {
    const symbolArray = ['LTC', 'DOGE', 'XMR'];
    const assetArray = Object.keys(this.state.priceData);
    assetArray.map(asset => {
      const assetIndex = assetArray.indexOf(asset);
      this._fetchPriceHistory(symbolArray[assetIndex], asset);
    });
    this.setState({ loading: false });
  }

  _fetchPriceHistory = (assetSymbol, assetName) => {
    const url = `https://min-api.cryptocompare.com/data/histominute?fsym=${assetSymbol}&tsym=BTC&limit=30`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        const ascendingData = res.Data.reverse();
        this.setState({
          priceData: {
            ...this.state.priceData,
            [assetName]: ascendingData
          }
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  getDateTime = timestamp => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  getTitle = index => {
    const litecoinPriceObject = this.state.priceData.litecoin[index];
    const dogecoinPriceObject = this.state.priceData.dogecoin[index];
    const moneroPriceObject = this.state.priceData.monero[index];
    if (
      dogecoinPriceObject !== undefined &&
      litecoinPriceObject !== undefined &&
      moneroPriceObject !== undefined
    ) {
      return (
        `Litecoin: ${fromExponential(litecoinPriceObject.close.toString())}\n` +
        `Dogecoin: ${fromExponential(dogecoinPriceObject.close.toString())}\n` +
        `Monero: ${fromExponential(moneroPriceObject.close.toString())}`
      );
    } else {
      return 'Litecoin:\n' + 'Dogecoin:\n' + 'Monero:';
    }
  };

  render() {
    return (
      <View>
        <PriceHighlighter priceData={this.state.priceData} />
        <List containerStyle={styles.list}>
          <ScrollView>
            {this.state.loading ? (
              <ActivityIndicator size="large" style={styles.loading} />
            ) : (
              this.state.priceData.litecoin.map((priceObject, index) => (
                <ListItem
                  containerStyle={styles.listItem}
                  key={priceObject.time}
                  titleStyle={styles.titleStyle}
                  title={this.state.loading ? 'loading' : this.getTitle(index)}
                  titleNumberOfLines={3}
                  rightTitle={this.getDateTime(priceObject.time)}
                  rightTitleStyle={styles.rightTitle}
                  hideChevron={true}
                />
              ))
            )}
          </ScrollView>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 0
  },
  listItem: {
    height: 75
  },
  titleStyle: {
    fontSize: 13
  },
  rightTitle: {
    color: 'black'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400
  },
  detailHeader: {
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    textDecorationLine: 'underline'
  }
});

export default AssetDetails;
