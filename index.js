const { reactive, useEffect } = require('./targetMap.js');

const user = reactive({
  first: 'name1',
  second: 'name2',
});

let comName = '';

useEffect(() => {
  comName = user.first + user.second;
});

console.log(comName);

user.first = 'first';

console.log(comName);
