var func = [{
		type: 'app-report',
		title: '已上报',
		url: '/app/event/reported/EventByUserID/queryPage'
	}, 
	{
		type: 'app-handle',
		title: '待处理',
		url: '/app/event/resultEvent/allEvent'
	},
	{
		type: 'app-check',
		title: '待核查',
		url: '/app/event/reported/toInspect/queryPage'
	},
	{
		type: 'app-accept-audit',
		title: '受理审核',
		url: '/app/event/acceptAndAuditEvent/allAcceptAndAuditEvent'
	},
	{
		type: 'app-see',
		title: '查看',
		url: '/app/event/query/allEvent'
	}
];

export default func;