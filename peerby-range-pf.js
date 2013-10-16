/**
 * Peerby's input range polyfill
 *
 * @author Jimmy James <jimmy@peerby.com>
 * @version 1.0
 */
(function (__global) {

    "use strict";

    var PeerbyRange = function () {},
        PeerbyRangeElement = function () {};

    /**
     * Peerby range wrapper
     * Checks if we should polyfill range elements and creates the new elements
     */
    PeerbyRange.prototype = {

        /**
         * Forces use of polyfill instead of HTML5 input range
         * For dev purposes
         */
        forcePoly: true,

        /**
         * Container for elements
         */
        elements: [],

        /**
         * Initialize range polyfill
         */
        init: function () {
           if(!this.browserRangeCompatible() || this.forcePoly) {
               this.findRangeElements();
           }
        },

        /**
         * Checks if browser is capable of providing input range element
         *
         * @returns {boolean}
         */
        browserRangeCompatible: function () {
            var i;

            i = document.createElement('input');
            i.setAttribute('type', 'range');

            return (i.type === 'range');
        },

        /**
         * Find range elements
         */
        findRangeElements: function () {
            var elements, i, rangeElement;

            elements = document.getElementsByTagName('input');

            for(i = 0; i < elements.length; i++) {
                if(elements[i].getAttribute('type') === 'range') {
                    rangeElement = new PeerbyRangeElement();
                    rangeElement.init(elements[i]);

                    this.elements.push(rangeElement);
                }
            }
        }
    };

    /**
     * Element for any range polyfill
     */
    PeerbyRangeElement.prototype = {

        /**
         * Element wrapper
         */
        element: null,

        /**
         * Wrapper element
         */
        wrapper: null,

        /**
         * Bar / line the dot moves along
         */
        bar: null,

        /**
         * The dot the user will slide
         */
        dot: null,

        /**
         * Bool to determine if we're dragging the dot
         */
        isDragging: false,

        /**
         * Minimal value of the slider
         */
        min: 0,

        /**
         * Maximal value of the slider
         */
        max: 0,

        /**
         * Current value of the slider
         */
        value: 0,

        /**
         * Constructor
         *
         * @param el
         */
        init: function (el) {
            this.element = el;

            this.getMinMaxValue();
        },

        /**
         * Get the minimal, maximal and current value of the slider
         */
        getMinMaxValue: function () {
            this.min = this.element.getAttribute('min');
            this.max = this.element.getAttribute('max');
            this.value = this.element.getAttribute('value');

            this.hideElement();
            this.createWrapper();
        },

        /**
         * Hide original element into hidden input
         */
        hideElement: function () {
            this.element.setAttribute('type', 'hidden');
        },

        /**
         * Create div wrapper for new slider
         */
        createWrapper: function () {
            this.wrapper = document.createElement('div');
            this.wrapper.className = 'peerby-range-wrapper';

            this.element.parentNode.insertBefore(this.wrapper, this.element.nextSibling);

            this.createBar();
            this.createDot();
        },

        /**
         * Create the bar / line, the dot will move along
         */
        createBar: function () {
            this.bar = document.createElement('div');
            this.bar.className = 'peerby-range-bar';

            this.wrapper.appendChild(this.bar);
        },

        /**
         * Create the dot that will slide along the bar
         */
        createDot: function () {
            var self = this;

            this.dot = document.createElement('div');
            this.dot.className = 'peerby-range-dot';

            this.wrapper.appendChild(this.dot);

            $(this.dot).on('mousedown', function (e) {
                self.isDragging = true;

                return false;
            });

            $(document).on('mouseup', function (e) {
                self.isDragging = false;
                self.updateValue();

                return false;
            });

            this.dragDetect();
            this.setDotPosition();
        },

        /**
         * Update the value of the slider and hidden input element
         */
        updateValue: function () {
            var newValue = 0;

            newValue = Math.ceil(parseInt($(this.dot).css('left')) / ($(this.wrapper).width() / this.max));

            this.value = newValue;
            this.element.value = newValue;
            $(this.element).trigger('change');
        },

        /**
         * Set dot position based on current value
         */
        setDotPosition: function () {
            var leftOffset = ($(this.wrapper).width() / parseInt(this.max)) * parseInt(this.value);

            $(this.dot).css('left', this.getSafeNumber(leftOffset));
        },

        /**
         * Detect dragging
         */
        dragDetect: function () {
            var self = this,
                wrapperOffset;

            $(document).mousemove(function (e) {
                if(self.isDragging) {
                    wrapperOffset = $(self.wrapper).offset();
                    $(self.dot).css('left', self.getSafeNumber(e.pageX - wrapperOffset.left));

                    self.updateValue();
                }
            });
        },

        /**
         * Get number that isnt too small or too big
         *
         * @param number
         * @returns {number}
         */
        getSafeNumber: function (number) {
            return Math.min(Math.max(this.min, number), ($(this.wrapper).width() - $(this.dot).width()));
        }
    };

    /**
     * Create polyfill on DOM load
     */
    $(document).ready(function () {
        __global.peerbyRangePolyfill = new PeerbyRange();
        __global.peerbyRangePolyfill.init();
    });

}) (window);