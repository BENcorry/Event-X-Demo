import { useState, useEffect } from 'react';
import { useRequest } from 'umi';
import CardItem from './components/CardItem';
import { Row, Col, Spin } from 'antd';
import { getCurrencyList, ResonseCurrencyList } from '@/services/currency';
import styles from './index.less';

export default function IndexPage() {
  const [currencyList, setCurrencyList] = useState<ResonseCurrencyList>([]);

  useRequest(
    () => {
      return getCurrencyList();
    },
    {
      onSuccess(data) {
        setCurrencyList(data);
      },
    },
  );

  return (
    <div className={styles.container}>
      <h1>Cryptocurrency RealTime Price</h1>
      <Row>
        {currencyList.map((item: any) => (
          <Col lg={8} md={12} sm={24} className={styles.item} key={item.name}>
            <CardItem {...item}></CardItem>
          </Col>
        ))}
      </Row>
    </div>
  );
}
