import jwt from 'jsonwebtoken';
import configs from '../configs';

const generateToken = (id: string, name: string, email: string): string => {
  return jwt.sign({ id, name, email }, configs.TOKEN_SECRET as unknown as string, { expiresIn: '1h' });
};

export default generateToken;
