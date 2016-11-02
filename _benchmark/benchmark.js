require( 'babel-polyfill' ) ;

var itertools = require( 'aureooms-js-itertools' ) ;

var qiao_fingertree = require( 'fingertree' ) ;
var fromArray = qiao_fingertree.fromArray ;
var aureooms_fingertree = require( '..' ) ;
var empty = aureooms_fingertree.empty ;
var from = aureooms_fingertree.from ;

var COUNTER = {
	plus : function ( a , b ) { return a + b ; } ,
	measure : function ( x ) { return 1 ; } ,
	zero : function ( ) { return 0 ; } ,
} ;

var ArgumentParser = require( 'argparse' ).ArgumentParser ;
var parser = new ArgumentParser( ) ;
parser.addArgument( [ 'M' ] ) ;
var args = parser.parseArgs( ) ;

global.M = args.M ;
global.COUNTER = COUNTER ;
global.fromArray = fromArray ;
global.empty = empty ;
global.from = from ;
global.range = itertools.range ;

var Benchmark = require( 'benchmark' ) ;

// PUSH

var PUSH = new Benchmark.Suite( )
.on( 'start' , function ( ) { console.log( '\nPUSH\n==\n' ) ; } )
.add('Array#push', function ( ) {
	var a = [ ] ;
	var _M = M ;
	for ( var i = 0 ; i < _M ; ++i ) a.push( i ) ;
})
.add('fingertree#addLast', function() {
	var t = fromArray( [ ] ) ;
	var _M = M ;
	for ( var i = 0 ; i < _M ; ++i ) t = t.addLast( i ) ;
})
.add('aureooms-js-fingertree#push', function() {
	var t = empty( COUNTER ) ;
	var _M = M ;
	for ( var i = 0 ; i < _M ; ++i ) t = t.push( i ) ;
}) ;

if ( M <= 1000 )
PUSH.add('Mock#push', function() {
	var m = [ ] ;
	var _M = M ;
	for ( var i = 0 ; i < _M ; ++i ) m = m.concat( [ i ] ) ;
}) ;

PUSH
.on('cycle', function(event) {
	console.log(String(event.target));
})
.on('complete', function() {
	console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': false });

// CONS

var CONS = new Benchmark.Suite( )
.on( 'start' , function ( ) { console.log( '\nCONS\n==\n' ) ; } ) ;

if ( M <= 10000 )
CONS.add('Array#unshift', function ( ) {
	var a = [ ] ;
	var _M = M ;
	for ( var i = 0 ; i < _M ; ++i ) a.unshift( i ) ;
}) ;

CONS.add('fingertree#addFirst', function() {
	var t = fromArray( [ ] ) ;
	var _M = M ;
	for ( var i = 0 ; i < _M ; ++i ) t = t.addFirst( i ) ;
})
.add('aureooms-js-fingertree#cons', function() {
	var t = empty( COUNTER ) ;
	var _M = M ;
	for ( var i = 0 ; i < _M ; ++i ) t = t.cons( i ) ;
}) ;
if ( M <= 1000 )
CONS.add('Mock#cons', function() {
	var m = [ ] ;
	var _M = M ;
	for ( var i = 0 ; i < _M ; ++i ) m = [ i ].concat( m ) ;
}) ;

CONS
.on('cycle', function(event) {
	console.log(String(event.target));
})
.on('complete', function() {
	console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': false });

// INIT

var setup = function ( ) {
	var i ;
	var a = [ ] ;
	var _M = M ;
	for ( i = 0 ; i < _M ; ++i ) a.push( i ) ;
	var qt = fromArray( [ ] ) ;
	for ( i = 0 ; i < _M ; ++i ) qt = qt.addLast( i ) ;
	var at = empty( COUNTER ) ;
	for ( i = 0 ; i < _M ; ++i ) at = at.push( i ) ;
} ;
var INIT = new Benchmark.Suite( )
.on( 'start' , function ( ) { console.log( '\nINIT\n==\n' ) ; } )
.add('Array#pop', function ( ) {
	var _a = a.slice( ) ;
	for ( var i = 0 ; i < _M ; ++i ) _a.pop( ) ;
} , { setup : setup } )
.add('fingertree#removeLast', function ( ) {
	var _t = qt ;
	for ( var i = 0 ; i < _M ; ++i ) _t = _t.removeLast( ) ;
} , { setup : setup } )
.add('aureooms-js-fingertree#init', function ( ) {
	var _t = at ;
	for ( var i = 0 ; i < _M ; ++i ) _t = _t.init( ) ;
} , { setup : setup } ) ;

if ( M <= 1000 )
INIT.add('Mock#init', function ( ) {
	var _m = a ;
	for ( var i = 0 ; i < _M ; ++i ) _m = _m.slice( 0 , _m.length - 1 ) ;
} , { setup : setup } ) ;

INIT
.on('cycle', function(event) {
	console.log(String(event.target));
})
.on('error', function(event) {
	console.dir(event);
})
.on('complete', function() {
	console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': false });

// TAIL

var TAIL = new Benchmark.Suite( )
.on( 'start' , function ( ) { console.log( '\nTAIL\n==\n' ) ; } ) ;

if ( M <= 10000 )
TAIL.add('Array#shift', function ( ) {
	var _a = a.slice( ) ;
	for ( var i = 0 ; i < _M ; ++i ) _a.shift( ) ;
} , { setup : setup } ) ;

TAIL.add('fingertree#removeLast', function ( ) {
	var _t = qt ;
	for ( var i = 0 ; i < _M ; ++i ) _t = _t.removeFirst( ) ;
} , { setup : setup } )
.add('aureooms-js-fingertree#init', function ( ) {
	var _t = at ;
	for ( var i = 0 ; i < _M ; ++i ) _t = _t.tail( ) ;
} , { setup : setup } ) ;

if ( M <= 1000 )
TAIL.add('Mock#init', function ( ) {
	var _m = a ;
	for ( var i = 0 ; i < _M ; ++i ) _m = _m.slice( 1 ) ;
} , { setup : setup } ) ;

TAIL
.on('cycle', function(event) {
	console.log(String(event.target));
})
.on('error', function(event) {
	console.dir(event);
})
.on('complete', function() {
	console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': false });

// APPEND

var APPEND = new Benchmark.Suite( )
.on( 'start' , function ( ) { console.log( '\nAPPEND\n==\n' ) ; } )
.add('aureooms-js-fingertree#append', function() {
	at.append( range( M ) ) ;
} , { setup : setup } ) ;

if ( M <= 1000 )
APPEND.add('Mock#append', function() {
	a.concat( Array.from( range( M ) ) ) ;
} , { setup : setup } ) ;

APPEND
.on('cycle', function(event) {
	console.log(String(event.target));
})
.on('complete', function() {
	console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': false });

// PREPEND

var PREPEND = new Benchmark.Suite( )
.on( 'start' , function ( ) { console.log( '\nPREPEND\n==\n' ) ; } )
.add('aureooms-js-fingertree#prepend', function() {
	at.prepend( range( M ) ) ;
} , { setup : setup } ) ;

if ( M <= 1000 )
PREPEND.add('Mock#prepend', function() {
	Array.from( range( M ) ).concat( a ) ;
} , { setup : setup } ) ;

PREPEND
.on('cycle', function(event) {
	console.log(String(event.target));
})
.on('complete', function() {
	console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': false });

// FROM

new Benchmark.Suite( )
.on( 'start' , function ( ) { console.log( '\nFROM\n==\n' ) ; } )
.add('fingertree.fromArray', function() {
	fromArray( Array.from( range( M ) ) ) ;
})
.add('aureooms-js-fingertree.from', function() {
	from( COUNTER , range( M ) ) ;
})
.add('Mock.from', function() {
	Array.from( range( M ) ) ;
})
.on('cycle', function(event) {
	console.log(String(event.target));
})
.on('complete', function() {
	console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': false });

// SPLIT

var SPLIT = new Benchmark.Suite( )
.on( 'start' , function ( ) { console.log( '\nSPLIT\n==\n' ) ; } )
.add('fingertree#split', function ( ) {
	var _M = M ;
	var _qt = qt ;
	for ( var i = 0 ; i < _M ; ++i ) _qt.split( function ( m ) { return m > i ; } ) ;
} , { setup : setup } )
.add('aureooms-js-fingertree#split', function ( ) {
	var _M = M ;
	var _at = at ;
	for ( var i = 0 ; i < _M ; ++i ) _at.split( function ( m ) { return m > i ; } ) ;
} , { setup : setup } ) ;

if ( M < 1000 )
SPLIT.add('Mock#split', function() {
	var _M = M ;
	var _a = a ;
	for (var i = 0; i < _M; ++i) {
		_a.slice( 0 , i ) ;
		_a.slice( i ) ;
	}
} , { setup : setup } ) ;

SPLIT
.on('cycle', function(event) {
	console.log(String(event.target));
})
.on('complete', function() {
	console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': false });

// CONCAT

new Benchmark.Suite( )
.on( 'start' , function ( ) { console.log( '\nCONCAT\n==\n' ) ; } )
// I had to put this version first because the second uses a lot of memory.
// This is probably because qiao/fingetree.js keeps references of used thunks.
.add('aureooms-js-fingertree#concat', function ( ) {
	var _M = M ;
	var _s = splits ;
	for ( var i = 0 ; i < _M ; ++i ) _s[i][0].concat( _s[i][1] ) ;
} , { setup : function ( ) {
		var t = from( COUNTER , range( M ) ) ;
		var splits = [ ] ;
		for (var i = 0; i < M; ++i) {
		  splits.push( t.split( function ( m ) { return m > i ; } ) ) ;
		}
	} ,
	teardown : function ( ) {
		splits.splice( 0 ) ;
	}
} )
.add('fingertree#concat', function ( ) {
	var _M = M ;
	var _s = splits ;
	for ( var i = 0 ; i < _M ; ++i ) _s[i][0].concat( _s[i][1] ) ;
} , { setup : function ( ) {
		var t = fromArray( Array.from( range( M ) ) ) ;
		var splits = [ ] ;
		for (var i = 0; i < M; ++i) {
		  splits.push( t.split( function ( m ) { return m > i ; } ) ) ;
		}
	} ,
	teardown : function ( ) {
		splits.splice( 0 ) ;
	}
} )
.on('cycle', function(event) {
	console.log(String(event.target));
})
.on('complete', function() {
	console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': false });
