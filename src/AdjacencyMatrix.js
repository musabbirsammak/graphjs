class AdjacencyMatrix {
    /**
     * Initializes an adjacency matrix with the given number of vertices and 0 edges.
     * @param {number} numOfVertices Maximum number of vertices in the graph
     * @param {boolean} isDirected Whether the graph is directed. Default is false
     */
    constructor(numOfVertices, isDirected=false) {
        this.matrix = Array(numOfVertices).fill(0).map(() => Array(numOfVertices).fill(0));
        this.isDirected = isDirected;
        this.vertices = numOfVertices;
        this.edges = 0;
    }

    /**
     * Adds an edge between the given vertices.
     * @param {number} from Source vertex
     * @param {number} to Destination vertex
     */
    addEdge(from, to) {
        this._validateVertex(from);
        this._validateVertex(to);

        this.matrix[from][to] = 1;
        if (!this.isDirected) {
            this.matrix[to][from] = 1;
        }

        this.edges++;
    }

    /**
     * Removes edge between the given vertices if it exists.
     * @param {number} from Source vertex
     * @param {number} to Destination vertex
     */
    removeEdge(from, to) {
        this._validateVertex(from);
        this._validateVertex(to);

        if (this.matrix[from][to] !== 0) {
            this.matrix[from][to] = 0;
            if (!this.isDirected) {
                this.matrix[to][from] = 0;
            }
            this.edges--;
        }
    }

    /**
     * Returns whether there is any edge between the given vertices.
     * @param {number} from Source vertex
     * @param {number} to Destination vertex
     * @returns {boolean} true if there is an edge between the vertices, false otherwise
     */
    hasEdge(from, to) {
        return this.matrix[from][to];
    }

    /**
     * Checks whether a given vertex is valid or not in the graph.
     * @param {number} vertex Vertex to validate
     * @throws Error if the vertex is not valid
     */
    _validateVertex(vertex) {
        if (vertex < 0 || vertex >= this.vertices) {
            throw new RangeError(`Invalid vertex ${vertex}. Vertex number should be between 0 and ${this.vertices} exclusive.`);
        }
    }

    /**
     * Prints the adjacency matrix.
     */
    printMatrix() {
        console.table(this.matrix);
    }
}