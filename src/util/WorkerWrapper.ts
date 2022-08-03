

// https://stackoverflow.com/a/37154736/3142238
function sanitizeThis(self: any){
  // @ts-ignore
  // console.assert(this === self, "this is not self", this, self);
  // 'this' is undefined

  "use strict";

  var current = self;
  var keepProperties = [
      // Required
      'Object', 'Function', 'Infinity', 'NaN',
      'undefined', 'caches', 'TEMPORARY', 'PERSISTENT',
      "addEventListener", "onmessage",
      // Optional, but trivial to get back
      'Array', 'Boolean', 'Number', 'String', 'Symbol',
      // Optional
      'Map', 'Math', 'Set',
      "console",
  ];

  do{
      Object.getOwnPropertyNames(
        current
      ).forEach(function(name){
        if(keepProperties.indexOf(name) === -1){
          delete current[name];
        }
      });

      current = Object.getPrototypeOf(current);
  } while(current !== Object.prototype);
}


declare global {
  function _postMessage(message?: any, transfer?: any): void;
}
/*
https://hacks.mozilla.org/2015/07/how-fast-are-web-workers/
https://developers.google.com/protocol-buffers/docs/overview
*/
export default class WorkerWrapper<A, R>
{
  readonly worker: Worker;

  private stored_resolves = new Map<string, (v: R) => void> ();

  constructor(func: (arg: A) => R){
    let blob = new Blob([
      `"use strict";`,
      "const _postMessage = postMessage;",
      `(${sanitizeThis.toString()})(this);`,
      `const func = ${func.toString()};`,
      "(", function(){
        // self.onmessage = (e) => {
        addEventListener("message", (e) => {
          
          _postMessage({
            id: e.data.id,
            data: func(e.data.data)
          });
        })
      }.toString(), ")()"
    ], {
      type: "application/javascript"
    });
    let url = URL.createObjectURL(blob);
    this.worker = new Worker(url);
    URL.revokeObjectURL(url);

    this.worker.onmessage = (e) => {
      let { id, data } = e.data;
      let resolve = this.stored_resolves.get(id);
      this.stored_resolves.delete(id);
      if(resolve){
        resolve(data);
      } else{
        console.error("invalid id in message returned by worker")
      }
    }
  }

  public terminate(){
    this.worker.terminate();
  }

  postMessage(arg: A): Promise<R> {
    let uuid = crypto.randomUUID();
    return new Promise((res, rej) => {
      this.stored_resolves.set(uuid, res);
      this.worker.postMessage({
        id: uuid,
        data: arg
      });
    })
  }
}

/* // usage

let worker = new WorkerWrapper(
  (d) => { return d + d; }
);
worker.postMessage("HEY").then((d) => {
  console.log(d); // HEYHEY
})

*/