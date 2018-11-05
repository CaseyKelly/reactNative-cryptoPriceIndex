import PriceIndex from './components/PriceIndex';
import AssetDetails from './components/AssetDetails';
import { createStackNavigator } from 'react-navigation';

const App = createStackNavigator({
  Home: { screen: PriceIndex },
  Details: { screen: AssetDetails }
});

export default App;
