import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import dbclient from '../../utils/dbclient';
import * as uuid from 'uuid';

const TABLE_NAME = process.env.DYNAMODB_CATEGORIES_TABLE_NAME;
const docClient = dbclient();

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body);
  
  const category = {
    restaurantId: '1',
    createdAt: new Date().toISOString(),
    categoryId: uuid.v4(),
    ...body
  }
  
  await docClient.put({
    TableName: TABLE_NAME,
    Item: category
  }).promise();

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({item: category})
  }
}