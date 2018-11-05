import React from 'react';
import { Font } from 'expo';
import AssetList from './AssetList';
import fromExponential from 'from-exponential';

export default class PriceIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: {
        litecoin: null,
        dogecoin: null,
        monero: null
      },
      loading: true
    };
  }

  static navigationOptions = {
    title: 'Current Price Index',
    headerStyle: {
      backgroundColor: '#f4511e',
      marginBottom: 0
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };

  async componentWillMount() {
    // Loading in below icon library in order to get the litecoin icon
    await Font.loadAsync({
      'Material Icons': require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf')
    });
    await this._fetchPrices();
    setInterval(this._fetchPrices, 10000);
  }

  componentWillUnmount() {
    clearInterval(this._fetchPrices);
  }

  _fetchPrices = () => {
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=LTC,DOGE,XMR&tsyms=BTC`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          price: {
            litecoin: fromExponential(res.LTC.BTC),
            dogecoin: fromExponential(res.DOGE.BTC),
            monero: fromExponential(res.XMR.BTC)
          }
        });
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  _onPressItem = () => {
    this.props.navigation.navigate('Details');
  };

  render() {
    return (
      <AssetList
        loading={this.state.loading}
        price={this.state.price}
        onPress={this._onPressItem}
      />
    );
  }
}
