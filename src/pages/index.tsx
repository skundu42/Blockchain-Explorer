import { useState, useEffect } from 'react';
import { providers } from 'ethers';
import { Card, List, Space } from 'antd';
import FlipMove from 'react-flip-move';



type Block = providers.Block;
function HomePage() {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const web3Provider = new providers.WebSocketProvider("");

    async function fetchLatestBlock() {
      const latestBlock = await web3Provider.getBlock('latest');
      setBlocks(prevBlocks => [latestBlock, ...prevBlocks.slice(0, 4)]);
    }

    // Fetch the latest block immediately upon mounting
    fetchLatestBlock();

    // Set up an event listener to fetch the latest block whenever a new block is mined
    web3Provider.on('block', fetchLatestBlock);

    // Cleanup the event listener when the component is unmounted
    return () => {
      web3Provider.off('block', fetchLatestBlock);
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <FlipMove>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={blocks}
          renderItem={block => (
            <List.Item key={block.number}>
              <Card style={{ marginBottom: '20px' }}>
                <Space direction="vertical">
                  <p><strong>Block Number:</strong> {block.number}</p>
                  <p><strong>Block Hash:</strong> {block.hash}</p>
                  <p><strong>Parent Hash:</strong> {block.parentHash}</p>
                  <p><strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}</p>
                  <p><strong>Transaction Count:</strong> {block.transactions.length}</p>
                  <p><strong>Gas Used:</strong> {block.gasUsed.toString()}</p>
                  <p><strong>Difficulty:</strong> {block.difficulty.toString()}</p>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      </FlipMove>
    </div>
  );
}

export default HomePage;
