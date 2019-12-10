'use strict';

var users = [
    {
        '_id': '5821f033e712050c4eaa3f14',
        'firstname': 'Alessandro',
        'lastname': 'Luciani',
        'email': 'alessandro.luciani@easyweb.it',
        'username': 'luciani',
        'password': 'alessandro',
        'phone': '3345667667',
        'avatar': 'alessandro.jpg',
        'roles': ['5821f033e712050c4eaa3f29']
    },
    {
        '_id': '5821f033e712050c4eaa3f15',
        'firstname': 'Marco',
        'lastname': 'Ricchiuti',
        'email': 'marco.ricchiuti@easyweb.it',
        'username': 'ricchiuti',
        'password': 'marco',
        'phone': '3345667667',
        'avatar': 'marco.jpg',
        'roles': ['5821f033e712050c4eaa3f29']
    },
    {
        '_id': '5821f033e712050c4eaa3f16',
        'firstname': 'Lucia',
        'lastname': 'Cirigliano',
        'email': 'lucia.cirigliano@easyweb.it',
        'username': 'cirigliano',
        'password': 'lucia',
        'phone': '3345667667',
        'avatar': 'lucia.jpg',
        'roles': ['5821f033e712050c4eaa3f29']
    },
    {
        '_id': '5821f033e712050c4eaa3f17',
        'firstname': 'Roberto',
        'lastname': 'Bottini',
        'email': 'roberto.bottini@easyweb.it',
        'username': 'bottini',
        'password': 'roberto',
        'phone': '3345667667',
        'avatar': 'roberto.jpg',
        'roles': ['5821f033e712050c4eaa3f29']
    },
    {
        '_id': '5821f033e712050c4eaa3f18',
        'firstname': 'Raffaele',
        'lastname': 'Casale',
        'email': 'raffaele.casele@easyweb.it',
        'username': 'casale',
        'password': 'raffaele',
        'phone': '3345667667',
        'avatar': 'raffaele.jpg',
        'roles': ['5821f033e712050c4eaa3f29']
    },
    {
        '_id': '5821f033e712050c4eaa3f19',
        'firstname': 'Marcello',
        'lastname': 'Esposito',
        'email': 'bussiness@easyweb.it',
        'username': 'esposito',
        'password': 'marcello',
        'phone': '3345667667',
        'avatar': 'marcello.jpg',
        'roles': ['5821f033e712050c4eaa3f29']
    },
    {
        '_id': '5825f2ba13e3490e7024b559',
        'firstname': 'Arthur',
        'lastname': 'Watson',
        'email': 'awatson0@google.ca',
        'username': 'awatson0',
        'password': 'maximus',
        'phone': '84-(848)954-1318',
        'avatar': 'demouser_1m.jpg'
    },
    {
        '_id': '5825f2ba13e3490e7024b55a',
        'firstname': 'Melissa',
        'lastname': 'Barnes',
        'email': 'mbarnes1@networksolutions.com',
        'username': 'mbarnes1',
        'password': 'maximus',
        'phone': '351-(995)687-8264',
        'avatar': 'demouser_1f.jpg'
    }, {
        '_id': '5825f2ba13e3490e7024b55b',
        'firstname': 'Billy',
        'lastname': 'Roberts',
        'email': 'broberts2@miitbeian.gov.cn',
        'username': 'broberts2',
        'password': 'maximus',
        'phone': '81-(311)348-4192',
        'avatar': 'demouser_2m.jpg'
    }, {
        '_id': '5825f2ba13e3490e7024b55c',
        'firstname': 'Todd',
        'lastname': 'Washington',
        'email': 'twashington3@nymag.com',
        'username': 'twashington3',
        'password': 'maximus',
        'phone': '237-(188)629-3982',
        'avatar': 'demouser_3m.jpg'
    }, {
        '_id': '5825f2ba13e3490e7024b55d',
        'firstname': 'Virginia',
        'lastname': 'Spencer',
        'email': 'vspencer4@studiopress.com',
        'username': 'vspencer4',
        'password': 'maximus',
        'phone': '255-(889)911-7513',
        'avatar': 'demouser_2f.jpg'
    }, {
        '_id': '5825f2ba13e3490e7024b55e',
        'firstname': 'Ruby',
        'lastname': 'Burton',
        'email': 'rburton5@aol.com',
        'username': 'rburton5',
        'password': 'maximus',
        'phone': '251-(417)967-3139',
        'avatar': 'demouser_3f.jpg'
    },
    {
        '_id': '5825f2ba13e3490e7024b55f',
        'firstname': 'Fred',
        'lastname': 'Kelley',
        'email': 'fkelley6@lycos.com',
        'username': 'fkelley6',
        'password': 'maximus',
        'phone': '86-(279)633-6442',
        'avatar': 'demouser_4m.jpg'
    }, {
        '_id': '5825f2ba13e3490e7024b560',
        'firstname': 'Margaret',
        'lastname': 'Schmidt',
        'email': 'mschmidt7@go.com',
        'username': 'mschmidt7',
        'password': 'maximus',
        'phone': '86-(107)812-2693',
        'avatar': 'demouser_4f.jpg'
    }, {
        '_id': '5825f2ba13e3490e7024b561',
        'firstname': 'Randy',
        'lastname': 'Kennedy',
        'email': 'rkennedy8@newsvine.com',
        'username': 'rkennedy8',
        'password': 'maximus',
        'phone': '51-(444)108-9708',
        'avatar': 'demouser_5f.jpg'
    }, {
        '_id': '5825f2ba13e3490e7024b562',
        'firstname': 'Carol',
        'lastname': 'Chapman',
        'email': 'cchapman9@bbb.org',
        'username': 'cchapman9',
        'password': 'maximus',
        'phone': '46-(822)623-7643',
        'avatar': 'demouser_6f.jpg'
    }, {
        '_id': '5825f2ba13e3490e7024b563',
        'firstname': 'Scott',
        'lastname': 'Greene',
        'email': 'sgreenea@plala.or.jp',
        'username': 'sgreenea',
        'password': 'maximus',
        'phone': '7-(523)604-0295',
        'avatar': 'demouser_5m.jpg'
    },
    {
        '_id': '5825f2ba13e3490e7024b564',
        'firstname': 'Billy',
        'lastname': 'Phillips',
        'email': 'bphillipsb@gizmodo.com',
        'username': 'bphillipsb',
        'password': 'maximus',
        'phone': '86-(110)806-7442',
        'avatar': 'demouser_6m.jpg'
    }, {
        '_id': '5825f2ba13e3490e7024b565',
        'firstname': 'Ralph',
        'lastname': 'Sanchez',
        'email': 'rsanchezc@surveymonkey.com',
        'username': 'rsanchezc',
        'password': 'maximus',
        'phone': '33-(539)746-2014',
        'avatar': 'demouser_7m.jpg'
    }, {
        '_id': '5825f2ba13e3490e7024b566',
        'firstname': 'Louis',
        'lastname': 'Ortiz',
        'email': 'lortizd@clickbank.net',
        'username': 'lortizd',
        'password': 'maximus',
        'phone': '267-(822)786-4876',
        'avatar': 'demouser_8m.jpg'
    }, {
        '_id': '5825f2ba13e3490e7024b567',
        'firstname': 'Joyce',
        'lastname': 'Harris',
        'email': 'jharrise@nps.gov',
        'username': 'jharrise',
        'password': 'maximus',
        'phone': '48-(939)757-7702',
        'avatar': 'demouser_8f.jpg'
    }
];

module.exports = users;