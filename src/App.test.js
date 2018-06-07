import React from 'react';
import { shallow,mount } from 'enzyme';
import mock_data from './mock_data.js'
import getData from './fetch_data';
import App from './App';
import SummaryTable from './SummaryTable';
import { Table, Input, Switch } from 'antd';
const Search = Input.Search;

describe('<App />', () => {

	it('renders Components', () => {
	    const wrapper = shallow(<App />);

	    expect(wrapper.find(Table).length).toBe(1);

	    expect(wrapper.find(Search).length).toBe(1);

	    expect(wrapper.find(Switch).length).toBe(1);

	    expect(wrapper.find(SummaryTable).length).toBe(1);

	    expect( wrapper.find(SummaryTable).render().find('.key').length ).toBe(10);
	});

	it('should not display any info by default', () => {
	    const wrapper = shallow(<App />);

	    expect( JSON.stringify( wrapper.find('.components-table-demo-nested').prop('dataSource') ) ).toBe('[]');
	});

	it('should display a input to fill search text', () => {
	    const wrapper = mount(<App />);
	
	    expect(wrapper.find('input[type="text"]').length).toBe(1);
	});


	it('should render Components by default state', () => {
	    const wrapper = mount(<App />);

		expect( JSON.stringify( wrapper.state().datas ) ).toBe('{}');
	    
	    expect(wrapper.state().showAddress).toBe(false);
	});

	it('click Switch', () => {
		const wrapper = mount(<App />);

		expect( JSON.stringify( wrapper.find(Search).props().style ) ).toBe('{\"width\":300}');

		expect( JSON.stringify( wrapper.find(SummaryTable).props().long_value_style ) ).toBe('{\"width\":\"250px\",\"whiteSpace\":\"nowrap\",\"overflow\":\"hidden\",\"textOverflow\":\"ellipsis\"}');

		wrapper.find('.ant-switch').simulate('click');

		expect( JSON.stringify( wrapper.find(Search).props().style ) ).toBe('{\"width\":600}');

		expect( JSON.stringify( wrapper.find(SummaryTable).props().long_value_style ) ).toBe('{\"width\":\"500px\"}');
	});

	it('should render <App /> correctly',() => {
		const wrapper = shallow(<App />);

		expect(wrapper).toMatchSnapshot();

	});

	



	






});
