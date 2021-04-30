const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app');

describe('POST /add_transaction', () => {

    var data = {
        "payer": "DANNON",
        "points": 1000,
        "timestamp": "2020-11-02T14:00:00Z"
    };

    it('Add points', (done) => {
        request(app)
        .post('/add_transaction')
        .send(data)
        .then((res) => {
            console.log(res.text);
            done();
        })
        .catch((err) => done(err));
    });
});

describe('POST /add_transaction', () => {

    var data = {
        "payer": "UNILEVER",
        "points": 200,
        "timestamp": "2020-10-31T11:00:00Z"
    };

    it('Add points', (done) => {
        request(app)
        .post('/add_transaction')
        .send(data)
        .then((res) => {
            console.log(res.text);
            done();
        })
        .catch((err) => done(err));
    });
});

describe('POST /add_transaction', () => {

    var data = {
        "payer": "DANNON",
        "points": -200,
        "timestamp": "2020-10-31T15:00:00Z"
    };

    it('Add points', (done) => {
        request(app)
        .post('/add_transaction')
        .send(data)
        .then((res) => {
            console.log(res.text);
            done();
        })
        .catch((err) => done(err));
    });
});

describe('POST /add_transaction', () => {

    var data = {
        "payer": "MILLER COORS",
        "points": 10000,
        "timestamp": "2020-11-01T14:00:00Z"
    };

    it('Add points', (done) => {
        request(app)
        .post('/add_transaction')
        .send(data)
        .then((res) => {
            console.log(res.text);
            done();
        })
        .catch((err) => done(err));
    });
});

describe('POST /add_transaction', () => {

    var data = {
        "payer": "DANNON",
        "points": 300,
        "timestamp": "2020-10-31T10:00:00Z"
    };

    it('Add points', (done) => {
        request(app)
        .post('/add_transaction')
        .send(data)
        .then((res) => {
            console.log(res.text);
            done();
        })
        .catch((err) => done(err));
    });
});

describe('POST /spend_points', () => {

    var data = {
        "points": 5000
    };

    it('Deduct points, First come first basis', (done) => {
        request(app)
        .post('/spend_points')
        .send(data)
        .then((res) => {
            console.log(res.text);
            done();
        })
        .catch((err) => done(err));
    });
});

describe('GET /points_balance', () => {

    it('Get points balance', (done) => {
        request(app)
        .get('/points_balance')
        .then((res) => {
            console.log(res.text);
            done();
        })
        .catch((err) => done(err));
    });
});