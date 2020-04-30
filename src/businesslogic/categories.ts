import Category from '../models/Category';
import CategoryService from '../services/categoryService';

const categoryService = new CategoryService();

export const getCategories = (restaurantId: string): Promise<Category[]> => {
  return categoryService.getCategories(restaurantId);
}