// domain/.netlify/functions/hello

exports.handler = async function(event, contect) {
  return {
    statusCode: 200,
    body: "Hello World"
  };
};
