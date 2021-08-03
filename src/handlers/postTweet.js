const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const date = new Date();
  const body = JSON.parse(event.body);

  const tweet = {
    ID: date.getTime(),
    Body: body.tweetBody,
    QueuedAt: date.toISOString(),
  };

  const params = {
    TableName: "Tweets",
    Item: tweet,
  };

  await dynamodb.put(params).promise();

  const response = {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(tweet),
  };

  return response;
};
