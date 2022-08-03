


// https://github.com/andywer/typed-emitter/blob/master/index.d.ts


export type EventMap = {
  [key: string]: (...args: any[]) => void
}

export interface EventEmitter<M extends EventMap>{
  on<E extends keyof M>(event: E, func: M[E], option?: any): void;
  off<E extends keyof M>(event: E, func: M[E], option?: any): void;
  emit<E extends keyof M>(event: E, ...args: any[]): void;
}
/*


export class ExampleEventEmitter<M> implements EventEmitter<{
// event: listener signature
  "load": (number: number) => void
  "close": (object: object) => void
}> {
  private listeners: Map<keyof M, Array<M[keyof M]>> = {} as any

  on(event: E, func: EventMap[E]){
    if(this.listeners.has(event)){
      this.listeners.get(event)!.push(func);
    } else{
      this.listeners.set(event, [ func ]);
    }
  }
}

*/