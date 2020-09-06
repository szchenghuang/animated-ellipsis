(function() {
  "use strict";

  function AE() {
    this.steps      = 3; 
    this.duration   = 2;
    this.perDelay   = 0.2;

    this.insertStyleNode();
  }

  AE.prototype.insertStyleNode = function() {
    if ( !this.styleNode ) {
      const styleNode = document.createElement( 'style' );
      styleNode.type = 'text/css';
      styleNode.innerHTML = ' \
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
      const headNode = document.getElementsByTagName( 'head' )[ 0 ];
      this.styleNode = headNode.appendChild( styleNode );
    }
  }

  var AnimatedEllipsis = new AE();

  function animate( node ) {
    const wrapper = node;
    const steps = AnimatedEllipsis.steps;
    const perDelay = AnimatedEllipsis.perDelay;
    const fontSize = wrapper.dataset.fontSize;
    const marginLeft = wrapper.dataset.marginLeft;
    const spacing = wrapper.dataset.spacing;

    wrapper.style.fontSize = fontSize;
    wrapper.style.marginLeft = marginLeft;

    for ( var iStep = 0; iStep < steps; ++iStep ) {
      var elemSpan = document.createElement( 'span' );
      const delay = iStep * perDelay;

      elemSpan.className = '.$step' + iStep;
      elemSpan.innerHTML = '.';
      const cssText =
        ( 0 === iStep ? '' : ( 'margin-left: ' + spacing + ';' ) ) +
        'opacity: 0;' +
        '-webkit-animation: animated-ellipsis ' + AnimatedEllipsis.duration + 's infinite;' +
        'animation: animated-ellipsis ' + AnimatedEllipsis.duration + 's infinite;' +
        '-webkit-animation-delay: ' + delay+ 's;' +
        'animation-delay: ' + delay + 's;';

      elemSpan.style.cssText = cssText;
      elemSpan = wrapper.appendChild( elemSpan );
    }
  }

  window.HTMLElement.prototype.animateEllipsis = function() {
    animate( this );
  };

  window.NodeList.prototype.animateEllipsis = function() {
    for ( var iNode = 0; iNode < this.length; ++iNode ) {
      animate( this[ iNode ] );
    }
  };

  window.HTMLElement.prototype.stopAnimatingEllipsis = function() {
    const wrapper = this;
    while ( wrapper.hasChildNodes() ) {
      wrapper.removeChild( wrapper.lastChild );
    }

    delete wrapper.style.marginLeft;
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = AnimatedEllipsis;
  } else {
    window.AnimatedEllipsis = AnimatedEllipsis;
  }

}());
