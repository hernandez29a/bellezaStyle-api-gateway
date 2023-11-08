/* eslint-disable prettier/prettier */
export enum RabbitMQ {
  UserQueue = 'users',
  ProductQueue = 'products',
  CategoryQueue = 'categories',
  ImageQueue = 'images',
}

export enum UserMSG {
  CREATE = 'CREATE_USER',
  REGISTER = 'REGISTER_USER',
  FIND_ALL = 'FIND_USERS',
  FIND_ONE = 'FIND_USER',
  UPDATE = 'UPDATE_USER',
  DELETE = 'DELETE_USER',
  GET_EMAIL = 'EMAIL_USER',
  VALID_USER = 'VALID_USER',
  RENEW_TOKEN = 'RENEW_TOKEN',
}

export enum ProductMSG {
  CREATE = 'CREATE_PRODUCT',
  REGISTER = 'REGISTER_PRODUCT',
  FIND_ALL = 'FIND_PRODUCTS',
  FIND_ONE = 'FIND_PRODUCT',
  UPDATE = 'UPDATE_PRODUCT',
  DELETE = 'DELETE_PRODUCT',
}

export enum CategoryMSG {
  CREATE = 'CREATE_CATEGORY',
  REGISTER = 'REGISTER_CATEGORY',
  FIND_ALL = 'FIND_CATEGORIES',
  FIND_ONE = 'FIND_CATEGORY',
  UPDATE = 'UPDATE_CATEGORY',
  DELETE = 'DELETE_CATEGORY',
  ADD_PRODUCT = 'ADD_PRODUCT'
}

export enum ImgMSG {
  GET_IMAGE = 'GET_IMAGE',
  UPDATE = 'UPDATE_IMAGE',
}

