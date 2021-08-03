// https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html#api-gateway-lambda-authorizer-create

// > The third argument, callback, is a function that you can call in non-async handlers to send a response
// https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html
// TODO: Make async?
exports.handler = function (event, context, callback) {
  const token = event.authorizationToken.substring(
    7, // Bearer
    event.authorizationToken.length
  );

  if (token == process.env.AUTH_TOKEN) {
    // resource is a wildcard here to permit all API methods (if we use event.methodArn, we'll cache a policy that is only valid for a given method)
    // https://nealanalytics.com/blog/how-to-create-a-custom-authorizer-for-aws-api-gateway-using-serverless-lambda-functions-in-node-and-net-core/
    callback(null, generatePolicy("user", "Allow", "*"));
  } else {
    callback(null, generatePolicy("user", "Deny", "*"));
  }
};

var generatePolicy = function (principalId, effect, resource) {
  var authResponse = {};

  authResponse.principalId = principalId;
  if (effect && resource) {
    var policyDocument = {};
    policyDocument.Version = "2012-10-17";
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = "execute-api:Invoke";
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  return authResponse;
};
