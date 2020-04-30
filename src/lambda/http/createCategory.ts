import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createCategory } from '../../businesslogic/categories';
import CategoryRequest from '../../requests/categoryRequest';

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body);
  
  const restaurantId = "1";
  const categoryRequest: CategoryRequest = {
    name: body.name
  }
  
  const category = await createCategory(restaurantId, categoryRequest);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({item: category})
  }
}