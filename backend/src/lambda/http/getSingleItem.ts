import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import singleItem from '../utils/getSingleItem';
import getRestaurantId from '../utils/getRestaurantId';

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const { categoryId, itemId } = event.pathParameters;
  const jwtToken = event.headers.Authorization;
  const restaurantId = getRestaurantId(jwtToken);

  const item = await singleItem(restaurantId, categoryId, itemId);
  if(item.error){
    return {
      ...item.error.content
    }
  }
  
  return{
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({item: item.payload.content})
  };
}