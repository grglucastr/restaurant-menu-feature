import * as AWS from 'aws-sdk';

const LOCAL_ENVIRONMENT = process.env.LOCAL_ENVIRONMENT;

const dbclient = (): AWS.DynamoDB.DocumentClient => {
  if(LOCAL_ENVIRONMENT){
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8888'
    });
  }
  return new AWS.DynamoDB.DocumentClient();

}

export default dbclient;

