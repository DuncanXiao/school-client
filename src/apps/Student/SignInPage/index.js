import { List, InputItem, Button, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import style from './style.scss';
import clientHttps from 'Utilities/client-https';
import { Spin } from 'antd';
import CustomInput from 'Components/CustomInput';
import { accountForm } from './config';
import Cookie from 'js-cookie';

class SignInPage extends React.Component {

  state = {
    loading: true,
    switchAccount: true
  }

  componentWillMount = () => {
    this.setState(()=>({
      loading: false
    }));
  }

  submit = () => {
    const { form: { validateFields, setFields } } = this.props;
    validateFields((error, values) => {
      if (!error) {
        this.setState(()=>({loading: true}));
        clientHttps().post('/auth/student/login', {
          account: values.account,
          password: values.password
        }).then(({ data }) => {
          Cookie.set('token', data.token, {
            expires: 7,
          });
          this.setState(()=>({loading: false}));
        }).catch(({ data }) => {
          this.setState(()=>({loading: false}));
          setFields({
            password: {
              value: values.passwordConfirm,
              errors: ['账号密码不符合'],
            },
          });
        });
      }
    });
  }

  render() {
    const { form: { getFieldProps, getFieldError } } = this.props;
    const { loading, switchAccount } = this.state;

    return (
      <Spin spinning={loading}>
        {
          switchAccount ?
          <div>
            {
              accountForm.map((e, i) => {
                const errorMessage = getFieldError(e.key);
                return (
                  <CustomInput
                    key={e.key}
                    inputConfig={{type: e.type, placeholder: e.placeholder}}
                    {...getFieldProps(e.key, e.fieldProps)}
                    errorMessage={errorMessage}
                  />
                );
              })
            }
          </div> :
          <div>
            手机
          </div>
        }
        <Button onClick={this.submit}>登录</Button>
      </Spin>
    )
  }
};

export default createForm()(SignInPage);