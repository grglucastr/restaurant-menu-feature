import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import dbclient from '../../utils/dbclient';
const TABLE_NAME = process.env.DYNAMODB_ITEMS_TABLE_NAME;
const docClient = dbclient();

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const { categoryId, itemId } = event.pathParameters;

  const foundItem = await docClient.query({
    TableName: TABLE_NAME,
    KeyConditionExpression: '#cId = :cId',
    FilterExpression: '#itId = :itId',
    ExpressionAttributeNames: {
      '#itId':'itemId',
      '#cId': 'categoryId'
    },
    ExpressionAttributeValues: {
      ':itId':itemId,
      ':cId': categoryId
    }
  }).promise();

  if(foundItem.Count === 0){
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
      categoryId,
      createdAt: foundItem.Items[0].createdAt
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