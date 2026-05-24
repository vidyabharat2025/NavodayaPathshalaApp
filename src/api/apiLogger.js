/**
 * API Logger
 * Logs API requests as curl commands and responses for debugging
 */

/**
 * Convert request config to curl command string
 */
const getRequestCurl = (config) => {
  const method = config.method?.toUpperCase() || 'GET';
  const url = config.baseURL + config.url;
  
  let curlCmd = `curl --request ${method} \\`;
  curlCmd += `\n  --url ${url} \\`;
  
  // Add headers
  if (config.headers) {
    Object.keys(config.headers).forEach(key => {
      const value = config.headers[key];
      if (value) {
        curlCmd += `\n  --header '${key}: ${value}' \\`;
      }
    });
  }
  
  // Add data/body
  if (config.data) {
    let dataStr = config.data;
    if (typeof config.data === 'object') {
      dataStr = JSON.stringify(config.data);
    }
    curlCmd += `\n  --data '${dataStr}'`;
  }
  
  return curlCmd;
};

/**
 * Log API Request
 */
const logApiRequest = (config) => {
  const method = config.method?.toUpperCase() || 'GET';
  const url = config.baseURL + config.url;
  
  console.log('\n' + '='.repeat(80));
  console.log('📤 API REQUEST');
  console.log('='.repeat(80));
  console.log(`Method: ${method}`);
  console.log(`URL: ${url}`);
  
  if (config.headers) {
    console.log('\nHeaders:');
    Object.keys(config.headers).forEach(key => {
      const value = config.headers[key];
      if (value && key.toLowerCase() !== 'authorization') {
        console.log(`  ${key}: ${value}`);
      }
    });
  }
  
  if (config.data) {
    console.log('\nRequest Body:');
    if (typeof config.data === 'string') {
      console.log(config.data);
    } else {
      console.log(JSON.stringify(config.data, null, 2));
    }
  }
  
  console.log('\nAs cURL:');
  console.log(getRequestCurl(config));
  console.log('='.repeat(80) + '\n');
};

/**
 * Log API Response
 */
const logApiResponse = (response) => {
  console.log('\n' + '='.repeat(80));
  console.log('📥 API RESPONSE');
  console.log('='.repeat(80));
  console.log(`Status: ${response.status} ${response.statusText}`);
  console.log(`URL: ${response.config.baseURL}${response.config.url}`);
  
  if (response.headers) {
    console.log('\nResponse Headers:');
    Object.keys(response.headers).forEach(key => {
      const value = response.headers[key];
      if (value) {
        console.log(`  ${key}: ${value}`);
      }
    });
  }
  
  if (response.data) {
    console.log('\nResponse Body:');
    if (typeof response.data === 'string') {
      console.log(response.data);
    } else {
      console.log(JSON.stringify(response.data, null, 2));
    }
  }
  console.log('='.repeat(80) + '\n');
};

/**
 * Log API Error
 */
const logApiError = (error) => {
  console.log('\n' + '='.repeat(80));
  console.log('❌ API ERROR');
  console.log('='.repeat(80));
  
  if (error.config) {
    const method = error.config.method?.toUpperCase() || 'GET';
    const url = error.config.baseURL + error.config.url;
    console.log(`Method: ${method}`);
    console.log(`URL: ${url}`);
  }
  
  if (error.response) {
    console.log(`\nStatus: ${error.response.status} ${error.response.statusText}`);
    if (error.response.data) {
      console.log('\nError Response:');
      if (typeof error.response.data === 'string') {
        console.log(error.response.data);
      } else {
        console.log(JSON.stringify(error.response.data, null, 2));
      }
    }
  } else if (error.request) {
    console.log('\nNo response received:');
    console.log(`Code: ${error.code}`);
    console.log(`Message: ${error.message}`);
  } else {
    console.log('\nError:');
    console.log(error.message);
  }
  
  console.log('='.repeat(80) + '\n');
};

export { logApiRequest, logApiResponse, logApiError };
