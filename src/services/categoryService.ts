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
  

}