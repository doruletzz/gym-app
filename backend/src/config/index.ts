export const IS_PROD = process.env.NODE_ENV === 'production';

export const SECRET = IS_PROD ? process.env.SECRET : 'secret';

export const PORT = IS_PROD ? process.env.PORT : 4000;
