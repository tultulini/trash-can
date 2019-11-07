

// const AWS = require('aws-sdk')
// AWS.config ={region:'us-east-1'}
// var params = {
//     TableName: 'contractors-devtultulini',
// };

// var documentClient = new AWS.DynamoDB.DocumentClient();

// documentClient.scan(params).promise()
// .then(res => console.log(`res: ${JSON.stringify(res, null, '\t')}`))
// .catch(err=>console.error(err))
const a = [1,2,3]
const b = a.filter(n=>n>3)

console.log(b.length);

// var input  = '2019-10-31T01:02:00'
// var iso = /^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?$/;

//     var parts = iso.test(input)
// console.log(`parts: ${parts}`)

// const a = ('1').toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping:false})
// console.log(`a: ${a}`)

