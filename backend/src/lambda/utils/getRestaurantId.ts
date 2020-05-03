import { decode } from 'jsonwebtoken';

import { JwtPayload } from '../../auth/JwtPayload';

/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseRestaurantId(jwtToken: string): string {
  const extractedJWT = extractJwtFromHeader(jwtToken);
  const decodedJwt = decode(extractedJWT) as JwtPayload;
  return decodedJwt.sub;
}

export function extractJwtFromHeader(authorization): string{
  const split = authorization.split(' ');
  return split[1];
}


export default (header:string): string => {
  return parseRestaurantId(header)

}