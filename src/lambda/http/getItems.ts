import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { getItems } from '../../businesslogic/items';
import { getSingleCategory } from '../../businesslogic/categories';

import Category from '../../models/Category';
import notFoundResponse from '../../utils/notFoundResponse';

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const { categoryId } = event.pathParameters; 
  const restaurantId = '1';

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