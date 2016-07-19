;(function () {

    /**
     * Checks if `value` is a global object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {null|Object} Returns `value` if it's a global object, else `null`.
     */
    function checkGlobal(value) {
        return (value && value.Object === Object) ? value : null;
    }

    /** Detect free variable `exports`. */
    var freeExports = typeof exports == 'object' && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && typeof module == 'object' && module;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = checkGlobal(typeof global == 'object' && global);

    /** Detect free variable `self`. */
    var freeSelf = checkGlobal(typeof self == 'object' && self);

    /** Detect `this` as the global object. */
    var thisGlobal = checkGlobal(typeof this == 'object' && this);

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();

    class Painter {
        board;
        setBoard(board) {
            this.board = board;
        }

        constructor() {

        }

        paint(x, y) {
            if (x < 0 || x >= this.board.width
                || y < 0 || y >= this.board.height
                || this.board.isOccupied(x, y)) {
                return this.board;
            }

            this.board.paint(x, y);

            this.paint(x - 1, y);
            this.paint(x + 1, y);
            this.paint(x, y - 1);
            this.paint(x, y + 1);

            return this.board;
        }
    }

    // Expose library on the free variable `window` or `self` when available so it's
    // globally accessible, even when bundled with Browserify, Webpack, etc. This
    // also prevents errors in cases where library is loaded by a script tag in the
    // presence of an AMD loader. See http://requirejs.org/docs/errors.html#mismatch
    // for more details. Use `_.noConflict` to remove library from the global object.
    (freeSelf || {}).Painter = Painter;

    // Some AMD build optimizers like r.js check for condition patterns like the following:
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        // Define as an anonymous module so, through path mapping, it can be
        // referenced as the "underscore" module.
        define(function () {
            return Painter;
        });
    }
    // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
    else if (freeModule) {
        // Export for Node.js.
        (freeModule.exports = Painter).Painter = Painter;
        // Export for CommonJS support.
        freeExports.Painter = Painter;
    }
    else {
        // Export to the global object.
        root.Painter = Painter;
    }

}.call(this));