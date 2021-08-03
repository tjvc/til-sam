const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  await dynamodb
    .delete({
      TableName: "Tweets",
      Key: {
        ID: body.tweetId,
      },
    })
    .promise();

  const response = {
    statusCode: 204,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return response;
};
