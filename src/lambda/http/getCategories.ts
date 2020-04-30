import {APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import dbclient from '../../utils/dbclient';

const TABLE_NAME = process.env.DYNAMODB_CATEGORIES_TABLE_NAME;
const docClient = dbclient();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(event);

  const categories = await docClient.query({
    TableName: TABLE_NAME,
    KeyConditionExpression: '#rId = :rId',
    ExpressionAttributeNames: {
      '#rId':'restaurantId'
    },
    ExpressionAttributeValues: {
      ':rId': '1'
    }
  }).promise();
  
  return {
    statusCode: 200,
    headers:{
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({items: categories.Items})
  }
}