import Category from '../models/Category';
import CategoryRequest from '../requests/categoryRequest';
import CategoryService from '../services/categoryService';
import * as uuid from 'uuid';

const categoryService = new CategoryService();

export const getCategories = (restaurantId: string): Promise<Category[]> => {
  return categoryService.getCategories(restaurantId);
}

export const createCategory = (restaurantId:string, categoryRequest: CategoryRequest): Promise<Category> => {

  const category:Category = { 
    restaurantId,
    categoryId: uuid.v4(),
    createdAt: new Date().toISOString(),
    name: categoryRequest.name
  }

  return categoryService.createCategory(category);
}