import { getSingleItem } from '../../businesslogic/items'
import Item from '../../models/Item';
import notFoundResponse from '../../utils/notFoundResponse';
import { APIGatewayProxyResult } from 'aws-lambda';

export default async (restaurantId: string, itemId:string) => {
  
    const item: Item = await getSingleItem(restaurantId, itemId);
  if(Object.keys(item).length === 0){
    const response: APIGatewayProxyResult = notFoundResponse("Item");
    return {
      error: { content: response }
    }

  }

  return{
    payload:{content: item}
  }
}