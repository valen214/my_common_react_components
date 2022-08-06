

// https://stackoverflow.com/a/37154736/3142238
function sanitizeThis(self: any){
  // @ts-ignore
  // console.assert(this === self, "this is not self", this, self);
  // 'this' is undefined

  "use strict";

  var current = self;
  var keepProperties = new Set([
      // Required
      'Object', 'Function', 'Infinity', 'NaN',
      'undefined', 'caches', 'TEMPORARY', 'PERSISTENT',
      "addEventListener", "onmessage",
      // Optional, but trivial to get back
      'Array', 'Boolean', 'Number', 'String', 'Symbol',
      // Optional
      'Map', 'Math', 'Set',
      "console",
  ]);

  do{
      for(
        let names = Object.getOwnPropertyNames(current), i = 0;
        i < names.length;
        ++i
      ){
        let name = names[i];
        if(!keepProperties.has(name)){
          delete current[name];
        }
      }

      current = Object.getPrototypeOf(current);
  } while(current !== Object.prototype);
}


declare global {
  function _postMessage(message?: any, transfer?: any): void;
  function _addEventListener(
    ev: "message",
    listener: (ev: MessageEvent<any>) => any
  ): void
}
/*
https://hacks.mozilla.org/2015/07/how-fast-are-web-workers/
https://developers.google.com/protocol-buffers/docs/overview
*/
export default class WorkerWrapper<A, R>
{
  private _worker: Worker;
  public get worker(){
    return this._worker;
  }
  
  private _input_src: string;
  public get input_src(){
    return this._input_src;
  }

  private _worker_src: string[];
  public get worker_src(){
    return this._worker_src;
  }

  private stored_resolves = new Map<number, (v: R) => void> ();

  constructor(
    func: ((arg: A) => R) | string,
  ){
    this._input_src = func.toString();
    this._worker_src = WorkerWrapper.createWorkerSrc<A, R>(func);

    this._worker = this.createWorker(this._input_src);
  }
  public static createWorkerSrc<A, R>(
    func: ((arg: A) => R) | string
  ){
    return [
      `"use strict";`,
      "const _postMessage = postMessage;",
      "const _addEventListener = addEventListener;",
      `(${sanitizeThis.toString()})(this);`,
      // double enclosure to avoid user injected troubles?
      "(function(){",
      	`const func = ${func.toString()};`,
        // self.onmessage = (e) => {
        "(",
          ((func: ((arg: A) => R) | string) => {
            _addEventListener("message", (e) => {
              _postMessage({
                id: e.data.id,
                // @ts-ignore
                data: func(e.data.data)
              });
            })
          }).toString(),
        ")(func);",
      "})()"
    ];
  }
  public createWorker(
    func: ((arg: A) => R) | string
  ){
    let worker_src =  WorkerWrapper.createWorkerSrc<A, R>(func);
    try{
      let blob = new Blob(worker_src, {
        type: "application/javascript"
      });

      let url = URL.createObjectURL(blob);
      const worker = new Worker(url);
      URL.revokeObjectURL(url);
  
      worker.onmessage = (e) => {
        let { id, data } = e.data;
        let resolve = this.stored_resolves.get(id);
        this.stored_resolves.delete(id);
        if(resolve){
          resolve(data);
        } else{
          console.error("invalid id in message returned by worker")
        }
      }
  
      worker.onerror = (e) => {
        console.error("worker error:", e);
      }
      worker.onmessageerror = (e) => {
        console.error("worker message error:", e);
      }

      if(this._worker){
        this._worker.terminate();
      }
      this._input_src = func.toString();
      this._worker_src = worker_src;
      this._worker = worker;
      return worker;
    } catch(e){
      console.error("error in creating worker:", e);
      return this._worker;
    }
  }
  public resetWorker(input_src?: ((arg: A) => R) | string){
    let old_worker = this._worker;
    let new_worker = this.createWorker(input_src || this._input_src);
    return (new_worker && (new_worker !== old_worker));
  }

  public terminate(){
    this._worker.terminate();
  }

  private count = 0;
  postMessage(arg: A): Promise<R> {
    let id = ++this.count;
    return new Promise((res, rej) => {
      this.stored_resolves.set(id, res);
      this._worker.postMessage({
        id,
        data: arg
      });
    })
  }
}

// @ts-ignore
window["WorkerWrapper"] = WorkerWrapper;



/*****/
//    ^ remove this slash to toggle code below
/*/

// usage:

let worker = new WorkerWrapper(
  (d) => { return d + d; }
);
worker.postMessage("HEY").then((d) => {
  console.log(d); // HEYHEY
})

// example on more complex input argument
let worker2 = new WorkerWrapper((obj) => {
  obj[obj.a] *= Math.random();
  return obj;
})
worker2.postMessage({
  a: "abc",
  "abc": 12
}).then((d) => {
  console.log(d); // HEYHEY
})


// example on adding functions-out-of-scope
function a(d){return d+2;} // deps of b()
function b(c){return a(c)*a(20);} // needs to be named
let worker3 = new WorkerWrapper(
  (f) => {
    return b(f);
  }, [
    `${a.toString()};`, // deps of b()
    `${b.toString()};`,
    `console.log(b);`,
  ]
)
worker3.postMessage(100).then(res => {
	console.log(res)
}).catch(e => {
	console.error(e);
});

/******/