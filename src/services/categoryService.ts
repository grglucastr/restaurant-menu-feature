import dbclient from '../utils/dbclient';
import Category from '../models/Category';

const TABLE_NAME = process.env.DYNAMODB_CATEGORIES_TABLE_NAME;
const docClient = dbclient();

export default class CategoryService{

  async getCategories(restaurantId: string): Promise<Category[]> {

    const categories = await docClient.query({
      TableName: TABLE_NAME,
      KeyConditionExpression: '#rId = :rId',
      ExpressionAttributeNames: {
        '#rId':'restaurantId'
      },
      ExpressionAttributeValues: {
        ':rId': restaurantId
      }
    }).promise();

    return categories.Items as Category[];
  }

  async createCategory (category: Category): Promise<Category> {
    await docClient.put({
      TableName: TABLE_NAME,
      Item: category
    }).promise();

    return category;
  }

  async getSingleCategory(restaurantId:string, categoryId: string): Promise<Category> {
    
    const category = await docClient.query({
      TableName: TABLE_NAME,
      KeyConditionExpression: '#rId = :rId',
      FilterExpression: '#cId = :cId',
      ExpressionAttributeNames: {
        '#rId':'restaurantId',
        '#cId': 'categoryId'
      },
      ExpressionAttributeValues: {
        ':rId': restaurantId,
        ':cId': categoryId
      }
    }).promise();

    return category.Count === 0 ? 
    {} as Category : 
    category.Items[0] as Category;
  }

  async deleteCategory(category: Category): Promise<void> {
    await docClient.delete({
      TableName: TABLE_NAME,
      Key: {
        restaurantId: category.restaurantId,
        createdAt: category.createdAt
      }
    }).promise();
  }

}