var Painter    = require('./lib/painter'),
    painter    = new Painter(),
    Blackboard = require('./lib/blackboard');
var testcases  = [{
    width        : 7,
    height       : 8,
    blackPoints  : [[1, 0], [0, 1], [4, 0], [4, 1], [5, 1], [6, 1], [5, 4]],
    startingPoint: [3, 4]
}, {
    width        : 7,
    height       : 8,
    blackPoints  : [[1, 0], [0, 1], [4, 0], [4, 1], [5, 1], [6, 1], [5, 4], [5, 5], [4, 5], [3, 5], [3, 6], [3, 7]],
    startingPoint: [3, 4]
}, {
    width        : 7,
    height       : 8,
    blackPoints  : [[1, 0], [0, 1], [4, 0], [4, 1], [5, 1], [6, 1], [5, 4], [5, 5], [4, 5], [3, 5], [3, 6], [3, 7], [6, 3]],
    startingPoint: [3, 4]
}, {
    width        : 7,
    height       : 8,
    blackPoints  : [[1, 0], [0, 1], [4, 0], [4, 1], [5, 1], [6, 1], [5, 4], [5, 5], [4, 5], [3, 5], [3, 6], [3, 7], [6, 4]],
    startingPoint: [3, 4]
}, {
    width        : 7,
    height       : 8,
    blackPoints  : [[1, 0], [0, 1], [4, 0], [4, 1], [5, 1], [6, 1], [5, 4], [5, 5], [4, 5], [3, 5], [3, 6], [3, 7], [6, 5]],
    startingPoint: [3, 4]
}];

for (var i = 0; i < testcases.length; i++) {
    var testCase   = testcases[i],
        blackBoard = new Blackboard(testCase.width, testCase.height, testCase.blackPoints);

    console.log('Initial state of blackboard: ');
    blackBoard.draw();
    painter.setBoard(blackBoard);
    var paintedBoard = painter.paint(testCase.startingPoint[0], testCase.startingPoint[1]);
    console.log('Blackboard painted started at coordinate [' + [testCase.startingPoint[0], testCase.startingPoint[1]].join(',') + ']:');
    paintedBoard.draw(); 
}