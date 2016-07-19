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

    class BlackBoard {
        static BLACKED = 'black';
        static PAINTED = 'painted';

        width;
        height;
        cols;
        board;
        constructor(width, height, blackPoints, opts) {
            if (width <=0 || height <= 0) {
                throw new Error('The Blackboard should not be empty')
            }

            if (blackPoints && !Array.isArray(blackPoints)) {
                throw new Error('Input value should be an array of Black Points')
            }

            opts = opts || {};
            this.width = width;
            this.height = height;
            this.board = new Array(width);
            for (var i = 0; i < height; i++) {
                this.board[i] = new Array(height);
            }

            this.cols = [];
            for (var j = 0; j < width; j++) {
                this.cols.push(opts.colWidth || 3);
            }
            this.initialize(blackPoints);
        }

        initialize(blackPoints) {
            if (!blackPoints || !blackPoints.length) {
                return;
            }

            for (var i = 0; i < blackPoints.length; i++) {
                var blackPoint = blackPoints[i];

                if (!blackPoint || blackPoint.length < 2) {
                    throw new Error('The provided black point is not valid');
                }

                if (blackPoint[0] >= this.width || blackPoint[1] >= this.height) {
                    throw new Error('The Black Point provided is out of range');
                }

                this.board[blackPoint[0]][blackPoint[1]] = BlackBoard.BLACKED;
            }
        }

        paint(x, y) {
            this.board[x][y] = BlackBoard.PAINTED;
            return this;
        }

        isOccupied(x, y) {
            return !!this.board[x][y];
        }

        draw() {
            var Table = require('cli-table');

            var table = new Table({
                colWidths: this.cols
            });

            for (var j = 0; j < this.height; j++) {
                var row = [];
                for (var i = 0; i < this.width; i++) {
                    if (this.board[i][j] == BlackBoard.BLACKED) {
                        row.push("b");
                    } else if (this.board[i][j] == BlackBoard.PAINTED) {
                        row.push("x");
                    } else {
                        row.push(" ");
                    }
                }

                table.push(row);
            }

            console.log(table.toString());
        }
    }

    // Expose library on the free variable `window` or `self` when available so it's
    // globally accessible, even when bundled with Browserify, Webpack, etc. This
    // also prevents errors in cases where library is loaded by a script tag in the
    // presence of an AMD loader. See http://requirejs.org/docs/errors.html#mismatch
    // for more details. Use `_.noConflict` to remove library from the global object.
    (freeSelf || {}).BlackBoard = BlackBoard;

    // Some AMD build optimizers like r.js check for condition patterns like the following:
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        // Define as an anonymous module so, through path mapping, it can be
        // referenced as the "underscore" module.
        define(function () {
            return BlackBoard;
        });
    }
    // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
    else if (freeModule) {
        // Export for Node.js.
        (freeModule.exports = BlackBoard).BlackBoard = BlackBoard;
        // Export for CommonJS support.
        freeExports.BlackBoard = BlackBoard;
    }
    else {
        // Export to the global object.
        root.BlackBoard = BlackBoard;
    }

}.call(this));