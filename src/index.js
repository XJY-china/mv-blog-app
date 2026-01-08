// 导入React库，这是构建React应用的必需库
import React from 'react';

// 导入ReactDOM的客户端渲染方法，用于将React组件渲染到DOM中
import ReactDOM from 'react-dom/client';

// 从antd库导入ConfigProvider组件，用于配置Ant Design的全局设置
import { ConfigProvider } from 'antd';

// 导入Ant Design的中文语言包，将组件默认语言从英文改为中文
import zhCN from 'antd/locale/zh_CN';

// 导入全局样式文件，影响整个应用
import './index.css';

// 导入主应用组件App，这是整个React应用的根组件
import App from './App';

// 创建React应用的根节点，并绑定到HTML中id为"root"的DOM元素
// document.getElementById('root') 获取HTML中<div id="root"></div>元素
const root = ReactDOM.createRoot(document.getElementById('root'));

// 将React组件渲染到DOM中
root.render(
  // React.StrictMode: React的严格模式，用于检测潜在问题，只在开发模式下生效
  <React.StrictMode>
    
    {/* ConfigProvider: Ant Design的配置提供者，用于设置全局配置 */}
    <ConfigProvider
      locale={zhCN}  // 设置语言为中文，影响所有Ant Design组件的文本显示
      theme={{       // 设置主题样式
        token: {     // token是Ant Design 5.x的主题变量系统
          colorPrimary: '#1890ff',  // 设置主色调为蓝色#1890ff
        },
      }}
    >
      
      {/* App组件：你的React应用的主组件，所有页面和组件都在这里组织 */}
      <App />
      
    </ConfigProvider>
    
  </React.StrictMode>
);