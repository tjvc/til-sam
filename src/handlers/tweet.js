const Twitter = require("twitter");
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const params = {
    TableName: "Tweets",
  };

  const result = await dynamodb.scan(params).promise();
  const tweets = result.Items;

  if (!tweets.length > 0) {
    return { statusCode: 204 };
  }

  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  const sortedTweets = tweets.sort((a, b) => {
    return a.QueuedAt > b.QueuedAt ? 1 : -1;
  });

  await client.post("statuses/update", { status: sortedTweets[0].Body });

  await dynamodb
    .delete({
      ...params,
      Key: {
        ID: sortedTweets[0].ID,
      },
    })
    .promise();

  return { statusCode: 201 };
};
