import React, { Component } from 'react'
import { Card, Button, Checkbox, Form, Input, message } from 'antd'
import './index.scss'
import logo from 'assets/logo.png'
import { login } from 'api/user'
export default class index extends Component {
  state = {
    loading: false,
  }
  render() {
    return (
      <div className="login">
        <Card className="login-container">
          <img src={logo} alt="" className="login-logo" />
          {/* 表单 */}
          <Form
            size="large"
            validateTrigger={['onChange', 'onBlur']}
            onFinish={this.onFinish}
            initialValues={{
              mobile: 13911111111,
              code: '246810',
              agree: true,
            }}
          >
            <Form.Item
              name="mobile"
              rules={[
                { required: true, message: '手机号不能为空' },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号格式错误',
                  validateTrigger: 'onBlur',
                },
              ]}
            >
              <Input placeholder="请输入你的手机号" autoComplete="off" />
            </Form.Item>

            <Form.Item
              name="code"
              rules={[
                { required: true, message: '验证码不能为空' },
                { pattern: /^\d{6}$/, message: '验证码格式错误' },
              ]}
            >
              <Input.Password placeholder="请输入验证码" autoComplete="off" />
            </Form.Item>

            <Form.Item
              valuePropName="checked"
              name="agree"
              rules={[
                {
                  // validator(rule, value) {
                  //   if (value) {
                  //     return Promise.resolve()
                  //   }else {
                  //     return Promise.reject( new Error('请阅读并同意用户协议'))
                  //   }
                  // },
                  validator: (rule, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error('请阅读并同意用户协议')),
                },
              ]}
            >
              <Checkbox> 我已阅读且同意用户协议</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={this.state.loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  onFinish = async ({ mobile, code }) => {
    this.setState({
      loading: true,
    })
    try {
      const res = await login(mobile, code)
      // 保存成功
      localStorage.setItem('token', res.data.token)

      //提示消息
      message.success('登录成功', 1, () => {
        //跳转首页
        this.props.history.push('/home')
      })
    } catch (error) {
      message.warning(error.response.data.message, 1, function () {
        this.setState({
          loading: false,
        })
      })
    }
  }
}
