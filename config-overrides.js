const { injectBabelPlugin } = require('react-app-rewired')
module.export = function(config, env){
	config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
	return config;
};