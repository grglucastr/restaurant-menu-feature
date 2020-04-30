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

  return{
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({item: foundItem.Items[0]})
  };
}