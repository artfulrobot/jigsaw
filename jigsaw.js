/**
  * @file Jigsaw javascript behaviours
  *
  *
  * If a behaviour is specified on a Jigsaw field, the output is wrapped in a div with the behaviour as a class.  *
  *
  *
  * we definitely receive this:
  *
  * div.jigsaw.overlay
  *   (content)
  *
  * or we can receive this
  *
  * div.jigsaw.overlay
  *   .overlay-placeholder
  *      (placeholder content)
  *      .show-overlay - optional element
  *   .overlay-full
  *      (full content)
  *
  * @todo I'd like it to offer a zoom function where the placeholder, show and
  * full are all the same element.
  *
  */

var jigsaw = {
	init: function() {/*{{{*/
		jQuery('.jigsaw.overlay').each( function() {
            var container = jQuery(this);

            // does this contain .overlay-placeholder and .overlay-full objects?
            var placeholder = container.children('.overlay-placeholder');
            var full = container.children('.overlay-full');
            if (full.length == 0) {
                // No. Assume that the content of this container is the .overlay-full
                full = container.children().wrapAll('<div class="overlay-full">');
                // Nb. it is invalid to provide placeholder by not full.
                container.prepend('<div class="overlay-placeholder" />');
            }

            // does the .overlay-placeholder contain a .overlay-show element
            if (placeholder.find('.overlay-show').length == 0 ) {
                placeholder.append('<button class="overlay-show" >Show</button>');
            }
            // Make the show element clickable.
            placeholder.find('.overlay-show').click(jigsaw.overlayShow);

            // Create a close button
            full.prepend(
                jQuery('<button class="overlay-hide" >Close</button>')
                    .click(jigsaw.overlayHide)
                    .css({ position:'absolute', top:"2rem", right:"2rem" })
                    );

            // Hide the full version
            full.css( jigsaw.offscreenCSS );
		});
	},/*}}}*/
	getContainer:function(el) {
        el = jQuery(el);
        if (el.hasClass('jigsaw overlay')) {
            return el;
        } else {
            return el.closest('.jigsaw.overlay');
        }
    },
	overlayHide:function(e) {
        // move full content off-screen and out of flow
        jigsaw.getContainer(e.target)
            .children('.overlay-full')
                .animate( { opacity:0 }, function() {
                    jQuery(this).css( jigsaw.offscreenCSS )
                    })
            .end();
	},
	overlayShow:function(e) {
        // full content on-screen
        jigsaw.getContainer(e.target)
            .children('.overlay-full')
                .css( { position:'fixed',
                        left:"0", width:"", right:0, top:0,
                        height:"", bottom:0,
                        "background-color":"white",
                        "z-index":100,
                        padding:"2rem" } )
                .animate( { opacity: 1} )
            .end();
	},
    offscreenCSS:  { position:'absolute', left:"-10000px", width:"1px", height:"1px", overflow:"hidden", opacity:0}
};

jQuery(jigsaw.init);
