import React from 'react';
const SummaryTable = props => {
  let datas = props.datas || {};
  return <table className='summary_table'>
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
              <td><div style={props.long_value_style}>{datas.hash || ''}</div></td>
            </tr>
            <tr>
              <td className='key'>nonce</td>
              <td>{datas.nonce || ''}</td>
              <td className='key'>prev_block</td>
              <td><div style={props.long_value_style}>{datas.prev_block || ''}</div></td>
            </tr>
            <tr>
              <td className='key'>size</td>
              <td>{datas.size || ''}</td>
              <td className='key'>next_block</td>
              <td><div style={props.long_value_style}>{datas.next_block || ''}</div></td>
            </tr>
            <tr>
              <td className='key'>bits</td>
              <td>{datas.bits || ''}</td>
              <td className='key'>mrkl_root</td>
              <td><div style={props.long_value_style}>{datas.mrkl_root || ''}</div></td>
            </tr>
            <tr>
              <td className='key'>ver</td>
              <td>{datas.ver || ''}</td>
              <td className='key'>n_tx</td>
              <td><div style={props.long_value_style}>{datas.n_tx || ''}</div></td>
            </tr>
          </tbody>
        </table>
}

export default SummaryTable;
