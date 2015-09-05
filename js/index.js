var pkg , fs , data , opt ;

pkg  = require( "aureooms-node-package" ) ;

fs   = require( "fs" ) ;
data = fs.readFileSync( pkg.config, "utf8" ) ;
opt  = JSON.parse( data ) ;

opt = {
	name    : opt.name ,
	src     : __dirname + "/src/" ,
	exports : module.exports ,
	base    : 0 ,
	debug   : opt.debug
} ;

pkg.include( opt ) ;
