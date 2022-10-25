import {} from 'react';
import { Card } from 'antd';
import styles from '../index.less';

export type CardItemProps = {
  name: string;
  price_usd: string;
  volume_1hrs_usd: string;
};

const CardItem = (props: CardItemProps) => {
  const { name, volume_1hrs_usd, price_usd } = props;
  return (
    <>
      <Card>
        <h1 className={styles.name}>{name || '-'}</h1>
        <p className={styles.price}>{price_usd ? `$${price_usd}` : ''}</p>
        <p className={styles.volume}>volume:</p>
        <p className={styles.volume}>{volume_1hrs_usd || '-'}</p>
      </Card>
    </>
  );
};

export default CardItem;
