//write npm command line to install mocha
//npm install --global mocha

//command to run this test file
//mocha test.js

const assert = require('assert');
const http = require('http');

const server = require('./nodeserver.js');



describe('Node Server', () => {
    it('should return "key not passed" if key is not passed', (done) => {
        http
            .get('http://localhost:3000/get', (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    assert.equal(data, 'key not passed');
                    done();
                });
            });
    });

    //add test to check get when key is equal to world
    it('should return "hello world" if key is equal to world', (done) => {
        http
            .get('http://localhost:3000/get?key=world', (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    assert.equal(data, 'hello world');
                    done();
                });
            });
    });

    //add test to check validatephoneNumber when phonenumber is valid
    it('should return "valid" if phonenumber is valid', (done) => {
        http
            .get('http://localhost:3000/validatephonenumber?phonenumber=+34666555444', (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    assert.equal(data, 'valid');
                    done();
                });
            });
    });



    //write test to validate validateSpanishDNI
    it('should return "valid" if dni is valid', (done) => {
        http
            .get('http://localhost:3000/validatespanishdni?dni=12345678Z', (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    assert.equal(data, 'valid');
                    done();
                });
            });
    });



    //write test for returnColorCode red should return code #FF0000
    it('should return "#FF0000" if color is red', (done) => {
        http
            .get('http://localhost:3000/returncolorcode?color=red', (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    assert.equal(data, '#FF0000');
                    done();
                });
            });
    });



    //write test for daysBetweenDates
    it('should return "30" if date1 is 2018-01-01 and date2 is 2018-01-31', (done) => {
        http
            .get('http://localhost:3000/daysbetweendates?date1=2018-01-01&date2=2018-01-31', (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    assert.equal(data, '30');
                    done();
                });
            });
    });

});