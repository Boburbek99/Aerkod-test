import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
export default defineConfig(() => {
  const env = dotenv.config().parsed;
  return {
    plugins: [
      vue({
        script: {
          defineModel: true,
          propsDestructure: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    define: {
      'process.env': Object.keys(env).reduce((acc, key) => {
        acc[key] = env[key];
        return acc;
      }, {}),
    },
  }
});
