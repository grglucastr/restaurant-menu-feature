import { APIGatewayProxyResult, APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { getSingleCategory, deleteCategory } from '../../businesslogic/categories';
import notFoundResponse from '../../utils/notFoundResponse';
import getRestaurantId from '../utils/getRestaurantId';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { categoryId } = event.pathParameters;
  const jwtToken = event.headers.Authorization;
  const restaurantId = getRestaurantId(jwtToken);
  
  const category = await getSingleCategory(restaurantId, categoryId);
  
  if(Object.keys(category).length === 0){
    return notFoundResponse();
  }

  await deleteCategory(category);
  
  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({})
  }
}