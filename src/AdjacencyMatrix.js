class AdjacencyMatrix {
    /**
     * Initializes an adjacency matrix with the given number of vertices and 0 edges.
     * 
     * @param {number} numOfVertices Maximum number of vertices in the graph
     * @param {boolean} isDirected Whether the graph is directed. Default is false
     */
    constructor(numOfVertices, isDirected = false, isWeighted = false) {
        this.matrix = Array(numOfVertices).fill(0).map(() => Array(numOfVertices).fill(Number.MIN_VALUE));
        this.isDirected = isDirected;
        this.isWeighted = isWeighted;
        this.vertices = numOfVertices;
        this.edges = 0;
    }

    /**
     * Adds an edge between the given vertices.
     * 
     * @param {number} from Source vertex
     * @param {number} to Destination vertex
     */
    addEdge(from, to, weight = 1) {
        this._validateVertex(from);
        this._validateVertex(to);

        this.matrix[from][to] = weight;
        if (!this.isDirected) {
            this.matrix[to][from] = weight;
        }

        this.edges++;
    }

    /**
     * Removes edge between the given vertices if it exists.
     * 
     * @param {number} from Source vertex
     * @param {number} to Destination vertex
     */
    removeEdge(from, to) {
        this._validateVertex(from);
        this._validateVertex(to);

        if (this.matrix[from][to] !== Number.MIN_VALUE) {
            this.matrix[from][to] = Number.MIN_VALUE;
            if (!this.isDirected) {
                this.matrix[to][from] = Number.MIN_VALUE;
            }
            this.edges--;
        }
    }

    /**
     * Returns whether there is any edge between the given vertices.
     * 
     * @param {number} from Source vertex
     * @param {number} to Destination vertex
     * @returns {boolean} true if there is an edge between the vertices, false otherwise
     */
    hasEdge(from, to) {
        this._validateVertex(from);
        this._validateVertex(to);

        return this.matrix[from][to] !== Number.MIN_VALUE;
    }

    /**
     * Returns weight of the edge between the given vertices. If there is no edge or
     * the vertices are invalid, error is thrown.
     * 
     * @param {number} from Source vertex
     * @param {number} to Destination vertex
     * @returns {numb er} weight of the edge between the give vertices
     */
    getWeight(from, to) {
        if (this.hasEdge(from, to)) {
            return this.matrix[from][to];
        } else {
            throw new Error(`There is no edge between ${from} and ${to}!`);
        }
    }

    /**
     * Returns the neighbours of the given vertex.
     * 
     * @param {number} vertex Vertex
     * @returns Array of neighbours of the given vertex
     */
    neighbours(vertex) {
        this._validateVertex(vertex);

        let adjacents = [];
        for (let i = 0; i < this.vertices; i++) {
            if (this.hasEdge(vertex, i)) {
                adjacents.push(i);
            }
        }
        return adjacents;
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

module.exports = AdjacencyMatrix;