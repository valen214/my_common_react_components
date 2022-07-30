
export function capitalize(word: string){
  return word[0].toUpperCase() + word.slice(1);
}

export function disableAllInput(){
  let inputElements = document.querySelectorAll("input");
  for(let elem of inputElements){
    elem.disabled = true;
  }
}
export function enableAllInput(){
  let inputElements = document.querySelectorAll("input");
  for(let elem of inputElements){
    elem.disabled = false;
  }
}

// https://stackoverflow.com/questions/63711237
type ThrottleOption = {
  repeat: number
  last?: number
}
let queue = new Map<string, ThrottleOption>();
export function throttle(
    fn: Function,
    ms: number = 1000,
    options: ThrottleOption = {
      repeat: 1,
      last: -ms-1
    }
){
  let id = fn.toString().substring(30);
  let opt = queue.get(id);
  if(!opt){
    queue.set(id, options);
    options.repeat--;
    fn();
    setTimeout(() => {
      queue.delete(id);
    }, ms);
    return;
  }

  if(opt.repeat > 0){
    opt.repeat -= 1;
    fn();
  }
}