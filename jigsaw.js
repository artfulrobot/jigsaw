/**
  * @file Jigsaw javascript behaviours
  *
  *
  * If a behaviour is specified on a Jigsaw field, the output is wrapped in a div with the behaviour as a class.  *
  */

var jigsaw = {
	xinit: function() {/*{{{*/
		jQuery('.jigsaw.overlay').each( function() {

			// remove the contents; it's now stored in window.jigsawPiece<N>
			var content = jQuery(this).empty().html('<div class="jigsaw-overlay-wrapper"><button>Show</button>'
				+'<div class="jigsaw-overlay"><button>Close</button><div class="jigsaw-content"></div></div></div>');
			// create container
			content.before(container);
			// move content
			container.find(".jigsaw-overlay").hide().append(content);
			container.children("button").click(jigsaw.overlayShow);
			container.children(".jigsaw-overlay").children('button').click(jigsaw.overlayHide);
		});
	},/*}}}*/
	init: function() {/*{{{*/
		jQuery('.jigsaw.overlay').each( function() {

			// move it off-screen and out of flow
			var contentId = this.id;
			jigsaw.overlayContentHide(contentId);

			jQuery(this).before( 
				jQuery('<div id="' +contentId+ '-extra" ></div>')
					.append( jQuery('<button>Show</button>').click(
							function() { jigsaw.overlayShow(contentId);} ))
					.append( 
						jQuery('<div class="jigsaw-overlay"></div>')
							.hide()
							.append( jQuery('<button>Close</button>').click(
									function() { jigsaw.overlayHide(contentId);}) )));
		});
	},/*}}}*/
	overlayShow:function(contentId) {
		jQuery('#'+contentId+'-extra').children('button').hide()
			.siblings('.jigsaw-overlay').fadeIn( function(){ jigsaw.overlayContentLoad(contentId);} );
	},
	overlayHide:function(contentId) {
		jigsaw.overlayContentHide(contentId);
		jQuery('#'+contentId+'-extra').children('.jigsaw-overlay').fadeOut()
			.siblings('button').show();
	},
	overlayContentHide:function(contentId) {
		jQuery('#'+contentId).css( { position:'absolute', left:"-10000px" } );
	},
	overlayContentLoad:function(contentId) {
		jQuery('#'+contentId).css( { position:'fixed', left:'24px',top:'46px',zIndex:21} );
	}

};

jQuery(jigsaw.init);
