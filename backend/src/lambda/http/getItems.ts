import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { getItems } from '../../businesslogic/items';
import { getSingleCategory } from '../../businesslogic/categories';

import Category from '../../models/Category';
import notFoundResponse from '../../utils/notFoundResponse';
import getRestaurantId from '../utils/getRestaurantId';

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const { categoryId } = event.pathParameters; 
  const jwtToken = event.headers.Authorization;
  const restaurantId = getRestaurantId(jwtToken);

  const category: Category = await getSingleCategory(restaurantId, categoryId);
  if(Object.keys(category).length === 0){
    return notFoundResponse("Category");
  }
  const items = await getItems(categoryId);

  return {
    statusCode: 200,
    headers:{
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({items})
  }
}