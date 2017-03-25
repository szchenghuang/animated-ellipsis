(function() {
    "use strict";

    function AE( config ) {
        this.className  = config && config.className  || 'animated-ellipsis';
        this.style      = config && config.style      || undefined;
        this.spacing    = config && config.spacing    || '0.1rem';
        this.fontSize   = config && config.fontSize   || '2rem';
        this.marginLeft = config && config.marginLeft || '0.1rem';
        this.steps      = 3; 
        this.duration   = 2;
        this.perDelay   = 0.2;

        this.insertStyleNode();
    }

    AE.prototype.insertStyleNode = function() {
        const style = document.createElement( 'style' );
        style.type = 'text/css';
        style.innerHTML = ' \
            @-webkit-keyframes animated-ellipsis { \
                0%   { opacity: 0; } \
                50%  { opacity: 0; } \
                100% { opacity: 1; } \
            } \
            @keyframes animated-ellipsis { \
                0%   { opacity: 0; } \
                50%  { opacity: 0; } \
                100% { opacity: 1; } \
            }';
        this.style = document.getElementsByTagName( 'head' )[ 0 ].appendChild( style );
    }

    var AnimatedEllipsis = new AE();

    function animate( elem ) {
        var wrapper = elem;
        const steps = AnimatedEllipsis.steps;
        const perDelay = AnimatedEllipsis.perDelay;
        const marginLeft = wrapper.dataset.marginLeft || AnimatedEllipsis.marginLeft;
        const spacing = wrapper.dataset.spacing || AnimatedEllipsis.spacing;

        wrapper.style.marginLeft = marginLeft;
        wrapper.style.fontSize = AnimatedEllipsis.fontSize;

        for ( var iStep = 0; iStep < steps; ++iStep ) {
            var elemSpan = document.createElement( 'span' );
            const delay = iStep * perDelay;

            elemSpan.className = '.$step' + iStep;
            elemSpan.innerHTML = '.';
            var cssText = '\
                opacity: 0; \
                -webkit-animation: animated-ellipsis ' + AnimatedEllipsis.duration + 's infinite; \
                animation: animated-ellipsis ' + AnimatedEllipsis.duration + 's infinite; \
                -webkit-animation-delay: ' + delay+ 's; \
                animation-delay: ' + delay + 's; \
            ';

            if ( iStep !== 0 ) {
                cssText += ( 'margin-left: ' + spacing + ';' );
            }

            elemSpan.style.cssText = cssText;
            elemSpan = wrapper.appendChild( elemSpan );
        }
    }

    window.HTMLElement.prototype.animateEllipsis = function() {
        animate( this );
    };

    window.NodeList.prototype.animateEllipsis = function() {
        for ( var iNode = 0; iNode < this.length; ++iNode ) {
            var elem = this[ iNode ];
            animate( elem );
        }
    };

    window.HTMLElement.prototype.stopAnimatingEllipsis = function() {
        var wrapper = this;
        while ( wrapper.hasChildNodes() ) {
            wrapper.removeChild( wrapper.lastChild );
        }

        delete wrapper.style.marginLeft;
    };

    module.exports = AnimatedEllipsis;

}());
