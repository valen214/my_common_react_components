
export function capitalize(word: string){
  return word[0].toUpperCase() + word.slice(1);
}

export function toCamel(){

}
export function toSnake(){
  
}
/*
https://www.geeksforgeeks.org/
how-to-convert-a-string-into-kebab-case-using-javascript/
*/
export function toKebab(str: string){
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}



export function randomstring(
  length: number,
  dict="abcdefghijklmnopqrstuvwxyz" +
       "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"){
  return crypto.getRandomValues(
      new Uint8Array(length)
    ).reduce((l, r) => (
      l + dict[ Math.trunc(r * dict.length / 256) ]
    ), "");
  // String.prototype.charAt() works too as it also takes non-int
};
