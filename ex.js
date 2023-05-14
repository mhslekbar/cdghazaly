const noDuplicateWOrd = (word) => {
  if(word.length === 0) {
    return true
  }
  let wordArr = word.toLowerCase().split("")
  let count
  for(let letter of wordArr) {
    count = 0
    for(let wo of wordArr) {
      if(letter === wo) 
        count++;
    }
    if(count > 1) {
      break
    }
  }  
  return count < 2 ? true : false
}

console.log(noDuplicateWOrd("sniper"))
