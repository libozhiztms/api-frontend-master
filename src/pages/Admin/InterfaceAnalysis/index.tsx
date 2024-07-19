import { listTopInvokeInterfaceInfoUsingGet } from '@/services/api-backend-master/analysisController';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

// render echarts option.

/**
 * 接口分析
 * @constructor
 */
const InterfaceAnalysis: React.FC = () => {
  //存储数据的状态
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);
  //控制加载状态的状态，默认加载中（true）
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      listTopInvokeInterfaceInfoUsingGet().then((res) => {
        if (res.data) {
          setData(res.data);
        }
      });
    } catch (e: any) {}
  }, []);

  const charData = data.map((item) => {
    return {
      value: item.totalNUm,
      name: item.name,
    };
  });
  const option = {
    title: {
      text: '调用最多的接口 TOP3',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: charData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  return (
    <PageContainer>
      <ReactECharts
        loadingOption={{
          showLoading: loading,
        }}
        option={option}
      />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
