/*!
 * jQuery WindowAnimationTiming - Copyright (c) 2012 Jacob Buck
 * https://github.com/jacobbuck/jQuery-WindowAnimationTiming
 * Licensed under the terms of the MIT license.
 */
(function ( window, jQuery ) {
	var timerId,
		requestAnimationFrame = window.requestAnimationFrame,
		cancelAnimationFrame  = window.cancelAnimationFrame,
		vendors = [ 'ms', 'moz', 'webkit', 'o' ],
		i = 0;
	for ( ; i < vendors.length && ! requestAnimationFrame; i++ ) {
		requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
		cancelAnimationFrame  = window[vendors[i] + 'CancelAnimationFrame'] 
		                     || window[vendors[i] + 'CancelRequestAnimationFrame'];
	}
	if ( requestAnimationFrame && cancelAnimationFrame ) {
		function loop () {
			jQuery.fx.tick();
			timerId = requestAnimationFrame( loop );
		};
		jQuery.fx.timer = function( timer ) {
			if ( timer() && jQuery.timers.push( timer ) && ! timerId )
				timerId = requestAnimationFrame( loop );
		};
		jQuery.fx.stop = function() {
			cancelAnimationFrame( timerId );
			timerId = 0;
		};
	}
})( window, jQuery );