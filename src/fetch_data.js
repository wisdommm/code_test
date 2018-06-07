import { notification } from 'antd';
const getData = searchCode => {
	let url = `https://webbtc.com/block/${searchCode}.json`;
	return fetch( url ).then( json => {
    if(json.status === 200){
      return json.text().then( responseText => {
      	return JSON.parse(responseText);
      });
    }else{
      notification.error({
        message: 'error',
        description: '请求失败'
      });
    }
  })
}

export default getData;