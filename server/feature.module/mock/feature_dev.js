'use strict';

var features = [
    {
        '_id': '5822f9cd4cbbd103df9ef881',
        'name': 'Dashboard',
        'i18n': 'dashboard.MAIN',
        'sref' : 'app.dashboard',
        'rbac': {
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
        '_id': '5822f9cd4cbbd103df9ef899',
        'name': 'Config',
        'i18n': 'config.CONFIG',
        'sref' : 'app.config',
        'rbac': {
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f15',
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
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f15',
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
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f15',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    },
    {
        '_id': '583556f6cad1280366899ef2',
        'name': 'Network',
        'i18n': 'network.NETWORK',
        'sref' : 'app.network',
        'rbac': {
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f16',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    },
    {
        '_id': '583556f6cad1280366899ef5',
        'name': 'Server',
        'i18n': 'network.SERVER',
        'sref' : 'app.network.server',
        'rbac': {
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f16',
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
        'sref' : 'app.network.net-monitoring',
        'rbac': {
            'users': [
                {
                    '_actor': '5821f033e712050c4eaa3f16',
                    'value' : 300,
                    'owner': true
                }
            ]
        }
    }
];

module.exports = features;