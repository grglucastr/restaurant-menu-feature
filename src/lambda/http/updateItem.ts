import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import dbclient from '../../utils/dbclient';
const TABLE_NAME = process.env.DYNAMODB_ITEMS_TABLE_NAME;
const docClient = dbclient();

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const { categoryId, itemId } = event.pathParameters;
  const body = JSON.parse(event.body);

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

  await docClient.update({
    TableName: TABLE_NAME,
    Key:{
      categoryId,
      createdAt: foundItem.Items[0].createdAt
    },
    UpdateExpression: 'SET #nm = :nm, #pr = :pr',
    ExpressionAttributeNames: {
      '#nm':'name',
      '#pr':'price'
    },
    ExpressionAttributeValues: {
      ':nm': body.name,
      ':pr': body.price,
    }
  }).promise();

  const updated = {
    ...foundItem.Items[0],
    name: body.name,
    price: body.price,
  }

  return{
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({item: updated})
  };
}