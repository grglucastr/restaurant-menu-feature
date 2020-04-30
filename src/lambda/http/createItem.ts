import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import dbclient from '../../utils/dbclient';
import * as uuid from 'uuid';

const TABLE_NAME = process.env.DYNAMODB_ITEMS_TABLE_NAME;
const docClient = dbclient();

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  
  const { categoryId } = event.pathParameters;
  const restaurantId = "1";
  const body = JSON.parse(event.body);

  const item = {
    itemId: uuid.v4(),
    restaurantId,
    categoryId,
    createdAt: new Date().toISOString(),
    ...body
  }

  await docClient.put({
    TableName: TABLE_NAME,
    Item: item
  }).promise();

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({item})
  };
}