export const listHeader = {
  accountInfo: '注册账号',
  personInfo: '个人信息'
}

export const formElements = {
  accountInfo: [{
    category: 'input',
    key: 'account',
    type: 'text',
    placeholder: '请输入账号',
    lable: '账号',
    fieldProps: {
      rules: [{
        required: true,
        type: 'string',
        message: '请填账号'
      }],
      initialValue: ''
    }
  }, {
    category: 'input',
    key: 'password',
    type: 'password',
    placeholder: '****',
    lable: '密码',
    fieldProps: {
      validateFirst: true,
      rules: [{
        required: true,
        type: 'string',
        message: '请填密码'
      }, {
        validator: (rule, value, callback) => {
          !/^[A-Za-z0-9]{8}$/.test(value) && callback(new Error('数字或字母组成8位'));
          callback();
        }
      }],
      initialValue: ''
    }
  }, {
    category: 'input',
    key: 'passwordConfirm',
    type: 'password',
    placeholder: '****',
    lable: '确认密码',
    fieldProps: {
      rules: [{
        required: true,
        type: 'string',
        message: '请填与上面一样的密码'
      }],
      initialValue: ''
    }
  }],
  personInfo: [
    {
      category: 'select',
      key: 'schoolId',
      type: 'select',
      lable: '学校',
      fieldProps: {
        rules: [{
          required: true,
          message: '请选择你所在学校'
        }],
        initialValue: ''
      }
    },
    {
      category: 'input',
      key: 'name',
      type: 'text',
      placeholder: '请输入名字',
      lable: '名字',
      fieldProps: {
        rules: [{
          required: true,
          type: 'string',
          message: '请填你的名字'
        }],
        initialValue: ''
      }
    }, {
      category: 'radio',
      lable: '性别',
      key: 'sex',
      fieldProps: {
        rules: [{
          required: true,
          type: 'string',
          message: '请选择性别'
        }],
        initialValue: ''
      },
      list: [{
        key: '男',
        icon: '/persons/nanhai.svg'
      }, {
        key: '女',
        icon: '/persons/nvhai.svg'
      }]
    }, {
      category: 'input',
      key: 'phone',
      type: 'phone',
      placeholder: '请输入手机号',
      lable: '联系',
      fieldProps: {
        rules: [{
          required: true,
          pattern: /^1[34578]\d{9}$/,
          transform: function(value) {
              return value ? value.replace(/ /g, '') : value;
          },
          message: '请输入正确手机号码'
        }],
        initialValue: ''
      }
    }, {
      category: 'input',
      key: 'address1',
      type: 'text',
      placeholder: '请输入宿舍地址',
      lable: '地址',
      fieldProps: {
        rules: [{
          required: true,
          type: 'string',
          message: '请输入宿舍地址'
        }],
        initialValue: ''
      }
    }
  ]
};
