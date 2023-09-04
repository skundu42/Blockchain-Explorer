import { useState } from 'react';
import { providers } from 'ethers';
import { Card, Input, Button, Descriptions } from 'antd';

function TransactionPage() {
  const [transactionHash, setTransactionHash] = useState('');
  const [transactionDetails, setTransactionDetails] = useState<providers.TransactionResponse | null>(null);

  const web3Provider = new providers.WebSocketProvider("");

  async function fetchTransaction() {
    const tx = await web3Provider.getTransaction(transactionHash);
    setTransactionDetails(tx);
  }

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Search Transaction" bordered={false} style={{ marginBottom: '20px' }}>
        <Input 
          placeholder="Enter Transaction Hash"
          value={transactionHash}
          onChange={(e) => setTransactionHash(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <Button type="primary" onClick={fetchTransaction}>
          Search Transaction
        </Button>
      </Card>

      {transactionDetails && (
        <Descriptions title="Transaction Details" bordered>
          <Descriptions.Item label="Transaction Hash">{transactionDetails.hash}</Descriptions.Item>
          <Descriptions.Item label="Block Number">{transactionDetails.blockNumber}</Descriptions.Item>
          <Descriptions.Item label="From">{transactionDetails.from}</Descriptions.Item>
          <Descriptions.Item label="To">{transactionDetails.to}</Descriptions.Item>
          <Descriptions.Item label="Value">{transactionDetails.value.toString()}</Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );

}

export default TransactionPage;
