import configKeys from '../../../config';
import { createClient } from 'redis'

const connection = () => {
  const createRedisClient = () => {
    const client = createClient({
      url:configKeys.REDIS_URL ,
    })
    // const client = createClient();
    client.on('error', err => console.log('Redis Client Error', err));
    client.connect().then(()=>{
      console.log("Redis connected successfully".bg_red.bold)
    }).catch((err)=>{
      console.log("Redis connected unsuccessfully".bg_red.bold)
      console.log(err)
    })
    return client
    
  };

  return {
    createRedisClient
  };
}

export default connection