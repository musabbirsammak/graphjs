const AdjacencyMatrix = require('../src/AdjacencyMatrix');

let graph = new AdjacencyMatrix(10);

test('Checks AdjacencyMatrix constructor', () => {
    let matrix = Array(10).fill(0).map(() => Array(10).fill(Number.MIN_VALUE));
    expect(graph.matrix).toEqual(matrix);
    expect(graph.vertices).toBe(10);
    expect(graph.edges).toBe(0);
    expect(graph.isWeighted).toBeFalsy();
    expect(graph.isDirected).toBeFalsy();
});

test('Checks AdjacencyMatrix addEdge function', () => {
    expect(() => {
        graph.addEdge(-1, 5)
    }).toThrow();

    expect(() => {
        graph.addEdge(0, 10)
    }).toThrow();

    graph.addEdge(0, 3);
    graph.addEdge(0, 1);
    graph.addEdge(0, 4);

    graph.addEdge(1, 2);
    graph.addEdge(1, 6);
    graph.addEdge(1, 7);

    graph.addEdge(5, 6);
    graph.addEdge(5, 3);
    graph.addEdge(5, 1);

    expect(graph.edges).toBe(9);
    expect(graph.hasEdge(0, 3)).toBeTruthy();
    expect(graph.hasEdge(0, 2)).toBeFalsy();
});

test('Checks AdjacencyMatrix removeEdge function', () => {
    graph.removeEdge(0, 3);
    expect(graph.edges).toBe(8);
    expect(graph.hasEdge(0, 3)).toBeFalsy();
});

test('Checks AdjacencyMatrix hasEdge function', () => {
    expect(graph.hasEdge(1, 5)).toBeTruthy();
    expect(graph.hasEdge(6, 1)).toBeTruthy();
    expect(graph.hasEdge(9, 3)).toBeFalsy();
    expect(graph.hasEdge(6, 3)).toBeFalsy();
});

test('Checks AdjacencyMatrix neighbours function', () => {
    let neighboursOfZero = [1, 4];
    expect(graph.neighbours(0)).toEqual(neighboursOfZero);
});

test('Checks AdjacencyMatrix getWeight function', () => {
    expect(graph.getWeight(1, 5)).toBe(1);
});
