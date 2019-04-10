import { Grid } from 'antd-mobile';
import getData from './config';
import styles from './style.scss';

const Tabs = (props) => {
  const { sex } = props;

  return (
    <div
      className={styles.customTabs}>
      <Grid
        data={getData({sex})}
        onClick={(el, index) => { location.href=`${el.link}` }}
        hasLine={false}
      />
    </div>
  );
};

export default Tabs;