var getUserSync = require('./getUserSync');

console.log("starting user 1");
var user1 = getUserSync('u1');
console.log('user1',user1);

console.log('starting user2');
var user2 = getUserSync('u2');
console.log('user2',user2);

console.log('counting sum');
var sum = 1+2;
console.log(sum);