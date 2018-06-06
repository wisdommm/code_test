import React, { Component } from 'react';
import { Button, Table, Input, Row, Col, notification, Switch } from 'antd';
import './App.css';

const math_add = (arg1, arg2) => {
    let r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        let cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

let long_value_style = {};

const columns = [
  { title: 'in', dataIndex: 'in', key: 'in',
    render: data => {
      return data && data.length > 0 ? data.map((e,i)=>{
        return <div style={long_value_style} key={i}>{e.coinbase || 'no data'}</div>
      }) : ''
    }
  },
  { title: 'out', dataIndex: 'out', key: 'out',
    render: data => {
      return data && data.length > 0 ? data.map((e,i)=>{
        return <div style={long_value_style} key={i}>{e.address || 'no data'}</div>
      }) : ''
    }
  },
  { title: 'count', dataIndex: 'out', key: 'count',
    render: data => {
      return data && data.length > 0 ? data.map((e,i)=>{
        return <div key={i}>{e.value || '0'}</div>
      }) : ''
    }
  },
  { title: 'total', dataIndex: 'out', key: 'total',
    render: data => {
      let total = 0;
      data && data.length > 0 ? data.map((e,i)=>{
        total = math_add( Number(e.value), total );
      }) : ''
      return <Button type='primary'>{total}</Button>
    }
  }
];

const columns_one = [
  { title: 'hash', dataIndex: 'hash', key: 'hash',
    render: data => {
      return <div style={long_value_style}>{data}</div>
    }
  },
  { title: 'size', dataIndex: 'size', key: 'size',
    render: data => {
      return <div>{data}</div>
    }
  },
  { title: 'nid', dataIndex: 'nid', key: 'nid',
    render: data => {
      return <div style={long_value_style}>{data}</div>
    }
  }
];

class App extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      datas: [],
      showAddress: false
    };
    this.search = this.search.bind(this);
    this.showAddress = this.showAddress.bind(this);
  }

  componentDidMount(){
    this.search('000000000000000001806a922d4d35a37ad9324c690f72d556c6445cb7a9c214');
  }

  search(text){
    let _this = this;
    _this.setState({
      datas: {}
    });
    let url = `https://webbtc.com/block/${text}.json`;
    fetch( url ).then( json => {
      if(json.status === 200){
        json.text().then( responseText => {
          _this.setState({
            datas: JSON.parse(responseText)
          });
        });
      }else{
        notification.error({
          message: 'error',
          description: '请求失败'
        });
      }
    })
  }

  showAddress(show){
    this.setState({
      showAddress: show
    });
  }

  render() {
    const { datas, showAddress } = this.state;
    const expandedRowRender = () => {
      return <Table
              columns={columns}
              dataSource={datas.tx || []}
              pagination={true}
            />
    }

    long_value_style = showAddress ? { width: '500px' } : {
      width: '250px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
    
    return (
      <div className="App">
        <Row>
          <Input.Search
            defaultValue='000000000000000001806a922d4d35a37ad9324c690f72d556c6445cb7a9c214'
            placeholder="input search text"
            onSearch={this.search}
            style={{ width: 300 }}
          />
        </Row>
        <Row style={{margin:'30px 0',textAlign: 'center'}}>
          是否展示完整地址：
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            onChange={this.showAddress}
          />
        </Row>
        <Row style={{margin:'30px 0',textAlign: 'center'}}>
          <Col span={24}>
            <table className='summary_table'>
              <thead>
                <tr>
                  <td>summary</td>
                  <td></td>
                  <td>hash</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='key'>time</td>
                  <td>{datas.time ? new Date(datas.time*1000).toLocaleString() : ''}</td>
                  <td className='key'>hash</td>
                  <td><div style={long_value_style}>{datas.hash}</div></td>
                </tr>
                <tr>
                  <td className='key'>nonce</td>
                  <td>{datas.nonce || ''}</td>
                  <td className='key'>prev_block</td>
                  <td><div style={long_value_style}>{datas.prev_block}</div></td>
                </tr>
                <tr>
                  <td className='key'>size</td>
                  <td>{datas.size || ''}</td>
                  <td className='key'>next_block</td>
                  <td><div style={long_value_style}>{datas.next_block}</div></td>
                </tr>
                <tr>
                  <td className='key'>bits</td>
                  <td>{datas.bits || ''}</td>
                  <td className='key'>mrkl_root</td>
                  <td><div style={long_value_style}>{datas.mrkl_root}</div></td>
                </tr>
                <tr>
                  <td className='key'>ver</td>
                  <td>{datas.ver || ''}</td>
                  <td className='key'>n_tx</td>
                  <td><div style={long_value_style}>{datas.n_tx}</div></td>
                </tr>
              </tbody>
            </table>
          </Col>
          
        </Row>

        <Row>
          <Table
            className="components-table-demo-nested"
            columns={columns_one}
            dataSource={datas.tx || []}
            expandedRowRender={expandedRowRender}
            defaultExpandAllRows={true}
          />
        </Row>
      </div>
    );
  }
}

export default App;
