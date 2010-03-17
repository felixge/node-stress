var stress = require('../lib/stress');

function Inlined() {
  var buffer = [];

  this.write = function(data) {
    buffer.push(data);
  };
}

function Prototyped() {
  this._buffer = [];
}

Prototyped.prototype.write = function(data) {
  this._buffer.push(data);
};


stress.test('inlined', function(iterations) {
  var inlined;

  for (var i = 0; i < iterations; i++) {
    inlined = new Inlined();
    inlined.write('test');
  }
});

stress.test('prototyped', function(iterations) {
  var prototyped;

  for (var i = 0; i < iterations; i++) {
    prototyped = new Prototyped();
    prototyped.write('test');
  }
});