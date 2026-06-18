import os from 'os';

console.log('System Information:');
console.log('Operating System:', os.type());
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('CPU Cores:', os.cpus().length);
console.log('Total Memory:', (os.totalmem() / (1024 ** 3)).toFixed(2), 'GB');
console.log('Free Memory:', (os.freemem() / (1024 ** 3)).toFixed(2), 'GB'); 
console.log('Uptime:', (os.uptime() / 3600).toFixed(2), 'hours');
console.log('Home Directory:', os.homedir());

//informacion adicional
console.log('Hostname:', os.hostname());   
console.log('Network Interfaces:', os.networkInterfaces());
console.log('User Info:', os.userInfo());
