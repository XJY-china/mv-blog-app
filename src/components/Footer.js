import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <AntFooter style={{ textAlign: 'center' }}>  
      {/* 版权信息 */}
      <div>
        © 2025 我的博客, All Rights Reserved.
      </div>
      
      {/* 技术支持信息 */}
      <div style={{ marginTop: '5px', fontSize: '12px', color: '#999' }}>
        Possibly powered by React & Ant Design
      </div>
    </AntFooter>
  );
}

export default Footer;