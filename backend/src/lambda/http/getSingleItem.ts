import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import singleItem from '../utils/getSingleItem';

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const { categoryId, itemId } = event.pathParameters;
  const restaurantId = '1';

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