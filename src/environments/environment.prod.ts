export const environment = {
  production: true,
  withCredentials: true,
  baseUrl: 'http://ec2-100-25-130-16.compute-1.amazonaws.com:8080',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':
      'http://p3-dist.s3-website-us-east-1.amazonaws.com',
  },
};
