
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Switch,
  message,
  Space,
  Divider,
  Tabs,
  Select,
  Radio
} from 'antd';
import {
  SettingOutlined,
  LockOutlined,
  BellOutlined,
  SecurityScanOutlined,
  SaveOutlined,
  NotificationOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

function SettingsPage({ currentUser, onUpdateUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // 处理表单提交
  const handleSubmit = (values) => {
    setLoading(true);
    // 模拟保存延迟
    setTimeout(() => {
      message.success('设置已保存');
      setLoading(false);
    }, 1000);
  };

  // 处理账户设置
  const handleAccountUpdate = (values) => {
    setLoading(true);
    setTimeout(() => {
      onUpdateUser(values);
      message.success('账户信息已更新');
      setLoading(false);
    }, 1000);
  };

  // 主题选项
  const themes = [
    { value: 'light', label: '浅色主题' },
    { value: 'dark', label: '深色主题' },
    { value: 'auto', label: '跟随系统' }
  ];

  // 语言选项
  const languages = [
    { value: 'zh-CN', label: '简体中文' },
    { value: 'en-US', label: 'English' }
  ];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        <SettingOutlined style={{ marginRight: 12 }} />
        系统设置
      </Title>

      <Tabs defaultActiveKey="account" size="large">
        {/* 账户设置 */}
        <TabPane
          tab={
            <span>
              <SettingOutlined />
              账户设置
            </span>
          }
          key="account"
        >
          <Card style={{ borderRadius: 8 }}>
            <Title level={4}>基本信息</Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAccountUpdate}
              initialValues={currentUser}
            >
              <Form.Item
                name="name"
                label="昵称"
                rules={[{ required: true, message: '请输入昵称' }]}
              >
                <Input placeholder="请输入昵称" />
              </Form.Item>

              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>

              <Divider />

              <Title level={4}>隐私设置</Title>
              <Form.Item
                name="profilePublic"
                label="个人资料公开"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary">
                开启后，其他用户可以查看您的个人资料
              </Text>

              <div style={{ marginTop: 32 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<SaveOutlined />}
                >
                  保存账户设置
                </Button>
              </div>
            </Form>
          </Card>
        </TabPane>

        {/* 安全设置 */}
        <TabPane
          tab={
            <span>
              <SecurityScanOutlined />
              安全设置
            </span>
          }
          key="security"
        >
          <Card style={{ borderRadius: 8 }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={4}>修改密码</Title>
                <Form layout="vertical">
                  <Form.Item
                    name="currentPassword"
                    label="当前密码"
                    rules={[{ required: true, message: '请输入当前密码' }]}
                  >
                    <Input.Password placeholder="请输入当前密码" />
                  </Form.Item>

                  <Form.Item
                    name="newPassword"
                    label="新密码"
                    rules={[
                      { required: true, message: '请输入新密码' },
                      { min: 6, message: '密码至少6位' }
                    ]}
                  >
                    <Input.Password placeholder="请输入新密码" />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="确认新密码"
                    dependencies={['newPassword']}
                    rules={[
                      { required: true, message: '请确认新密码' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('两次输入的密码不一致'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="请再次输入新密码" />
                  </Form.Item>

                  <Button type="primary">
                    修改密码
                  </Button>
                </Form>
              </div>

              <Divider />

              <div>
                <Title level={4}>双重验证</Title>
                <Space direction="vertical">
                  <Text>开启双重验证，提升账户安全性</Text>
                  <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                </Space>
              </div>

              <Divider />

              <div>
                <Title level={4}>登录设备</Title>
                <Text type="secondary">查看和管理您的登录设备</Text>
                <div style={{ marginTop: 16 }}>
                  <Button>查看登录设备</Button>
                </div>
              </div>
            </Space>
          </Card>
        </TabPane>

        {/* 通知设置 */}
        <TabPane
          tab={
            <span>
              <BellOutlined />
              通知设置
            </span>
          }
          key="notification"
        >
          <Card style={{ borderRadius: 8 }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={4}>邮件通知</Title>
                <Space direction="vertical">
                  <Form.Item name="emailNotifications" valuePropName="checked">
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  </Form.Item>
                  <Text type="secondary">接收系统邮件通知</Text>
                </Space>
              </div>

              <Divider />

              <div>
                <Title level={4}>消息通知</Title>
                <Space direction="vertical">
                  <Form.Item name="messageNotifications" valuePropName="checked">
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  </Form.Item>
                  <Text type="secondary">接收站内消息通知</Text>
                </Space>
              </div>

              <Divider />

              <div>
                <Title level={4}>推送通知</Title>
                <Space direction="vertical">
                  <Form.Item name="pushNotifications" valuePropName="checked">
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  </Form.Item>
                  <Text type="secondary">接收推送通知</Text>
                </Space>
              </div>
            </Space>
          </Card>
        </TabPane>

        {/* 偏好设置 */}
        <TabPane
          tab={
            <span>
              <NotificationOutlined />
              偏好设置
            </span>
          }
          key="preference"
        >
          <Card style={{ borderRadius: 8 }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={4}>界面主题</Title>
                <Select defaultValue="light" style={{ width: 200 }}>
                  {themes.map(theme => (
                    <Option key={theme.value} value={theme.value}>
                      {theme.label}
                    </Option>
                  ))}
                </Select>
              </div>

              <Divider />

              <div>
                <Title level={4}>语言设置</Title>
                <Select defaultValue="zh-CN" style={{ width: 200 }}>
                  {languages.map(lang => (
                    <Option key={lang.value} value={lang.value}>
                      {lang.label}
                    </Option>
                  ))}
                </Select>
              </div>

              <Divider />

              <div>
                <Title level={4}>文章列表显示</Title>
                <Radio.Group defaultValue="card">
                  <Radio value="card">卡片式</Radio>
                  <Radio value="list">列表式</Radio>
                </Radio.Group>
              </div>
            </Space>
          </Card>
        </TabPane>
      </Tabs>

      {/* 危险操作区域 */}
      <Card
        title="危险操作"
        style={{ marginTop: 24, borderRadius: 8, borderColor: '#ff4d4f' }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button type="dashed" danger>
            注销账户
          </Button>
          <Text type="secondary" style={{ fontSize: 12 }}>
            注意：注销账户将删除所有数据，此操作不可恢复
          </Text>
        </Space>
      </Card>
    </div>
  );
}

export default SettingsPage;
