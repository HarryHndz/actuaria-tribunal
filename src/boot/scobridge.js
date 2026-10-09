import axios from 'axios';

const config = {
  baseURL: `${process.env.API_SCO}`,
  timeout: 60000,
};

// if (process.env.PROD) {
//   const token = document.head.querySelector('meta[name="csrf-token"]');
//   localStorage.setItem('token', token.content);

//   if (token) {
//     config = {
//       baseURL: `${window.location.protocol}//${window.location.host}/api/`,
//       headers: {
//         'X-Requested-With': 'XMLHttpRequest',
//         'X-CSRF-TOKEN': token.content,
//       },
//     };
//   }
// }

// if (process.env.DEV) {
//   const token = localStorage.getItem('token');
//   if (token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   }
// }

export default axios.create(config);
