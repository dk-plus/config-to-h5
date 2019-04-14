import React from 'react';
import { connect } from 'dva';
import { Card, Input, Icon, Button, Form, Layout, message } from 'antd';

const Password = Input.Password;
const FormItem = Form.Item;
const { Content } = Layout;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerMode: false, // 注册模式
    };
  }

  handleSubmit = (e) => {
    e && e.preventDefault();

    const { form, dispatch } = this.props;
    const { registerMode } = this.state;

    form.validateFields((err, fieldValue) => {
      if (err) return;

      // console.log(fieldValue);

      if (registerMode) {
        dispatch({
          type: 'user/register',
          payload: fieldValue,
        }).then(res => {
          if (res.returnCode === '0') {
            message.warning(`注册成功！页面即将跳转……}`)
            dispatch({
              type: 'user/login',
              payload: fieldValue,
            }).then(res => {
              if (res.returnCode === '0') {
                window.location.href = '/home';
              }
            });
          } else {
            message.warning(`注册失败！${res.errorMessage || ''}`)
          }
        });
        return;
      }

      dispatch({
        type: 'user/login',
        payload: fieldValue,
      }).then(res => {
        if (res.returnCode === '0') {
          window.location.href = '/home';
        } else {
          message.warning(`登录失败！${res.errorMessage || ''}`)
        }
      });
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { registerMode } = this.state;

    return (
      <Layout style={{height: '100%'}}>
        <Content style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Card title="登录">
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
              {
                getFieldDecorator('user', {
                  rules: [{
                    required: true,
                    message: '请输入账号',
                  }]
                })(
                  <Input placeholder="请输入账号" prefix={<Icon type="user"/>} />
                )
              }
              </FormItem>
              <FormItem>
              {
                getFieldDecorator('pwd', {
                  rules: [{
                    required: true,
                    message: '请输入密码',
                  }]
                })(
                  <Password placeholder="请输入密码" prefix={<Icon type="lock"/>}/>
                )
              }
              </FormItem>
              {
                registerMode &&
                <FormItem>
                  {
                    getFieldDecorator('confirmPassword', {
                      rules: [{
                        required: true,
                        message: '二次密码校验错误',
                        validator: (rule, value, callback) => {
                          const pwd = getFieldValue('pwd');
                          if (pwd !== value) {
                            callback('二次密码校验错误');
                            return;
                          }
                          callback();
                        }
                      }]
                    })(
                      <Password placeholder="请再次输入密码" prefix={<Icon type="lock" />} />
                    )
                  }
                </FormItem>
              }
              <FormItem>
                {
                  registerMode &&
                  <>
                    <Button htmlType="submit" style={{ width: '100%' }}>注册</Button>
                    <a style={{ width: '100%' }} onClick={() => {
                      this.setState({
                        registerMode: false,
                      })
                    }}><Icon type="info-circle" theme="twoTone" /> 已有账号？立即登录</a>
                  </> ||
                  <>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>登录</Button>
                    <a style={{ width: '100%' }} onClick={() => {
                      this.setState({
                        registerMode: true,
                      })
                    }}><Icon type="info-circle" theme="twoTone" /> 没有账号？立即注册</a>
                  </>
                }
              </FormItem>
            </Form>
          </Card>
        </Content>
      </Layout>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  }
}

export default Form.create()(connect(mapStateToProps)(Login));
