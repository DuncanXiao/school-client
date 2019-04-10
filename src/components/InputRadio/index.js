import { Radio } from 'antd-mobile';
import CustomIcon from 'Components/CustomIcon';
import style from './style.scss';

class InputRadio extends React.Component {
  state = {
    sex: null
  }

  handleChange = (data) => {
    this.setState(data);
    this.props.onChange(data.sex);
  }

  render () {
    const { list, lable } = this.props;
    const { sex } = this.state;

    return (
      <div className="am-list-item am-radio-item am-list-item-middle">
        <div className="am-list-line">
          <div className="am-input-label am-input-label-5">{ lable }</div>
            {
              list.map(i => (
                <div key={i.key} className="am-input-control">
                  <Radio
                    className={style.sexRadio}
                    checked={sex === i.key}
                    onChange={() => this.handleChange({sex: i.key})}
                  >
                    <CustomIcon path={ i.icon } />
                  </Radio>
                </div>
              ))
            }
        </div>
        <div className="am-list-ripple" style={{display: 'none'}}></div>
      </div>
    );
  }
}

export default InputRadio;