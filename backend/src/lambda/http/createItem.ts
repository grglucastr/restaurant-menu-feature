import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createItem } from '../../businesslogic/items';
import ItemRequest from '../../requests/itemRequest';

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
   
  const { categoryId } = event.pathParameters;
  const itemRequest: ItemRequest = JSON.parse(event.body);

  const item = await createItem(categoryId, itemRequest);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({item})
  };
}