import HomePage from './index';
import { hot } from 'react-hot-loader';
import student from 'Feature/student';

const Page = hot(module)(HomePage);
ReactDOM.render(
  <Page student = { student } />,
  document.getElementById('app-container')
);
