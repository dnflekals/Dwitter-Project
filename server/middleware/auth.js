import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error' };

// 모든 Auth에 대해서 header에 Authorization이 있는지,
// 있다면 우리가 검증할 수 있는 jwt를 가진 요청인지 확인하고, 
// jwt에서 검증이 되었더라도, 실재로 사용자가 DB에 존재하는지 확인해주는 공통된 logic
export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  // Auth가 있는 경우 auth 뒤에 token을 받아온다.
  const token = authHeader.split(' ')[1];
  // TODO: Make it secure!
  jwt.verify(
    token,
    'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z',
    async (error, decoded) => {
      if (error) {
        return res.status(401).json(AUTH_ERROR);
      }
      const user = await userRepository.findById(decoded.id);
      if (!user) {
        return res.status(401).json(AUTH_ERROR);
      }
      // 앞으로 이어질 callback 함수에서 계속 동일하게 접근해야하는 데이터는 req object 안에 등록할 수 있다.
      req.userId = user.id; // req.customData
      next();
    }
  );
};
