/*!
 * VisualEditor MediaWiki Initialization MobileFrontendArticleTarget class.
 *
 * @copyright 2011-2015 VisualEditor Team and others; see AUTHORS.txt
 * @license The MIT License (MIT); see LICENSE.txt
 */

/* global ve */

// jscs:disable

/**
 * MediaWiki mobile frontend article target.
 *
 * @class
 * @extends ve.init.mw.MobileArticleTarget
 *
 * @constructor
 * @param {VisualEditorOverlay} overlay Mobile frontend overlay
 * @param {Object} [config] Configuration options
 */
ve.init.mw.MobileFrontendArticleTarget = function VeInitMwMobileFrontendArticleTarget( overlay, config ) {
	// Parent constructor
	ve.init.mw.MobileFrontendArticleTarget.super.call( this, config );

	this.overlay = overlay;
	this.$overlaySurface = overlay.$el.find( '.surface' );

	// Initialization
	this.$element.addClass( 've-init-mw-mobileFrontendArticleTarget' );
};

/* Inheritance */

OO.inheritClass( ve.init.mw.MobileFrontendArticleTarget, ve.init.mw.MobileArticleTarget );

/* Static Properties */

/* Methods */

/*
 * FIXME: @inheritdoc once this file is in the right repo
 */
ve.init.mw.MobileFrontendArticleTarget.prototype.createSurface = function ( dmDoc, config ) {
	if ( this.overlay.isNewPage ) {
		config = ve.extendObject( {
			placeholder: mw.msg( 'mobile-frontend-editor-placeholder-new-page', mw.user )
		}, config );
	}

	// Parent method
	return ve.init.mw.MobileFrontendArticleTarget.super.prototype.createSurface.call( this, dmDoc, config );
};

/*
 * FIXME: @inheritdoc once this file is in the right repo
 */
ve.init.mw.MobileFrontendArticleTarget.prototype.onSurfaceReady = function () {
	// Parent method
	ve.init.mw.MobileFrontendArticleTarget.super.prototype.onSurfaceReady.apply( this, arguments );

	var surface = this.getSurface();

	this.overlay.clearSpinner();

	this.$overlaySurface
		.append( surface.$element.addClass( 'content' ) )
		.show();

	// we have to do it here because contenteditable elements still do not
	// exist when postRender is executed
	// FIXME: Don't call a private method that is outside the class.
	this.overlay._fixIosHeader( '[contenteditable]' );
};

/*
 * FIXME: @inheritdoc once this file is in the right repo
 */
ve.init.mw.MobileFrontendArticleTarget.prototype.loadFail = function ( errorText ) {
	// Parent method
	ve.init.mw.MobileFrontendArticleTarget.super.prototype.loadFail.apply( this, arguments );

	this.overlay.reportError( errorText, 'visualeditor-load-error' );
	this.overlay.hide();
};

/*
 * FIXME: @inheritdoc once this file is in the right repo
 */
ve.init.mw.MobileFrontendArticleTarget.prototype.editSource = function () {
	// If changes have been made tell the user they have to save first
	if ( !this.getSurface().getModel().hasBeenModified() ) {
		this.overlay.switchToSourceEditor();
	} else if ( window.confirm( mw.msg( 'mobile-frontend-editor-switch-confirm' ) ) ) {
		this.showSaveDialog();
	}
};

/*
 * FIXME: @inheritdoc once this file is in the right repo
 */
ve.init.mw.MobileFrontendArticleTarget.prototype.saveComplete = function () {
	// Parent method
	ve.init.mw.MobileFrontendArticleTarget.super.prototype.saveComplete.apply( this, arguments );

	this.overlay.onSaveComplete();
};

/*
 * FIXME: @inheritdoc once this file is in the right repo
 */
ve.init.mw.MobileFrontendArticleTarget.prototype.close = function () {
	// Parent method
	ve.init.mw.MobileFrontendArticleTarget.super.prototype.close.apply( this, arguments );

	window.history.back();
};