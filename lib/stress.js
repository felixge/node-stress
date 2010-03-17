var
  sys = require('sys'),

  config = {
    duration: 100,
    samples: 10,
    multiplier: 2,
  };

exports.config = function(options) {
  process.mixin(config, options);
};

exports.test = function(name, fn) {
  var
    start,
    iterations = 1,
    samples = [],
    totalTime = 0,
    totalIterations = 0;

  function run() {
    start = +(new Date);
    if (fn.length == 2) {
      fn(iterations, after);
    } else {
      after(fn(iterations));
    }
  };

  function after(time) {
    time = (time === undefined)
      ? ((+new Date) - start)
      : time;

    if (time < config.duration) {
      iterations = iterations * config.multiplier;
    } else {
      samples.push(iterations / (time / 1000));
      totalTime += time;
      totalIterations += iterations;
    }
    
    if (samples.length < config.samples) {
      run();
    } else {
      done();
    }
  };

  function done() {
    sys.puts(name+':');
    sys.puts('  samples: '+exports.formatNum(samples.length));
    // sys.puts('  time per sample: >='+exports.formatNum(config.duration)+' ms');
    sys.puts('  iterations per sample: '+exports.formatNum(iterations));
    // sys.puts('  total iterations: '+exports.formatNum(totalIterations));
    // sys.puts('  total time: '+exports.formatNum(totalTime)+' ms');
    sys.puts('  mean: '+exports.formatNum(exports.mean(samples).toFixed(0))+' iterations / sec');
    sys.puts('  median: '+exports.formatNum(exports.median(samples).toFixed(0))+' iterations / sec');
    sys.puts('  standard deviation: +/-'+exports.formatNum(exports.standardDeviation(samples).toFixed(0))+' iterations / sec');
    sys.puts('  coefficient of variation: '+exports.coefficientOfvariation(samples).toFixed(2)+'%');
  };

  run();
};

exports.formatNum = function(number) {
  number = String(number);
  var parts = [];
  while (number.length) {
    parts.unshift(number.substr(
      (number.length >= 3)
        ? number.length - 3
        : 0
    ));
    number = number.substr(0, number.length - 3);
  }
  return parts.join('.');
};

exports.mean = function(a) {
  var total = 0;
  a.forEach(function(val) {
    total += val;
  });
  return total / a.length;
};

exports.coefficientOfvariation = function(a) {
  return exports.standardDeviation(a) / exports.mean(a) * 100;
};

exports.standardDeviation = function(a) {
  var
    mean = exports.mean(a);
    deviations = a.map(function(val) {
      return Math.pow(val - mean, 2);
    }),
    sum = 0;

  deviations.forEach(function(val) {
    sum += val;
  });

  return Math.sqrt(sum / a.length);
};

exports.median = function(a) {
  a.sort();
  return (a.length % 2)
    ? a[(a.length - 1) / 2]
    : (a[(a.length / 2)] + a[(a.length / 2) - 1]) / 2
};