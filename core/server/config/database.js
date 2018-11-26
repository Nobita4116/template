/**
 * Config sql database
 */
export default {
	localhost: {
		default: {
			host: process.env.MYSQL_HOST || '127.0.0.1',
			// host: process.env.MYSQL_HOST || '45.117.169.9',
			port: process.env.MYSQL_PORT || '3306',
			username: process.env.MYSQL_USERNAME || 'root',
			// password: process.env.MYSQL_PASSWORD || 'jKLjoKSOmRMOTXtmfQz7',
			password: process.env.MYSQL_PASSWORD || '',
			database: process.env.MYSQL_DB || 'dev_vegetable',
			dialect: 'mysql',
			logging: true,
			pool: { max: 10, min: 0, idle: 1000}
		}
	},
	// development: {
	// 	default: {
	// 		host: process.env.MYSQL_HOST || '127.0.0.1',
	// 		port: process.env.MYSQL_PORT || '3306',
	// 		username: process.env.MYSQL_USERNAME || 'sohatv',
	// 		password: process.env.MYSQL_PASSWORD || 'qOz2%fmbrrjqyN#A',
	// 		database: process.env.MYSQL_DB || 'test_graphql',
	// 		dialect: 'mysql',
	// 		logging: true,
	// 		pool: { max: 10, min: 0, idle: 1000}
	// 	}
	// },
	// production: {
	// 	default: {
	// 		host: process.env.MYSQL_HOST || '45.117.169.9',
	// 		port: process.env.MYSQL_PORT || '3306',
	// 		username: process.env.MYSQL_USERNAME || 'edcity',
	// 		password: process.env.MYSQL_PASSWORD || 'gHxB7X9ogDm2U6ujNVYq',
	// 		database: process.env.MYSQL_DB || 'dev_ico',
	// 		dialect: 'mysql',
	// 		logging: false,
	// 		pool: { max: 10, min: 0, idle: 1000}
	// 	}
	// }
};