import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import dbclient from '../../utils/dbclient';
const TABLE_NAME = process.env.DYNAMODB_CATEGORIES_TABLE_NAME;
const docClient = dbclient();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body);
  const { categoryId } = event.pathParameters;
  const restaurantId = '1';

  const foundCategory = await docClient.query({
    TableName: TABLE_NAME,
    KeyConditionExpression: '#rId = :rId',
    FilterExpression: '#cId = :cId',
    ExpressionAttributeNames: {
      '#rId':'restaurantId',
      '#cId': 'categoryId'
    },
    ExpressionAttributeValues: {
      ':rId':'1',
      ':cId': categoryId
    }
  }).promise();

  if(foundCategory.Count === 0){
    return{
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify({message: "Category not found"})
    };
  }

  await docClient.update({
    TableName: TABLE_NAME,
    Key:{
      restaurantId,
      createdAt: foundCategory.Items[0].createdAt
    },
    UpdateExpression: 'SET #nm = :nm',
    ExpressionAttributeNames: {
      '#nm':'name'
    },
    ExpressionAttributeValues: {
      ':nm': body.name
    }
  }).promise();

  const updated = {
    ...foundCategory.Items[0],
    name: body.name
  }

  return{
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({item: updated})
  };
}