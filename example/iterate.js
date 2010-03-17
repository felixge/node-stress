var stress = require('../lib/stress');

stress.config({
  samples: 3,
  duration: 10000
});

stress.test('forVar', function(iterations) {
  var o = {}, i = 0, start;
  for (; i < iterations; i++) {
    o[i] = 'This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256';
  }

  i = 0;
  start = +new Date;

  for (var k in o) {
    if (o[k].length !== 256) {
      throw new Error('ouch, wtf');
    }
 
    i++;
  }

  return (+new Date - start);
});
// 
// stress.test('forEach', function(iterations) {
//   var a = [], i = 0, start;
//   for (; i < iterations; i++) {
//     a.push('This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256 byte string. This is a 256');
//   }
// 
//   i = 0;
//   start = +new Date;
// 
//   a.forEach(function(str) {
//     if (str.length !== 256) {
//       throw new Error('ouch, wtf');
//     }
// 
//     i++;
//   });
// 
//   return (+new Date - start);
// });