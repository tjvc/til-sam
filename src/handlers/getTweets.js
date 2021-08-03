const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const params = {
    TableName: "Tweets",
  };

  const result = await dynamodb.scan(params).promise();

  const sortedTweets = result.Items.sort((a, b) => {
    return a.QueuedAt > b.QueuedAt ? 1 : -1;
  });

  const response = {
    statusCode: 200,
    // By default, AWS SAM uses Lambda proxy integrations (https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-start-api.html)
    // This means we are responsible for returning CORS headers (https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html)
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ tweets: sortedTweets }),
  };

  return response;
};
