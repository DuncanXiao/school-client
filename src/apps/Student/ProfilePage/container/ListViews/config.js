import CustomIcon from 'Components/CustomIcon';

const config = {
  base: [{
    thumb: <CustomIcon path='/others/dizhi.svg'/>,
    arrow: 'horizontal',
    text: '地址',
    onClick: (data) => {}
  }, {
    thumb: <CustomIcon path='/persons/kefu.svg'/>,
    arrow: 'horizontal',
    text: '客服',
    onClick: (data) => {}
  }],
  horseman: [{
    thumb: <CustomIcon path='/persons/huabanfuben.svg'/>,
    arrow: 'horizontal',
    text: '成为骑手',
    onClick: (data) => {}
  }]
};

export default config;