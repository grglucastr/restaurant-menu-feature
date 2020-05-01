import {APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getCategories } from '../../businesslogic/categories';
import getRestaurantId from '../utils/getRestaurantId';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(event);
  const jwtToken = event.headers.Authorization;
  const restaurantId = getRestaurantId(jwtToken);

  const categories = await getCategories(restaurantId);
  
  return {
    statusCode: 200,
    headers:{
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({items: categories})
  }
}