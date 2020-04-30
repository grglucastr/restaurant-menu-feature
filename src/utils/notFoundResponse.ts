import { APIGatewayProxyResult} from 'aws-lambda';

export default (resourceName?: string): APIGatewayProxyResult => {
  
  let respMessage = "Resource not found";
  if(resourceName && resourceName.length > 0){
    respMessage = `${resourceName} not found`;
  }

  return{
    statusCode: 404,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({message: respMessage})
  };
}