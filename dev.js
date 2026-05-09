'use strict';
const { spawn } = require('child_process');
const bs        = require('browser-sync').create();

const server = spawn(process.execPath, ['server.js'], { stdio: 'inherit' });

setTimeout(() => {
  bs.init({
    proxy:  'http://localhost:3000',
    port:   4000,
    open:   true,
    notify: false,
    files:  ['views/**/*', 'public/**/*', 'config.yml'],
  });
}, 800);

process.on('SIGINT', () => { server.kill(); process.exit(); });
