// 导入React库
import React from 'react';

// 导入React Router的Link组件，用于单页应用内的导航（不会刷新页面）
import { Link } from 'react-router-dom';

// 从Ant Design导入Layout和Menu组件
import { Layout, Menu } from 'antd';

// 从Ant Design图标库导入图标组件
import { HomeOutlined, FormOutlined } from '@ant-design/icons';

// 从Layout组件中解构出Header组件，用于页面顶部区域
const { Header } = Layout;

// 定义Navbar导航栏组件
function Navbar() {
  return (
    // Header组件：Ant Design的顶部布局组件，默认有样式
    <Header>
      
      {/* Logo区域：使用内联样式设置位置和样式 */}
      <div style={{
        float: 'left',          // 左浮动，让Logo靠左显示
        marginRight: '20px',    // 右外边距20px，与菜单隔开
        color: 'white',         // 文字颜色白色
        fontSize: '18px',       // 字体大小18px
        fontWeight: 'bold'      // 字体加粗
      }}>
        
        {/* Link组件：点击跳转到首页，to="/"表示根路径 */}
        <Link to="/" style={{ color: 'white' }}>
          我的博客  {/* Logo文字 */}
        </Link>
        
      </div>
      
      {/* Menu菜单组件：实现导航菜单 */}
      {/* theme="dark": 暗色主题 */}
      {/* mode="horizontal": 水平排列模式 */}
      {/* defaultSelectedKeys={['home']}: 默认选中"home"菜单项 */}
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
        
        {/* Menu.Item: 单个菜单项 */}
        {/* key="home": 唯一标识符，用于selectedKeys */}
        {/* icon={<HomeOutlined />}: 菜单图标 */}
        <Menu.Item key="home" icon={<HomeOutlined />}>
          
          {/* 嵌套Link组件：点击跳转到首页 */}
          <Link to="/">首页</Link>
          
        </Menu.Item>
        
        {/* 另一个菜单项：管理后台 */}
        <Menu.Item key="admin" icon={<FormOutlined />}>
          
          {/* 点击跳转到管理页面 */}
          <Link to="/admin">管理后台</Link>
          
        </Menu.Item>
        
      </Menu>
    </Header>
  );
}

// 导出Navbar组件，供App.js导入使用
export default Navbar;