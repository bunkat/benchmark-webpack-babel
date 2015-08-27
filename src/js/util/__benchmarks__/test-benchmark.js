import benchmark from 'benchmark';
import benchmarks from 'beautify-benchmark';

let suite = new benchmark.Suite;

// add tests
suite.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})
// add listeners
.on('cycle', function(event) {
  benchmarks.add(event.target);
})
.on('complete', function() {
  benchmarks.log();
})
// run async
.run();

