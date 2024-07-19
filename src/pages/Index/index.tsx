import { listInterfaceInfoByPageUsingGet } from '@/services/api-backend-master/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { List, message } from 'antd';
import React, { useEffect, useState } from 'react';

const Index: React.FC = () => {
  //加载状态
  const [loading, setLoading] = useState(false);
  //列表数据
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  //总数
  const [total, setTotal] = useState<number>(0);
  const loadData = async (current = 1, pageSize = 5) => {
    setLoading(true);
    try {
      //调用接口获取数据
      const res = await listInterfaceInfoByPageUsingGet({
        current,
        pageSize,
      });
      //将请求返回的数据设置到列表数据状态中
      setList(res?.data?.records ?? []);
      //将请其返回的总数设置到总数状态中
      setTotal(res?.data?.total ?? 0);
    } catch (error: any) {
      message.error('请求失败 ' + error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title="在线接口开放平台">
      <List
        className="my-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          const apiLink = `/interface_info/${item.id}`;
          return (
            <List.Item
              actions={[
                <a key={item.id} href={apiLink}>
                  查看
                </a>,
              ]}
            >
              <List.Item.Meta
                title={<a href={apiLink}>{item.name}</a>}
                description={item.description}
              />
            </List.Item>
          );
        }}
        pagination={{
          // eslint-disable-next-line @typescript-eslint/no-shadow
          showTotal(total: number) {
            return '总数：' + total;
          },
          pageSize: 5,
          total,
          onChange(page, pageSize) {
            loadData(page, pageSize);
          },
        }}
      />
    </PageContainer>
  );
};
export default Index;
