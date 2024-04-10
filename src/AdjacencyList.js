class AdjacencyList {
    /**
     * Initializes an adjacency list with the given number of vertices and 0 edges.
     * @param {number} numOfVertices Maximum number of vertices in the graph
     * @param {boolean} isDirected Whether the graph is directed. Default is false
     */
    constructor(isDirected=false, isWeighted=false) {
        this.adjList = new Map();
        this.isDirected = isDirected;
        this.isWeighted = isWeighted;
        this.vertices = 0;
        this.edges = 0;
    }

    /**
     * Adds a new vertex to the graph. If the vertex was already there,
     * it will replace the exisiting one.
     * @param {number} vertex Vertex to add
     */
    addVertex(vertex) {
        this.adjList.set(vertex, new Map());
        this.adjList.get(vertex).set("neighbours", new Array());
        this.adjList.get(vertex).set("weights", new Array());
        this.vertices++;
    }
  
    /**
     * Adds an edge between the given vertices.
     * @param {number} from Source vertex
     * @param {number} to Destination vertex
     */
    addEdge(from, to, weight = 1) {
        if (!this.adjList.has(from)) {
            this.addVertex(from);
        }
        if (!this.adjList.has(to)) {
            this.addVertex(to);
        }

        this.adjList.get(from).get("neighbours").push(to);
        this.adjList.get(from).get("weights").push(weight);
        if (!this.isDirected) {
            this.adjList.get(to).get("neighbours").push(from);
            this.adjList.get(to).get("weights").push(weight);
        }
        this.edges++;
    }
  
    /**
     * Removes edge between the given vertices if it exists. Throws error if
     * given vertices are not in the graph.
     * @param {number} from Source vertex
     * @param {number} to Destination vertex
     */
    removeEdge(from, to) {
        this._validateVertex(from);
        this._validateVertex(to);

        let idx = this.adjList.get(from).get("neighbours").indexOf(to);
        this.adjList.get(from).get("neighbours").splice(idx, 1);
        this.adjList.get(from).get("weights").splice(idx, 1);

        if (!this.isDirected) {
            this.adjList.get(to).get("neighbours").splice(idx, 1);
            this.adjList.get(to).get("weights").splice(idx, 1);
        }
        this.edges--;
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

        return this.adjList.get(from).get("neighbours").includes(to);
    }
  
    /**
     * Returns the neighbours of the given vertex.
     * 
     * @param {number} vertex Vertex
     * @returns Array of neighbours of the given vertex
     */
    neighbours(vertex) {
        this._validateVertex(vertex);

        return this.adjList.get(vertex).get("neighbours");
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
            let idx = this.adjList.get(from).get("neighbours").indexOf(to);
            return this.adjList.get(from).get("weights")[idx];
        } else {
            throw new Error(`There is no edge between ${from} and ${to}!`);
        }
    }

    /**
     * Checks whether a given vertex is valid or not in the graph.
     * @param {number} vertex Vertex to validate
     * @throws Error if the vertex is not valid
     */
    _validateVertex(vertex) {
        if (!this.adjList.has(vertex)) {
            throw new RangeError(`Invalid vertex ${vertex}!`);
        }
    }
  
    printList() {
        for (let [k, v] of this.adjList) {
            console.log(`Vertex ${k}:`);
            
            let count = v.get("neighbours").length;
            for (let i = 0; i < count; i++) {
                console.log(`Edge: (${v.get("neighbours")[i]}, ${v.get("weights")[i]})`);
            }
        }
    }
  }