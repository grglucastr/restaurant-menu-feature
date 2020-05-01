import ItemService from '../services/itemService';
import ItemRequest from '../requests/itemRequest';
import Item from '../models/Item';
import * as uuid from 'uuid';

const itemService = new ItemService();
const bucketName = process.env.S3_BUCKET_IMAGES;

export const createItem = (categoryId:string, requestItem: ItemRequest): Promise<Item> => {
  const itemId: string = uuid.v4();
  const photo: string = `https://${bucketName}.s3.amazonaws.com/${itemId}`;
  
  const item: Item = {
    categoryId,
    itemId,
    createdAt: new Date().toISOString(),
    ...requestItem,
    photo
  }

  return itemService.createItem(item);
}

export const getSingleItem = (categoryId:string, itemId:string): Promise<Item> => {
  return itemService.getSingleItem(categoryId, itemId);
}

export const getItems = (categoryId:string): Promise<Item[]> => {
  return itemService.getAllItems(categoryId);
}

export const updateItem = (item:Item, itemRequest: ItemRequest): Promise<Item> => {
  const newInfo: Item = {
    ...item,
    ...itemRequest
  }
  return itemService.updateItem(newInfo);
}

export const deleteItem = (item:Item): Promise<void> => {
  return itemService.deleteItem(item);
}