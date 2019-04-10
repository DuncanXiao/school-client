import { List, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import style from './style.scss';
import { formElements, listHeader } from './config';
import InputSelect from 'Components/InputSelect';
import InputRadio from 'Components/InputRadio';
import clientHttps from 'Utilities/client-https';
import { Spin } from 'antd';

class SignUpPage extends React.Component {

  state = {
    school: [],
    loading: true
  }

  componentWillMount = () => {
    clientHttps().get('/api/school').then(({data}) => {
      this.setState(()=>({
        school: data,
        loading: false
      }));
    });
  }

  submit = () => {
    this.props.form.validateFields((error, values) => {
      if (values.passwordConfirm !== values.password) {
        this.props.form.setFields({
          passwordConfirm: {
            value: values.passwordConfirm,
            errors: [new Error('与密码不一致')],
          },
        });
      }
      if (!error) {
        this.setState(()=>({loading: true}));
        clientHttps().post('/auth/student/signup', {...values, phone: values.phone.replace(/ /g, '')}).then(({data}) => {
          window.location.href = `${process.env.DOMAIN}`;
        }).catch(() => {
          this.setState(()=>({loading: false}));
        });
      } else {
        console.log('error', error, values);
      }
    });
  }

  render() {
    const { form: { getFieldProps, getFieldError } } = this.props;
    const { school } = this.state;
    return (
      <Spin spinning={this.state.loading}>
        <div>
        {
          Object.keys(formElements).map((key) => {
            return (
              <List key={key} renderHeader={() => listHeader[key]}>
                { formElements[key].map((e) => {
                  if ( e.category === 'input' ) {
                    return (
                      [
                        <InputItem
                          key = {e.key}
                          type = { e.type }
                          placeholder = { e.placeholder }
                          className = { getFieldError(e.key) ? style.errorInput: null }
                          {...getFieldProps(e.key, e.fieldProps)}
                        >{ e.lable }</InputItem>,
                        <div key = {`${e.key}-error`} className={style.error}> { getFieldError(e.key) ? getFieldError(e.key).join(',') : null }</div>
                      ]
                    )
                  } else if ( e.category === 'radio' ) {
                    return ([
                      <InputRadio
                        key = { e.key }
                        lable = {e.lable}
                        {...getFieldProps(e.key, e.fieldProps)}
                        list = {e.list}
                      />,
                      <div key = {`${e.key}-error`} className={style.error}> { getFieldError(e.key) ? getFieldError(e.key).join(',') : null }</div>
                    ])
                  } else if ( e.category === 'select' ) {
                    return ([
                      <InputSelect
                        key = { e.key }
                        options = {school}
                        lable = {e.lable}
                        {...getFieldProps(e.key, e.fieldProps)}
                      />,
                      <div key = {`${e.key}-error`} className={style.error}> { getFieldError(e.key) ? getFieldError(e.key).join(',') : null }</div>
                    ])
                  }
                }) }
              </List>
            )
          })
        }
        <Button type="primary" onClick={this.submit}>primary</Button>
      </div>
      </Spin>
    )
  }
};

export default createForm()(SignUpPage);