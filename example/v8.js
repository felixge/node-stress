var stress = require('../lib/stress');

stress.test('objectSet', function(iterations) {
  var o = {}, i = 0;
  for (; i < iterations; i++) {
    o[i] = 'This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256';
  }
});

stress.test('arrayPush', function(iterations) {
  var a = [], i = 0;
  for (; i < iterations; i++) {
    a.push('This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256');
  }
});