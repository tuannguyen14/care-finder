/** @format */

import {AppRegistry} from 'react-native';
import Maps from './src/screens/Maps';
import {name as appName} from './app.json';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent(appName, () => Maps);
