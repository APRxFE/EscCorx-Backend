var Rx = require('rxjs/Rx')
var fireCorx = require('../FireCorx-Backend')
var elasticsearch = require('elasticsearch')

var esc

exports.init = (escConfig) => {
	esc = new elasticsearch.Client(escConfig)
	handleDisconnect()
}

var handleDisconnect = () => {
	let _ = setInterval(() => {
		esc.ping().then(() => { clearInterval(_); initFlashlight() })
	}, 5000)
}

var initFlashlight = () => {
	PathMonitor.process(esc, [
		{
			path: 'ex',
			index: 'firebase',
			type: 'JSON',
			fields: ['item']
			//filter: (data) => data.b !== 'bb'
		}
	])

	/*
	fbutil.init(conf.FB_URL, conf.FB_SERVICEACCOUNT)
	PathMonitor.process(esc, conf.paths, conf.FB_PATH)
	SearchQueue.init(esc, conf.FB_REQ, conf.FB_RES, conf.CLEANUP_INTERVAL)
	*/
}