import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getSingleCategory, updateCategory } from '../../businesslogic/categories';
import notFoundResponse from '../../utils/notFoundResponse';
import CategoryRequest from '../../requests/categoryRequest';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const categoryRequest:CategoryRequest = JSON.parse(event.body);
  
  const { categoryId } = event.pathParameters;
  const restaurantId = '1';

  const category = await getSingleCategory(restaurantId, categoryId);
  
  if(Object.keys(category).length === 0){
    return notFoundResponse();
  }

  const updated = await updateCategory(category, categoryRequest);

  return{
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({item: updated})
  };
}