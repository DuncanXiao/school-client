import { Select } from 'antd';

const Option = Select.Option;

class InputSelect extends React.Component {

  handleChange = (value) => {
    this.props.onChange(value);
  }

  render () {
    const { options, lable } = this.props;

    return (
      <div className="am-list-item am-radio-item am-list-item-middle">
        <div className="am-list-line">
          <div className="am-input-label am-input-label-5">{ lable }</div>
            <div className="am-input-control">
              <Select onChange={this.handleChange} style={{ width: '100%' }}>
                {options.map(i => <Option key={ i.id } value={i.id}>{i.name}</Option>)}
              </Select>
            </div>
        </div>
        <div className="am-list-ripple" style={{display: 'none'}}></div>
      </div>
    );
  }
}

export default InputSelect;