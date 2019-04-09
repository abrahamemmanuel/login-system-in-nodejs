"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('homepage', function () {
  it('Welcomes the user', function (done) {
    (0, _supertest.default)(_server.default).get('/').expect(200).expect(/Welcome To Nodejs Login System/, done);
  });
});
//# sourceMappingURL=hompage.test.js.map