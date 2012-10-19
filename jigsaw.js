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
			var contentId = this.id;
			jQuery(this)
				.empty()
				.append( jQuery('<button>Show</button>').click(jigsaw.overlayShow)) 
				.append( 
					jQuery('<div class="jigsaw-overlay"></div>')
						.hide()
						.append( jQuery('<button>Close</button>').click(jigsaw.overlayHide) )
						.append( '<div id="' + contentId + '-content" ></div>' ));
		});
	},/*}}}*/
	overlayShow:function() {
		var o = jQuery(this);
		// get the content
		var contentId = o.parent()[0].id;
		o.hide().siblings('.jigsaw-overlay').fadeIn( function(){ jigsaw.overlayContentLoad(contentId);} );
	},
	overlayHide:function() {
		jQuery(this).closest('.jigsaw-overlay').fadeOut()
			.siblings('button').show();
	},
	overlayContentLoad:function(contentId) {
		console.log("contentId:", contentId, jQuery('#'+contentId+'-content'), window[contentId]);
		jQuery('#'+contentId+'-content').html( window[ contentId ]);
	}

};

jQuery(jigsaw.init);
