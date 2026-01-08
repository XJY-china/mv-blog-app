
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Divider,
  message,
  Space,
  Row,
  Col
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
  GithubOutlined
} from '@ant-design/icons';

const { Title, Text, Link } = Typography;

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // 处理表单提交
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 调用父组件的登录函数
      await onLogin({
        username: values.username,
        password: values.password,
        email: values.username.includes('@') ? values.username : `${values.username}@example.com`
      });
      
      message.success('登录成功！');
      navigate('/profile'); // 跳转到个人资料页
    } catch (error) {
      message.error('登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  // 跳转到注册页
  const goToRegister = () => {
    navigate('/register');
  };

  // 模拟第三方登录
  const handleSocialLogin = (provider) => {
    message.info(`${provider} 登录功能开发中`);
  };

  // 使用演示账号登录（方便测试）
  const handleDemoLogin = () => {
    form.setFieldsValue({
      username: 'pigStar',
      password: '123456'
    });
    handleSubmit({
      username: 'pigStar',
      password: '123456'
    });
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Card
          style={{
            borderRadius: 8,
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
          }}
        >
          {/* 标题 */}
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <Title level={2}>欢迎回来</Title>
            <Text type="secondary">登录您的账户以继续</Text>
          </div>

          {/* 登录表单 */}
          <Form
            form={form}
            name="login"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
          >
            {/* 用户名/邮箱输入 */}
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名或邮箱' },
                { min: 3, message: '用户名至少3个字符' }
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#999' }} />}
                placeholder="用户名或邮箱"
              />
            </Form.Item>

            {/* 密码输入 */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6位' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#999' }} />}
                placeholder="密码"
              />
            </Form.Item>

            {/* 记住我 和 忘记密码 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: 0 }}>
                <label>
                  <input type="checkbox" style={{ marginRight: 8 }} />
                  记住我
                </label>
              </Form.Item>
              <Link href="#" style={{ fontSize: 14 }}>
                忘记密码？
              </Link>
            </div>

            {/* 登录按钮 */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
              >
                登录
              </Button>
            </Form.Item>

            {/* 演示账号按钮 */}
            <Form.Item>
              <Button
                type="dashed"
                onClick={handleDemoLogin}
                block
                size="large"
              >
                使用演示账号登录
              </Button>
            </Form.Item>
          </Form>

          {/* 分割线 */}
          <Divider plain>
            <Text type="secondary">其他登录方式</Text>
          </Divider>

          {/* 第三方登录 */}
          <Space size="middle" style={{ width: '100%', justifyContent: 'center', marginBottom: 30 }}>
            <Button 
              icon={<GoogleOutlined />} 
              size="large"
              onClick={() => handleSocialLogin('Google')}
              style={{ borderRadius: '50%', width: 50, height: 50 }}
            />
            <Button 
              icon={<GithubOutlined />} 
              size="large"
              onClick={() => handleSocialLogin('GitHub')}
              style={{ borderRadius: '50%', width: 50, height: 50 }}
            />
            <Button 
              icon={<MailOutlined />} 
              size="large"
              onClick={() => handleSocialLogin('邮箱验证')}
              style={{ borderRadius: '50%', width: 50, height: 50 }}
            />
          </Space>

          {/* 注册链接 */}
          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">还没有账户？</Text>
            <Link 
              onClick={goToRegister}
              style={{ marginLeft: 8, fontWeight: 'bold' }}
            >
              立即注册
            </Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default LoginPage;
