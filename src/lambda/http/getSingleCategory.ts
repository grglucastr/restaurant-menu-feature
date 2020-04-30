import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { getSingleCategory } from '../../businesslogic/categories';
import notFoundResponse from '../../utils/notFoundResponse';

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  
  const { categoryId } = event.pathParameters;
  const restaurantId = '1';

  const category = await getSingleCategory(restaurantId, categoryId);
  
  if(Object.keys(category).length === 0){
    return notFoundResponse();
  }
  
  return{
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({item: category})
  };
}