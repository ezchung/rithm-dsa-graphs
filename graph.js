/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
    // this.visited = true
  }
}

/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    // for(let vertex of vertexArray){
    //   this.nodes.add(vertex)
    // }

    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    for (let adjacent of vertex.adjacent) {
      this.removeEdge(adjacent, vertex);
    }
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    //regular
    // let toVisitStack = [start]; //Current stack
    // let seen = new Set(toVisitStack); //Check if already seen
    // let output = [];  //add each value that was placed on stack

    // while(toVisitStack.length > 0){
    //   let current = toVisitStack.pop();
    //   output.push(current.value)
    //   for(let adjacent of current.adjacent){
    //     if(!seen.has(adjacent)){
    //       toVisitStack.push(adjacent);
    //       seen.add(adjacent);
    //     }
    //   }
    // }
    // return output;

    //recursive
    // return dfs(start, [], new Set());

    // function dfs(start, output, seen) {
    //   seen.add(start);
    //   output.push(start.value);
    //   for (const adjacent of start.adjacent) {
    //     if (!seen.has(adjacent)) {
    //       dfs(adjacent, output, seen);
    //     }
    //   }
    //   return output;
    // }

    const result = dfs(start, [], new Set());
    return result;

    // const result2 = dfs2(start, []);
    // console.log(result2);
    // return result2;

    function dfs(start, output, seen) {
      if (seen.has(start)) return output;
      seen.add(start);
      output.push(start.value);
      for (const adjacent of start.adjacent) {
        output = dfs(adjacent, output, seen);
      }
      return output;
    }

    // function dfs2(start, output) {
    //   if (start.visited === true) {
    //     start.visited = false;
    //     return output;
    //   }
    //   start.visited = true;
    //   output.push(start.value);
    //   for (const adj of start.adjacent) {
    //     output = dfs2(adj, output);
    //   }
    //   return output;
    // }

    // const result3 = [];
    // dfs3(start);
    // console.log({ result3 });
    // return result3;

    // function dfs3(start) {
    //   if (!start.visited) {
    //     start.visited = true;
    //     result3.push(start.value);
    //     for (const adj of start.adjacent) {
    //       dfs3(adj);
    //     }
    //     start.visited = false;
    //   }
    // }
  }

  /** traverse graph with BFS and returns array of Node values */
  breadthFirstSearch(start) {
    const result = [];
    const queue = [start];
    const seen = new Set();

    while (queue.length > 0) {
      const node = queue.shift();
      seen.add(node);
      result.push(node.value);
      for (const adjacent of node.adjacent) {
        if (!seen.has(adjacent)) {
          queue.push(adjacent);
        }
      }
    }

    /**
     *
     *
     */

    return result;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    // use min heap!!
    // logn
    const queue = [[start, 0]];
    const seen = new Set();
    while (queue.length > 0) {
      const [node, distance] = queue.shift();
      seen.add(node);
      if (node === end) return distance;
      for (const adjacent of node.adjacent) {
        if (!seen.has(adjacent)) {
          queue.push([adjacent, distance + 1]);
        }
      }
      // sort
      // nlogn
      queue.sort((a, b) => a[1] - b[1]);
    }
  }
}

module.exports = { Graph, Node };
