import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  //用户点击取消按钮时触发
  onCancel: () => void;
  //用户点击提交表单时，将用户输入的数据作为诶参数传递给后台
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  //模态框是否可见
  visible: boolean;
  // values: Partial<API.RuleListItem>;
};

const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onCancel, onSubmit } = props;

  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};
export default CreateModal;
