// 同查找 _U 一样, 查找 KievRPSSecAuth 的值并替换下方的xxx
const KievRPSSecAuth = 'FABiBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACCqNajGcxJalIAT2DV2z69EvMpMdmtS+JoAj/kT0w/pDovdZDbgpwusLgnEciiz0Uv91mfpxEn7coc/6BQHzqVOpJVzOMGODTxHUmygS/sVrFl7HTGc6A82z46ldqdXP74l1hjIvbx2E6e0/OhmvBRiHw0PYccW5mQ7UZnpjkjdGRmlu2RZ52wRlp1CVY1XCACUiiFZcQHp6FlF4VvTsMAdZGzf9Sr09j/5e7d/FKfl87FXk9NhTNiXKFYOaHBk/M3i5hTeCP0jMmn59WL3HoM3dFzifgHfLMhQFDxjQiV5LtfzpJgEfZJl3yoNKlRxgVC56C4Sr5qc7Tu2g9ECeV15UadwhUf3VlYBcNyj0OZfKxBtNgmWH1KeSAwRqXtpXNFZ5tiZg4hNT/Tv9tEf2zJPR+NnpPDvtQFMy3vOLCL/EKUrVBS816fZ3z3gc3r+Q/Ib8mAcSPzB3d8435wUgbcgyEKrh2awce/lxQA7nfgUqRtl+rI2cGTZ+y1VbJzpXQmP+H9icpi8cEz4uWUPnZMMmQasCOJlaocQ2oXmt3JqNGkFkNa8ufY7XRqVWv1B4NEsiCaLK04c5m/xnivwDO1Yms9SJo3i/4CPAGcSrASOWp1bmXjLNNI4TGHfmI0Wuwu1SOSMG8bY9ucHkOB68HhJG+v1XFd03Ul6/e1caj+tBgWUZnKYvUdWEmjz0jqb1Ad8ZlER5ttaOtC2v2KX+dTXmEJ35EszQ/suN3mgNIjTJUQQqwiKoKw7isbrCyJmUImQIZB9vSx8TGi6G7gyyX+4Ofv+DoEvRN7Wf6J/xlu4foFN9EyBpZrf0V1XHP2gGY/7li3wUE1Chy9d+XCgfk8TKRwrXK/0gEdWD9Jskp4hU9egJBREmIGW6bRxMo70OyQ0X+dDL6iUxdEIy2l6TAzE7T5bD609Mt5mGqJHpmhW+2xODqfwDh1/D7KN21ki1XoKQ0FLVycZXnqNkQ/z1L1I0tfKft2Xs0fScTeFk82NXtXTzRjMaB9rpfVBEDzT+FNG+pKs77YIXP/suc8FcpOReGOpKt+JUtM5s3uczL6TPJ1VWR5aNv+7GFCrckvXYmHxabP6kLdqYOTmdElrDXuHi7CXzkdriNlDj52OdzivuENEDvbnQbViGoJ6BL0+wPB/VdGhcvCmi5faR65T6TJVLb1Ob/IgXi+6mktzIFZAcMonxr2d5VPPiy4xEQyU456Zt67UPWFISooPsvcJbDszB6NytYbk959BZt+CSqefolDTWD3KKMM+Oza0YUPxE+IPZpvQIPeCUy1xyVF82tPHg2ui6QIpMC7unp3f6YwMvYiTWLw8mU/0e+W1CBMTCNx5aETpIyuWkARgzJRmd7qn2a+lJroy7ap15puifUiKbXg31v7eOqegp8IyYX4B4JM+HEgOKfgx8UbYUAC/BKag6wQjWkJDm9ImNPL9+4OQJ';
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
