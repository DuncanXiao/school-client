import Tabs from 'Components/Tabs';
import styles from './style.scss';
import { Icon } from 'antd-mobile';
import Possess from './container/Possess/index';
import ListViews from './container/ListViews/index';

const Page = (props) => {
  const { student } = props;
  return (
    <div>
      <div className={styles.profileHeaderContainer}>
        <div className={styles.headerBox}>
          <div className={styles.avatar}></div>
          <p className={styles.text}>
            <a>
              登录/注册
              <Icon type="right" className={styles.rightIcon} />
            </a>
          </p>
        </div>
      </div>
      <div><Possess vouchers={student.vouchers} redPackets={student.redPackets} /></div>
      <ListViews />
      <Tabs {...student} />
    </div>
  )
};

export default Page;