// src/reportWebVitals.js

import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);  // Cumulative Layout Shift
    getFID(onPerfEntry);  // First Input Delay
    getFCP(onPerfEntry);  // First Contentful Paint
    getLCP(onPerfEntry);  // Largest Contentful Paint
    getTTFB(onPerfEntry); // Time to First Byte
  }
};

export default reportWebVitals;
