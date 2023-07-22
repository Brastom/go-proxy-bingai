// 同查找 _U 一样, 查找 KievRPSSecAuth 的值并替换下方的xxx
const KievRPSSecAuth = 'FABiBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACJjMvvgL8gDDIAQyUp1AUF7I9P4N9HMkxuZd0fYi9/DBVBZ+kEROSDOf14SqIEP06GSDj+wfTDpu4W7lpFs321fQNB9/mHclrxgOtrmFYfv4gu2WPeV1RH9gdkARlpjd2ziNyUiFzIFrgirvwADfKp6CK7xWgO/+I2RiRf7fE8aPCSajXMdN38uB0XEO91ghHRRTcApE04M+Sf5+P+YUiXcaVVJJ+5Fo4QcWo3iK0Yyr4xZfcSDKLRt1q1giC6HaUTJQD/G4qJ5FbZyUloFVaMTvQrHP727qsVzYIM65h8aJ8R/rmmnKJPZ2Y7huXuru9OGSFaEkkcQqJRJQdiKxRXnuGtVwYl5jNkPpAYwK3q4CAio4ygEeCEBAu26yZU1Y2/gE6t8bRe/RujkczLa6jMEQG+RmUtP15DuVaSTWIfwGmSM85Gx4OhCeLmgrsDayREWrNy68GS6j+GPFM9oR9TDkbN3paurLNqwAorVfQqYFXePo6ORkvCPtsmkea7xiMCvB14S2VXhd+nsxq/kTvYRzYT7k2hKBnPsCF1aZ0HrXFXTiDVgN/28081eRMvoLxPfu6fOEifvZ1hPLLAR2bCJR6kccmThpz617OJ/Xa6efaEMDFrL2evFLfJw4PjJ8k6cxT3eQW8ByNRbvU1EA3dJSBaSO/ZEO/97dESb6htymm7hhr52OIt9/xrVgnUvajU1fw/KwDpKc6Fpgbmw8JIOJy3SrUzXvEexOIOw3WxZiI25trcO2thukdj/kayRzxe5oLcCF5ZEEiZIRIscIRxtUdnKtg3wMihdcq8F0C7Wsugxw+w3r3+PwAliulJbhCJXJNvSElmNC5cWcS6QicPSfA/iIIHCGC6FtrlSHCoK7eigb144w92pcRqSpqz2KfsTUXgARf8pvunOOdOnhBeQw74RTOzzoRYDNTtQMiKTk0SK+x/u4Kh+KQ1vVwZAoQdEmCycaL+gwZxkoIM2RO0x53fbdKg2e7bYXqopDC2tW0SdEML68moSDWh73y+E1NFMRlPqtRHDbn6VcAc5zAw/D6PfY6mFcCsGDGJ2auFWi2lsbJmCmvgD0ZapCr7VvomIU6W7dio6mqGPtkRmulBKgr73+L/wDXGy10/Ap2zix3j/s3qtcs+560uvZ9gl7m/m6xYYEoBMgtbDpst2iHkwYvZuBCkMtne4MohC7wStDhgbcUy/jsdO/AV3b2OC+5aKSB8HpRcdMdo9SucQaBq5Ebik9w04ZHWTDC8MiogpNQuZgUbLcPnG3L86jvJPcI5Uu40hr60TNoIcEguGGD8aUFL6cfNV9XOKNwG/wPb6Q7SVdKkFV7oY60lkjUvXoBMWZ1xqSpXCVFe8k+6ubNbs528+bGXwkS4o7IIjZq7PZhIdsB43RbQJFagcZJ9Lc6gijRQIozLsZ79gUALQw3MrvNZOf5cYmcBKf18eQtD9+';
const SYDNEY_ORIGIN = 'https://sydney.bing.com';
const KEEP_REQ_HEADERS = [
  'accept',
  'accept-encoding',
  'accept-language',
  'connection',
  'cookie',
  'upgrade',
  'user-agent',
  'sec-websocket-extensions',
  'sec-websocket-key',
  'sec-websocket-version',
  'x-request-id',
  'content-length',
  'content-type',
  'access-control-request-headers',
  'access-control-request-method',
];
const IP_RANGE = [
  ['3.2.50.0', '3.5.31.255'], //192,000
  ['3.12.0.0', '3.23.255.255'], //786,432
  ['3.30.0.0', '3.33.34.255'], //205,568
  ['3.40.0.0', '3.63.255.255'], //1,572,864
  ['3.80.0.0', '3.95.255.255'], //1,048,576
  ['3.100.0.0', '3.103.255.255'], //262,144
  ['3.116.0.0', '3.119.255.255'], //262,144
  ['3.128.0.0', '3.247.255.255'], //7,864,320
];

/**
 * 随机整数 [min,max)
 * @param {number} min
 * @param {number} max
 * @returns
 */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

/**
 * ip 转 int
 * @param {string} ip
 * @returns
 */
const ipToInt = (ip) => {
  const ipArr = ip.split('.');
  let result = 0;
  result += +ipArr[0] << 24;
  result += +ipArr[1] << 16;
  result += +ipArr[2] << 8;
  result += +ipArr[3];
  return result;
};

/**
 * int 转 ip
 * @param {number} intIP
 * @returns
 */
const intToIp = (intIP) => {
  return `${(intIP >> 24) & 255}.${(intIP >> 16) & 255}.${(intIP >> 8) & 255}.${intIP & 255}`;
};

const getRandomIP = () => {
  const randIndex = getRandomInt(0, IP_RANGE.length);
  const startIp = IP_RANGE[randIndex][0];
  const endIp = IP_RANGE[randIndex][1];
  const startIPInt = ipToInt(startIp);
  const endIPInt = ipToInt(endIp);
  const randomInt = getRandomInt(startIPInt, endIPInt);
  const randomIP = intToIp(randomInt);
  return randomIP;
};

/**
 * home
 * @param {string} pathname
 * @returns
 */
const home = async (pathname) => {
  const baseUrl = 'https://raw.githubusercontent.com/adams549659584/go-proxy-bingai/master/';
  let url;
  // if (pathname.startsWith('/github/')) {
  if (pathname.indexOf('/github/') === 0) {
    url = pathname.replace('/github/', baseUrl);
  } else {
    url = baseUrl + 'cloudflare/index.html';
  }
  const res = await fetch(url);
  const newRes = new Response(res.body, res);
  if (pathname === '/') {
    newRes.headers.delete('content-security-policy');
    newRes.headers.set('content-type', 'text/html; charset=utf-8');
  }
  return newRes;
};

export default {
  /**
   * fetch
   * @param {Request} request
   * @param {*} env
   * @param {*} ctx
   * @returns
   */
  async fetch(request, env, ctx) {
    const currentUrl = new URL(request.url);
    // if (currentUrl.pathname === '/' || currentUrl.pathname.startsWith('/github/')) {
    if (currentUrl.pathname === '/' || currentUrl.pathname.indexOf('/github/') === 0) {
      return home(currentUrl.pathname);
    }
    const targetUrl = new URL(SYDNEY_ORIGIN + currentUrl.pathname + currentUrl.search);

    const newHeaders = new Headers();
    request.headers.forEach((value, key) => {
      // console.log(`old : ${key} : ${value}`);
      if (KEEP_REQ_HEADERS.includes(key)) {
        newHeaders.set(key, value);
      }
    });
    newHeaders.set('host', targetUrl.host);
    newHeaders.set('origin', targetUrl.origin);
    newHeaders.set('referer', 'https://www.bing.com/search?q=Bing+AI');
    const randIP = getRandomIP();
    // console.log('randIP : ', randIP);
    newHeaders.set('X-Forwarded-For', randIP);
    newHeaders.set('Cookie', 'KievRPSSecAuth='+KievRPSSecAuth+';');
    const oldUA = request.headers.get('user-agent');
    const isMobile = oldUA.includes('Mobile') || oldUA.includes('Android');
    if (isMobile) {
      newHeaders.set(
        'user-agent',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.7 Mobile/15E148 Safari/605.1.15 BingSapphire/1.0.410427012'
      );
    } else {
      newHeaders.set('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35');
    }

    // newHeaders.forEach((value, key) => console.log(`${key} : ${value}`));
    const newReq = new Request(targetUrl, {
      method: request.method,
      headers: newHeaders,
      body: request.body,
    });
    // console.log('request url : ', newReq.url);
    const res = await fetch(newReq);
    return res;
  },
};
