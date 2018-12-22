import 'Lib/plugin-css/base.css';
import 'Lib/plugin-css/bootstrap.v3.3.7.min.css';
import HomePage from './index';
import { hot } from 'react-hot-loader';

const Page = hot(module)(HomePage);
ReactDOM.render(
  <Page />,
  document.getElementById('app-container')
);
