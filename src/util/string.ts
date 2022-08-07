
export function capitalize(word: string){
  return word[0].toUpperCase() + word.slice(1);
}

export function toCamel(){

}
export function toSnake(){
  
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
