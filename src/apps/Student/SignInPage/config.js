export const accountForm = [
  {
    key: 'account',
    placeholder: '账号',
    type: 'text',
    fieldProps: {
      rules: [{
        required: true,
        type: 'string',
        message: '请填账号'
      }],
      initialValue: ''
    }
  }, {
    key: 'password',
    placeholder: '密码',
    type: 'password',
    fieldProps: {
      rules: [{
        required: true,
        type: 'string',
        message: '请入密码'
      }],
      initialValue: ''
    }
  }
];