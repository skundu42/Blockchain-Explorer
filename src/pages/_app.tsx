import { useEffect } from 'react';
import { providers } from 'ethers';
import { Layout } from 'antd';
import Link from 'next/link';
import { Menu } from 'antd';


const { Header, Content } = Layout;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const provider = new providers.WebSocketProvider("");


    provider.on('block', (blockNumber) => {
      console.log('New block:', blockNumber);
    });

    return () => {
      provider.removeAllListeners();
    };
  }, []);

  return (
    <Layout>
      
      <Header>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: 'white', fontWeight: 'bold' }}>Blockchain Explorer</div>
        <Menu mode="horizontal" defaultSelectedKeys={['1']} theme="dark">
            <Menu.Item key="1">
                <Link href="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link href="/TransactionPage">Search Transaction</Link>
            </Menu.Item>
        </Menu>
      </div>
    </Header>
      <Content style={{ padding: '50px', minHeight: '80vh' }}>
        <Component {...pageProps} />
      </Content>
    </Layout>
  );
}

export default MyApp;
