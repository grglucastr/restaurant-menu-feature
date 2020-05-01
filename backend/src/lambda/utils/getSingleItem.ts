import { getSingleItem } from '../../businesslogic/items';
import { getSingleCategory } from '../../businesslogic/categories';
import Category from '../../models/Category';
import Item from '../../models/Item';
import notFoundResponse from '../../utils/notFoundResponse';
import { APIGatewayProxyResult } from 'aws-lambda';

export default async (restaurantId: string, categoryId: string, itemId:string) => {
  
  const category: Category = await getSingleCategory(restaurantId, categoryId);
  if(Object.keys(category).length === 0){
    const response: APIGatewayProxyResult = notFoundResponse("Category");
    return {
      error: { content: response }
    }
  }

  const item: Item = await getSingleItem(categoryId, itemId);
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