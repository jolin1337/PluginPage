
	/*************************************************************
			Name: CanvasApp
			Description:
				This object will make any element in html to 
				fullscreen by calling makeCanvas.init(). 
			Author: Johannes Lindén <johannes.93.1337@gmail.com>

	**************************************************************/


(function(window,undefined) {

		/*************************************************************
			Function description in canvasApplet, the main object
				- scope is declared as canvasApplet
				- outhorize checks for outhorization, if the element
					is accepted by fullscreen
				- makeCanvasEl makes the element fullscreen
				- init inisializes the entire procedure
				- resetObject resets the object to default state
			makeCanvas is a copy of the local canvasApplet but in 
				the global scope

		**************************************************************/

	var canvasApplet = function() {
			// declare this object as scope
		var scope = this,
			elems = [];
			// check outhorization of the element/canvas tags
		this.outhorize = function( c, undefined ) {
			if( c == undefined ) {	// if no element inputed
					// declare array of all canvas elements
				var canvasel = window.document.getElementsByTagName( "canvas" );
				if( canvasel.length > 1 )	// if there is more than one canvas element
						// log a warning
					console.log( "warning: more than one canvas element detected!" );
					// make the element fit the screen
				scope.makeCanvasEl( canvasel[0] );
			}
			else 	// if the element is pased as argument
					// set fullscreen on the element pased
				scope.makeCanvasEl( c );
		};
			// make element fullscreen
		this.makeCanvasEl = function( canvas ) {
				// save prev data
			canvas.position = canvas.style.position;	// set position 
			canvas.top  = canvas.style.top;				// set position top offset
			canvas.left = canvas.style.left;			// set position left offset
			canvas.width2 = canvas.width;				// set width2 
			canvas.height2 = canvas.height;				// set height2

			canvas.style.position = "absolute";	// set position absolute
			canvas.style.top  = "0px";			// set position top offset to 0px
			canvas.style.left = "0px";			// set position left offset to 0px
			canvas.width = innerWidth;			// set width to the content width
			canvas.height = innerHeight;		// set height to the content height

				// add identifier id
			canvas.identifier = elems.length;
			elems.push(canvas);	// push the element to array
		};
			// init the fullscreen view
		this.init = function(c) {
				// add fullscreen even if resized
			window.addEventListener("resize", function(){scope.outhorize(c);}, false);
				// validate the outhorization
			scope.outhorize(c);
				// if this has been set as a listener, remove it
			window.removeEventListener(this);
		};
			// resets the object specified with param elm to default state
		this.resetObject = function(elm) {
			if( elm.style && elm.width && elm.height ) {	// if the param elm is an element
				if(!(elm.style.position == "absolute" &&
					elm.style.top == "0px" &&
					elm.style.left == "0px" &&
					elm.width == innerWidth && 
					elm.height == innerHeight) )	// if it's not in fullscreenmode
						console.log( elm, "The element is not in fullscreenview." );
				
				for( var i in elems )	// loop all stored elements 
					if( elems[i].identifier == elm.identifier ){	// detect the selected one by identifier
							// reset the default state
						elm.style.position = elems[i].position || "relative";
						elm.style.top = elems[i].top;
						elm.style.left = elems[i].left;
						elm.width = elems[i].width2;
						elm.height = elems[i].height2;
					}
			}
			else if( typeof elm == "number" && elm < elems.length ) {	// if the param elm is an number
					// reset the default state on the element by identifier elm
				elems[elm].style.position = elems[elm].position || "relative";
				elems[elm].style.top = elems[elm].top;
				elems[elm].style.left = elems[elm].left;
				elems[elm].width = elems[elm].width2;
				elems[elm].height = elems[elm].height2;
			}
		};
	}
		// make the object global
	window.makeCanvas = new canvasApplet();
})(window);