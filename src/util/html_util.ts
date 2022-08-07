

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
