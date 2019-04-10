import CustomIcon from '../CustomIcon';
import styles from './style.scss';
import classNames from 'classnames';

const getMomentData = () => {
  const now = new Date(),hour = now.getHours()
  if (hour < 12) {
    return { icon: "jiandan.svg"};
  } else if (hour < 14) {
    return { icon: "shiwumiantiao.svg"};
  } else if (hour < 17) {
    return { icon: "food-cake.svg"};
  }
  return { icon: "dinner.svg"};
}

const getData = (options) => {
  const sex = options.sex === '男' ? 'nanhai' : 'nvhai';
  const food = getMomentData();

  const data = [
    {
      icon: <CustomIcon path={`/foods/${food.icon}`} className={styles.customIcon} />,
      link: process.env.DOMAIN,
      text: <div className={classNames({[styles.active]: !!location.pathname.match(/^\/$/)})}></div>
    }, {
      icon: <CustomIcon path='/money/youhuihuodong.svg' className={styles.customIcon} />,
      link: `${process.env.DOMAIN}/discover`,
      text: <div className={classNames({[styles.active]: !!location.pathname.match(/\/discover/)})}></div>
    }, {
      icon: <CustomIcon path='/money/caigoudingdan-bian.svg' className={styles.customIcon} />,
      link: `${process.env.DOMAIN}/order`,
      text: <div className={classNames({[styles.active]: !!location.pathname.match(/\/order/)})}></div>
    }, {
      icon: <CustomIcon path={`/persons/${sex}.svg`} className={styles.customIcon} />,
      link: `${process.env.DOMAIN}/profile`,
      text: <div className={classNames({[styles.active]: !!location.pathname.match(/\/profile/)})}></div>
    }
  ];

  return data;
}


export default getData;