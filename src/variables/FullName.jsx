export function fullName(object){
  if(object ===null) {
    return ' ';
  }
  return object.firstname + ' ' + object.lastname
}