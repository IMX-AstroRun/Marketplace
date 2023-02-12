
import React, { useState } from "react";
import { Button, Input, Row, Col ,message} from "antd";
import sdkImxWeb from "./okImxWeb";
import "./App.less";

const App = () => {
  const tokenId = "52041845";
  const tokenAddress = "0xacb3c6a43d15b907e8433077b6d38ae40936fe2c";

  const [order, setOrder] = useState("");
  const [price, setPrice] = useState("");
  const [addr,setAddr] = useState("");
  const [list,setList] = useState([]);
  const [balance,setBalance] = useState('');
  const [result,setResult] = useState([]);
  const linkWallet = async() => {
   const {address} = await sdkImxWeb.setupAccount();
   setAddr(address)
  };
  const buy = (orderIds) => {
    console.log(orderIds, 1111);
    sdkImxWeb.buy(orderIds);
  };
  const sell = () => {
    sdkImxWeb.sell(price, tokenId, tokenAddress);
  };
  const search = () => {
    sdkImxWeb.getOrders(tokenAddress);
  };
  const cancel = () => {
    sdkImxWeb.cancelOrder(order);
  };
  const transformNft = () => {
    sdkImxWeb.transferERC721(
      {
        id: "0x0f00d561071eac5d2ad0d7426e5c8965b8c81320b7643eac121542e413594ffd",
        token_address: "0x2880c6ecf2f770bd31ddb0d776cc81048899b600",
      },
      "0x09D5e8711bbb6bC376435E6A8625848E0dd01343"
    );
  };
 const getOrders = async() =>{
   if(!localStorage.getItem('okt_nft_address')) return message.error('请链接钱包');
   const orders = await sdkImxWeb.getOrders();
   console.log(orders);
   setList(orders);
 }
  const getBalance = async() =>{
    const bal =  await sdkImxWeb.getUserBalances();
    setBalance(bal)
  }
  const getAssetsData =  async() =>{
    const result = await sdkImxWeb.getAssets();
    setResult(result.result);
  }
  return (
    <div className="imx-container">
      <h1>Imx Game Marketplace</h1>
      {
            addr&&
            <p>Wallet Address：{addr}</p>
          }
          {
            balance&&
            <p>Account Balance:{balance}</p>
          }
      <Row gutter={16}>
        <Col span={12} className="gutter-row">
          <Button
            onClick={() => {
              linkWallet();
            }}
          >
            Link Wallet
          </Button>
         
        </Col>
        <Col span={12} className="gutter-row">
          <Input
            placeholder="Enter the order number"
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
          ></Input>
          <Button
            onClick={() => {
              buy({ orderIds: [order] });
            }}
          >
            Buy
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12} className="gutter-row">
          <Input
            placeholder="Enter a price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          ></Input>
          <Button
            onClick={() => {
              sell();
            }}
          >
            bid
          </Button>
        </Col>
        <Col span={12} className="gutter-row">
          <Input
            placeholder="Enter the order number"
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
          ></Input>
          <Button
            onClick={() => {
              search();
            }}
          >
            Inquire orderID
          </Button>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12} className="gutter-row">
          <Button
            onClick={() => {
              transformNft();
            }}
          >
            Transfer
          </Button>
        </Col>
        <Col span={12} className="gutter-row">
            <Input
              placeholder="Enter the order number"
              value={order}
              onChange={(e) => {
                setOrder(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                cancel();
              }}
            >
              Cancel Order
            </Button>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Button onClick={()=>{getBalance()}}>Query Account Balance</Button>
        </Col>
        <Col span={12}>
          <Button onClick={()=>{getOrders()}}>Query All Orders</Button>
        </Col>
      </Row>
      <Button onClick={()=>{sdkImxWeb.despoit('0.0001','USDC')}}>Recharge Tokens</Button>
      <Button onClick={()=>{getAssetsData()}}>Obtain Assets</Button>

      {list&&(
        list.map((item,index)=>{
          return <div key={item.order_id}>
            <p>Order Number：{item.order_id}</p>
            <p>User: {item.user}</p>
           </div>
        })
      )}

      {result&&(result.map((item)=>{
        return(
         <div key={item.id}>
            <p>token_address:{item.token_address}</p>
            <p>id:{item.id}</p> 
         </div>
        )
      }))}
    </div>
  );
};

export default App;
