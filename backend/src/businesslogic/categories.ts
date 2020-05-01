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

export const getSingleCategory = (restaurantId:string, categoryId:string): Promise<Category> => {
  return categoryService.getSingleCategory(restaurantId, categoryId);
}

export const deleteCategory = (category: Category): Promise<void> => {
  return categoryService.deleteCategory(category);
}

export const updateCategory = (category:Category, categoryRequest: CategoryRequest): Promise<Category> => {

  const newInfos: Category = {
    ...category,
    name: categoryRequest.name
  }

  return categoryService.updateCategory(newInfos);
}