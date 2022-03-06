function test(){
  var array=['a','r','m','s','t','r','o','n','g']
  var io=['a','i','u','e','o']
  var  cont=0
 
    for(var j=0;j<io.length;j++){
      array.push(io[j])
      array.pop()
    }
  
  //var b=[...array.reduce(tt)]
  //console.log(array.reduce(tt))
  console.log(array)
}
test();



   // [10, 20, 30, 40, 50, 60, 70]
