import sayword from 'Utilities/some-method';
import Banner from './container/Banner';
import 'bootstrap/dist/css/bootstrap.css';

const HomePage = function(){
  return (
    <div>
      <div className="banner-conatiner">
        <Banner retailers={['1','2']}/>
      </div>
      {sayword('hello, it is home page.S')};
    </div>
  )
};

export default HomePage;