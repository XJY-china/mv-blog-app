// 导入React库
import React from 'react';
// 导入Ant Design组件
import { Modal, Button } from 'antd';
// 导入Ant Design图标
import { ExclamationCircleOutlined } from '@ant-design/icons';

// 从Modal中解构出confirm方法
const { confirm } = Modal;

// 定义删除确认组件
const DeleteConfirm = ({ 
  onConfirm,  // 确认删除回调函数
  articleTitle  // 文章标题，用于显示在确认框中
}) => {
  // 显示删除确认框的函数
  const showDeleteConfirm = () => {
    confirm({
      title: '确认删除文章',  // 确认框标题
      // 警告图标
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      // 确认框内容
      content: `确定要删除文章 "${articleTitle}" 吗？删除后无法恢复。`,
      okText: '确认删除',  // 确认按钮文字
      okType: 'danger',  // 确认按钮类型（危险操作）
      cancelText: '取消',  // 取消按钮文字
      // 确认按钮点击回调
      onOk() {
        return new Promise((resolve) => {
          // 模拟异步操作（实际开发中删除操作可能是异步的）
          setTimeout(() => {
            onConfirm();  // 执行删除回调
            resolve();  // 完成Promise
          }, 1000);  // 1秒延迟
        });
      },
      // 取消按钮点击回调
      onCancel() {
        console.log('取消删除');  // 控制台日志
      },
    });
  };

  return (
    // 删除按钮
    <Button 
      type="text"  // 文本按钮样式
      danger  // 危险操作样式
      onClick={showDeleteConfirm}  // 点击显示确认框
    >
      删除文章  {/* 按钮文字 */}
    </Button>
  );
};

// 导出DeleteConfirm组件
export default DeleteConfirm;