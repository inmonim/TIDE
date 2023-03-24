/** @type {import('next').NextConfig} */
// const path = require('path');
// const withImages = require('next-images');

module.exports = {
  reactStrictMode: true,
  output: 'standalone'
  // async rewrites() {
  //   if (process.env.NODE_ENV === 'production') {
  //     return [
  //       {
  //         source: process.env.PRODUCTION_JAVA_SERVER_PATH,
  //         destination: process.env.PRODUCTION_JAVA_SERVER_URL
  //       }
  //     ];
  //   } else {
  //     return [
  //       {
  //         source: process.env.JAVA_SERVER_PATH,
  //         destination: process.env.JAVA_SERVER_URL
  //       }
  //     ];
  //   }
  // }
};
