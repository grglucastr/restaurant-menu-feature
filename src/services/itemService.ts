import dbclient from '../utils/dbclient';
import Item from '../models/Item';

const TABLE_NAME = process.env.DYNAMODB_ITEMS_TABLE_NAME;
const docClient = dbclient();


export default class ItemService{
  async getAllItems(categoryId: string): Promise<Item[]>{
    const items = await docClient.query({
      TableName: TABLE_NAME,
      KeyConditionExpression: '#catId = :catId',
      ExpressionAttributeNames: {
        '#catId':'categoryId',
      },
      ExpressionAttributeValues: {
        ':catId': categoryId
      }
    }).promise();

    return items.Items as Item[];
  }

  async getSingleItem(categoryId:string, itemId:string): Promise<Item> {
    const foundItem = await docClient.query({
      TableName: TABLE_NAME,
      KeyConditionExpression: '#cId = :cId',
      FilterExpression: '#itId = :itId',
      ExpressionAttributeNames: {
        '#itId':'itemId',
        '#cId': 'categoryId'
      },
      ExpressionAttributeValues: {
        ':itId':itemId,
        ':cId': categoryId
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
        categoryId: item.categoryId,
        createdAt: item.createdAt
      }
    }).promise();
  }

  async updateItem(item: Item): Promise<Item> {
    await docClient.update({
      TableName: TABLE_NAME,
      Key:{
        categoryId: item.categoryId,
        createdAt: item.createdAt
      },
      UpdateExpression: 'SET #nm = :nm, #pr = :pr',
      ExpressionAttributeNames: {
        '#nm':'name',
        '#pr':'price'
      },
      ExpressionAttributeValues: {
        ':nm': item.name,
        ':pr': item.price,
      }
    }).promise();
    
    return item as Item;
  }
}