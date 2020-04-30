import { APIGatewayProxyResult, APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';

import  dbclient  from '../../utils/dbclient';

const docClient = dbclient();
const TABLE_NAME = process.env.DYNAMODB_CATEGORIES_TABLE_NAME;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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
      ':rId': restaurantId,
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

  await docClient.delete({
    TableName: TABLE_NAME,
    Key: {
      restaurantId,
      createdAt: foundCategory.Items[0].createdAt
    }
  }).promise();


  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({})
  }
}