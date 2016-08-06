function hello() {
    console.log('Hello');
}

var i = 0;
function count() {
    return ++i;
}

exports.hello = hello;
exports.count = count;
