'use strict';

var features = [
    {
        '_id': '5822f9cd4cbbd103df9ef881',
        'name': 'Dashboard',
        'i18n': 'dashboard.MAIN',
        'sref' : 'app.dashboard',
        'rbac': {
            'roles': [
                {
                    '_actor': '5821f033e712050c4eaa3f29',
                    'value' : 300
                }
            ],
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f14',
                    'value' : 300,
                    'owner': true
                },
                {
                    '_actor': '5825f2ba13e3490e7024b562',
                    'value' : 200,
                    'owner': false
                },
                {
                    '_actor': '5825f2ba13e3490e7024b55d',
                    'value' : 100,
                    'owner': false
                }
            ]
        }
    },
    {
        '_id': '5822f9cd4cbbd103df9ef884',
        'name': 'Energy',
        'i18n': 'energy.ENERGY',
        'sref' : 'app.energy',
        'rbac': {
            'roles': [
                {
                    '_actor': '5821f033e712050c4eaa3f29',
                    'value' : 300
                }
            ],
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f14',
                    'value' : 300,
                    'owner': true
                },
                {
                    '_actor': '5825f2ba13e3490e7024b55d',
                    'value' : 200,
                    'owner': false
                }
            ]
        }
    },
    {
        '_id': '5822f9cd4cbbd103df9ef887',
        'name': 'Kpi',
        'i18n': 'energy.KPI',
        'sref' : 'app.energy.kpi',
        'rbac': {
            'roles': [
                {
                    '_actor': '5821f033e712050c4eaa3f29',
                    'value' : 300
                }
            ],
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f14',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    },
    {
        '_id': '5822f9cd4cbbd103df9ef88a',
        'name': 'Specific Consumptions',
        'i18n': 'energy.SPECIFIC-CONSUMPTIONS',
        'sref' : 'app.energy.specific-consumptions',
        'rbac': {
            'roles': [
                {
                    '_actor': '5821f033e712050c4eaa3f29',
                    'value' : 300
                }
            ],
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f14',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    },
    {
        '_id': '5822f9cd4cbbd103df9ef88d',
        'name': 'Specific Costs',
        'i18n': 'energy.SPECIFIC-COSTS',
        'sref' : 'app.energy.specific-costs',
        'rbac': {
            'roles': [
                {
                    '_actor': '5821f033e712050c4eaa3f29',
                    'value' : 300
                }
            ],
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f14',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    },
    {
        '_id': '5822f9cd4cbbd103df9ef890',
        'name': 'Custom Trend',
        'i18n': 'energy.CUSTOM-TREND',
        'sref' : 'app.energy.custom-trend',
        'rbac': {
            'roles': [
                {
                    '_actor': '5821f033e712050c4eaa3f29',
                    'value' : 300
                }
            ],
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f14',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    },
    {
        '_id': '5822f9cd4cbbd103df9ef893',
        'name': 'Comparative Trend',
        'i18n': 'energy.COMPARATIVE-TREND',
        'sref' : 'app.energy.comparative-trend',
        'rbac': {
            'roles': [
                {
                    '_actor': '5821f033e712050c4eaa3f29',
                    'value' : 300
                }
            ],
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f14',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    },
    {
        '_id': '5822f9cd4cbbd103df9ef896',
        'name': 'CUSUM',
        'i18n': 'energy.CUSUM',
        'sref' : 'app.energy.cusum',
        'rbac': {
            'roles': [
                {
                    '_actor': '5821f033e712050c4eaa3f29',
                    'value' : 300
                }
            ],
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f14',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    },
    {
        '_id': '5822f9cd4cbbd103df9ef899',
        'name': 'Config',
        'i18n': 'config.CONFIG',
        'sref' : 'app.config',
        'rbac': {
            'roles': [
                {
                    '_actor': '5821f033e712050c4eaa3f29',
                    'value' : 300
                }
            ],
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f14',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    },
    {
        '_id': '5822f9cd4cbbd103df9ef89c',
        'name': 'Users',
        'i18n': 'config.USERS',
        'sref' : 'app.config.user',
        'rbac': {
            'roles': [
                {
                    '_actor': '5821f033e712050c4eaa3f29',
                    'value' : 300
                }
            ],
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f14',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    },
    {
        '_id': '5822f9cd4cbbd103df9ef89f',
        'name': 'Roles',
        'i18n': 'config.ROLES',
        'sref' : 'app.config.role',
        'rbac': {
            'roles': [
                {
                    '_actor': '5821f033e712050c4eaa3f29',
                    'value' : 300
                }
            ],
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f14',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    },
    {
        '_id': '5822f9cd4cbbd103df9ef8a2',
        'name': 'Feature',
        'i18n': 'config.FEATURE',
        'sref' : 'app.config.feature',
        'rbac': {
            'roles': [
                {
                    '_actor': '5821f033e712050c4eaa3f29',
                    'value' : 300
                }
            ],
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f14',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    }


    ,
    {
        '_id': '583556f6cad1280366899ef2',
        'name': 'Network',
        'i18n': 'network.NETWORK',
        'sref' : 'app.network',
        'rbac': {
            'roles': [
                {
                    '_actor': '5821f033e712050c4eaa3f29',
                    'value' : 300
                }
            ],
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f14',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    }
    ,
    {
        '_id': '583556f6cad1280366899ef5',
        'name': 'Server',
        'i18n': 'network.SERVER',
        'sref' : 'app.network.server',
        'rbac': {
            'roles': [
                {
                    '_actor': '5821f033e712050c4eaa3f29',
                    'value' : 300
                }
            ],
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f14',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    },
    {
        '_id': '583556f6cad1280366899ef8',
        'name': 'Monitoring',
        'i18n': 'network.MONITORING',
        'sref' : 'app.network.monitoring',
        'rbac': {
            'roles': [
                {
                    '_actor': '5821f033e712050c4eaa3f29',
                    'value' : 300
                }
            ],
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f14',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    }
];

module.exports = features;