import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import dbclient from '../../utils/dbclient';

const TABLE_NAME = process.env.DYNAMODB_ITEMS_TABLE_NAME;
const docClient = dbclient();

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const { categoryId } = event.pathParameters;
    
  const items = await docClient.query({
    TableName: TABLE_NAME,
    KeyConditionExpression: '#catId = :catId',
    ExpressionAttributeNames: {
      '#catId':'categoryId',
    },
    ExpressionAttributeValues: {
      ':catId': categoryId
    }
  }).promise();

  return {
    statusCode: 200,
    headers:{
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({items: items.Items})
  }
}