/** @format */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { YellowBox } from 'react-native';
import Main from './src/navigation/Main';
import NearBy from './src/screens/NearBy'
YellowBox.ignoreWarnings(['']);

AppRegistry.registerComponent(appName, () => Main);
