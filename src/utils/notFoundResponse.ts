import { APIGatewayProxyResult} from 'aws-lambda';

export default (): APIGatewayProxyResult => {
  return{
    statusCode: 404,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({message: "Resource not found"})
  };
}