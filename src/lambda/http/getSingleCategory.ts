import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import dbclient from '../../utils/dbclient';
const TABLE_NAME = process.env.DYNAMODB_CATEGORIES_TABLE_NAME;
const docClient = dbclient();

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  
  const { categoryId } = event.pathParameters;

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

  return{
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({item: foundCategory.Items[0]})
  };
}