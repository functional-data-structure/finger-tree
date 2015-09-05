var pkg , opt ;

pkg = require( "aureooms-node-package" ) ;

opt = {
	src     : __dirname + "/src/" ,
	exports : module.exports ,
	base    : 0
} ;

pkg.include( opt ) ;
