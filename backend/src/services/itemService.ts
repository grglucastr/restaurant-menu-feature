import dbclient from '../utils/dbclient';
import Item from '../models/Item';

const TABLE_NAME = process.env.DYNAMODB_ITEMS_TABLE_NAME;
const docClient = dbclient();


export default class ItemService{
  async getAllItems(restaurantId: string): Promise<Item[]>{
    const items = await docClient.query({
      TableName: TABLE_NAME,
      KeyConditionExpression: '#rId = :rId',
      ExpressionAttributeNames: {
        '#rId':'restaurantId',
      },
      ExpressionAttributeValues: {
        ':rId': restaurantId
      }
    }).promise();

    return items.Items as Item[];
  }

  async getSingleItem(restaurantId:string, itemId:string): Promise<Item> {
    const foundItem = await docClient.query({
      TableName: TABLE_NAME,
      KeyConditionExpression: '#rId = :rId',
      FilterExpression: '#itId = :itId',
      ExpressionAttributeNames: {
        '#itId':'itemId',
        '#rId' :'restaurantId'
      },
      ExpressionAttributeValues: {
        ':itId':itemId,
        ':rId': restaurantId
      }
    }).promise();

    if(foundItem.Count === 0){
      return {} as Item;
    }
    return foundItem.Items[0] as Item;
  }

  async createItem(item: Item): Promise<Item>  {
    await docClient.put({
      TableName: TABLE_NAME,
      Item: item
    }).promise();

    return item;
  }

  async deleteItem(item: Item): Promise<void> {
    await docClient.delete({
      TableName: TABLE_NAME,
      Key: {
        restaurantId: item.restaurantId,
        createdAt: item.createdAt
      }
    }).promise();
  }

  async updateItem(item: Item): Promise<Item> {
    await docClient.update({
      TableName: TABLE_NAME,
      Key:{
        restaurantId: item.restaurantId,
        createdAt: item.createdAt
      },
      UpdateExpression: 'SET #nm = :nm, #pr = :pr, #cat = :cat',
      ExpressionAttributeNames: {
        '#nm':'name',
        '#pr':'price',
        '#cat':'categoryId'
      },
      ExpressionAttributeValues: {
        ':nm': item.name,
        ':pr': item.price,
        ':cat': item.categoryId
      }
    }).promise();
    
    return item as Item;
  }
}