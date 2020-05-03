import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createItem } from '../../businesslogic/items';
import ItemRequest from '../../requests/itemRequest';
import getRestaurantId from '../utils/getRestaurantId';

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
   
  const jwtToken = event.headers.Authorization;
  const restaurantId = getRestaurantId(jwtToken);

  console.log('restaurant Id', restaurantId);
  console.log('body', JSON.parse(event.body));

  const itemRequest: ItemRequest = {
    ...JSON.parse(event.body),
    restaurantId
  };
  
  

  const item = await createItem(itemRequest);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({item})
  };
}