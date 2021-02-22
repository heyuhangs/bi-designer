// import $config from '../../config'

export default {
  title: '表单组件',
  id: 'formComponents',
  icon: 'biaodanzujian',
  components: [
    {
      elName: 'qk-input',
      title: '文本框',
      isSvg: true,
      icon: 'basics-text-box',
      isForm: true,
      defaultStyle: {
        height: 38,
        width: 250,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: '#999999',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4
      }
    },
    {
      elName: 'qk-textarea',
      title: '多行文本',
      isSvg: true,
      icon: 'basics-multiline-text',
      isForm: true,
      defaultStyle: {
        height: 58,
        width: 250,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: '#999999',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4
      }
    }, {
      elName: 'radio',
      title: '单选框',
      isSvg: true,
      icon: 'basics-radio',
      isForm: true,
      defaultStyle: {
        height: 58,
        width: 250,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: '#999999',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4
      }
    }, {
      elName: 'checkbox',
      title: '复选框',
      isSvg: true,
      icon: 'basics-checkbox',
      isForm: true,
      defaultStyle: {
        height: 58,
        width: 250,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: '#999999',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4
      }
    }, {
      elName: 'getDate',
      title: '日期选择器',
      isSvg: true,
      icon: 'basics-date-pickers',
      isForm: true,
      defaultStyle: {
        height: 20,
        width: 110,
        color: '#ffffff',
        fontSize: 16
      }
    }, {
      elName: 'getTime',
      title: '时间选择器',
      isSvg: true,
      icon: 'basics-time',
      isForm: true,
      defaultStyle: {
        height: 20,
        width: 110,
        color: '#E4A41B',
        fontSize: 16
      }
    }
  ]
}

