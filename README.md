## TIL SAM

This is a proof-of-concept serverless application. It exposes a simple API that allows the caller to enqueue tweets to be posted on a daily schedule.

The application is defined using AWS's [Serverless Application Model](https://aws.amazon.com/serverless/sam/) (`template.yml`). It provisions an API gateway, which routes requests to a series of Lambda functions (`src/handlers`) that fetch, store and delete tweets. Another function, scheduled using a CloudWatch rule, posts the first tweet in the queue daily.

### Useful AWS links

- [Build a Basic Web Application on AWS](https://aws.amazon.com/getting-started/hands-on/build-web-app-s3-lambda-api-gateway-dynamodb/)
- [SAM Developer Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
- [Recommended Development Practices](https://docs.aws.amazon.com/whitepapers/latest/serverless-architectures-lambda/serverless-development-best-practices.html)
- [Local Developer Workflow](https://aws.amazon.com/blogs/compute/getting-started-with-serverless-for-developers-part-4-local-developer-workflow/)

## TODO

- Open issue to clarify CORS requirements?
- Stop creating `Stage` stage - https://github.com/aws/serverless-application-model/issues/2077
- Environment - https://github.com/aws/aws-sam-cli/issues/1163#issuecomment-557874976
- Input length constraint
- Hashtag prefix
- Styling
- Try Go runtime
