import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { deleteItem } from '../../businesslogic/items';
import singleItem from '../utils/getSingleItem';
import getRestaurantId from '../utils/getRestaurantId';

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const { itemId } = event.pathParameters;
  const jwtToken = event.headers.Authorization;
  const restaurantId = getRestaurantId(jwtToken);
  
  const item = await singleItem(restaurantId, itemId);
  if(item.error){
    return {
      ...item.error.content
    }
  }

  await deleteItem(item.payload.content);

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({})
  }
}