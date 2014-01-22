( function( M, $ ) {
	var OverlayNew = M.require( 'OverlayNew' ),
		Page = M.require( 'Page' ),
		EditorOverlayBase;

	EditorOverlayBase = OverlayNew.extend( {
		defaults: {
			continueMsg: mw.msg( 'mobile-frontend-editor-continue' ),
			saveMsg: mw.msg( 'mobile-frontend-editor-save' ),
			cancelMsg: mw.msg( 'mobile-frontend-editor-cancel' ),
			keepEditingMsg: mw.msg( 'mobile-frontend-editor-keep-editing' ),
			summaryMsg: mw.msg( 'mobile-frontend-editor-summary-placeholder' ),
			licenseMsg: mw.msg( 'mobile-frontend-editor-license' ),
			placeholder: mw.msg( 'mobile-frontend-editor-placeholder' ),
			waitMsg: mw.msg( 'mobile-frontend-editor-wait' ),
			captchaMsg: mw.msg( 'mobile-frontend-account-create-captcha-placeholder' ),
			captchaTryAgainMsg: mw.msg( 'mobile-frontend-editor-captcha-try-again' ),
			abusefilterReadMoreMsg: mw.msg( 'mobile-frontend-editor-abusefilter-read-more')
		},
		template: M.template.get( 'modules/editor/EditorOverlayBase' ),
		className: 'overlay editor-overlay',

		onSave: function() {
			var title = this.options.title;
			// FIXME: use generic method for following 3 lines
			M.pageApi.invalidatePage( title );
			new Page( { title: title, el: $( '#content_wrapper' ) } ).on( 'ready', M.reloadPage );
			M.router.navigate( '' );
		},
		initialize: function( options ) {
			if ( this.readOnly ) {
				options.readOnly = true;
				options.editingMsg = mw.msg( 'mobile-frontend-editor-viewing-source-page', options.title );
			} else {
				options.editingMsg = mw.msg( 'mobile-frontend-editor-editing-page', options.title );
			}
			options.previewingMsg = mw.msg( 'mobile-frontend-editor-previewing-page', options.title );
			this._super( options );
		},
		postRender: function( options ) {
			this._super( options );
			this._showHidden( '.initial-header' );
		},
		hide: function( force ) {
			var confirmMessage = mw.msg( 'mobile-frontend-editor-cancel-confirm' );
			if ( force || !this._hasChanged() || this.canHide || window.confirm( confirmMessage ) ) {
				return this._super();
			} else {
				return false;
			}
		},
		_showCaptcha: function( url ) {
			var self = this, $input = this.$( '.captcha-word' );

			if ( this.captchaShown ) {
				$input.val( '' );
				$input.attr( 'placeholder', this.options.captchaTryAgainMsg );
				setTimeout( function() {
					$input.attr( 'placeholder', self.options.captchaMsg );
				}, 2000 );
			}

			this.$( '.captcha-panel img' ).attr( 'src', url );
			this._showHidden( '.save-header, .captcha-panel' );

			this.captchaShown = true;
		},
		_showHidden: function( className ) {
			// can't use jQuery's hide() and show() beause show() sets display: block
			// and we want display: table for headers
			this.$( '.hideable' ).addClass( 'hidden' );
			this.$( className ).removeClass( 'hidden' );
		}
	} );

	M.define( 'modules/editor/EditorOverlayBase', EditorOverlayBase );

}( mw.mobileFrontend, jQuery ) );
