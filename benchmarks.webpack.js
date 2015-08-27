var context = require.context('./src/js', true, /-benchmark\.js$/);
context.keys().forEach(context);
module.exports = context;