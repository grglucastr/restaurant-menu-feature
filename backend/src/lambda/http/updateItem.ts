import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import singleItem from '../utils/getSingleItem';
import { updateItem } from '../../businesslogic/items';
import Item from '../../models/Item';
import ItemRequest from '../../requests/itemRequest';
import getRestaurantId from '../utils/getRestaurantId';

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const { itemId } = event.pathParameters;
  const jwtToken = event.headers.Authorization;
  const restaurantId = getRestaurantId(jwtToken);

  const itemRequest: ItemRequest = JSON.parse(event.body);

  const item = await singleItem(restaurantId, itemId);
  if(item.error){
    return { ...item.error.content }
  }

  const updated: Item = await updateItem(item.payload.content, itemRequest);

  return{
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({item: updated})
  };
}