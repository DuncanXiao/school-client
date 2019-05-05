import style from './style.scss';
import classNames from 'classnames';

class CustomInput extends React.Component {

  handleChange = (e) => {
    this.props.onChange(e.target.value);
  }

  render() {
    const { inputConfig, container, errorMessage } = this.props;
    return (
      <div className={classNames(style.container, { container: !!container })}>
        <div className={classNames(style.inputBox, {[style.inputError]: !!errorMessage})}>
          <input
            {...inputConfig}
            onChange={this.handleChange}
          />
        </div>
        <div className={style.error}>{errorMessage}</div>
      </div>
    );
  }
};

export default CustomInput