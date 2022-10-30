import { useState, useEffect } from 'react';
import { useRequest } from 'umi';
import CardItem from './components/CardItem';
import { Row, Col, Spin } from 'antd';
import { Observer } from '@/utils/observer';
import { getCurrencyList, ResonseCurrencyList } from '@/services/currency';
import styles from './index.less';

const observer = new Observer();
const size = 40;

export default function IndexPage() {
  const [currencyList, setCurrencyList] = useState<ResonseCurrencyList>([]);
  const [renderList, setRenderList] = useState<ResonseCurrencyList>([]);

  useRequest(
    () => {
      return getCurrencyList();
    },
    {
      onSuccess(data) {
        setCurrencyList(data);
        setRenderList(data.slice(0, size));
      },
    },
  );

  useEffect(() => {
    setTimeout(() => {
      const row = document.querySelector('.ant-row');
      const lastCol = row?.lastElementChild || null;
      observer.init(lastCol, () => {
        const lastItem = renderList[renderList.length - 1];
        const lastIndex = currencyList.findIndex(
          (item) => item.asset_id === lastItem.asset_id,
        );
        if (lastIndex < currencyList.length - 1) {
          const restNumber = currencyList.length - 1 - lastIndex;
          setTimeout(() => {
            if (restNumber > size) {
              setRenderList(currencyList.slice(0, lastIndex + size));
            } else {
              setRenderList(currencyList);
            }
          }, 1000);
        }
      });
      return () => observer.unmounted();
    }, 0);
  }, [renderList]);

  return (
    <div className={styles.container}>
      <h1>Cryptocurrency RealTime Price</h1>
      <Row>
        {renderList.map((item: any, index: number) => (
          <Col
            lg={8}
            md={12}
            sm={24}
            className={styles.item}
            key={item.asset_id}
          >
            <CardItem
              className={
                index === renderList.length - 1 ? styles.lastCard : null
              }
              {...item}
            ></CardItem>
          </Col>
        ))}
      </Row>
    </div>
  );
}
