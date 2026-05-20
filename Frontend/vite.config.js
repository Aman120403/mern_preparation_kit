import { defineConfig } from 'vite'//Think of it as a wrapper for Vite settings.
import react from '@vitejs/plugin-react' //( This imports the React plugin for Vite.
//It enables JSX support, fast refresh, react compilation
//Without this plugin, React code won't run properly in Vite.)

export default defineConfig({
  //Vite reads this file automatically when project starts.
  plugins: [react()], //This tells Vite: Use React plugin in this project

  server: { //This configures the Vite development server
    proxy: { //Proxy acts like a middleman between: frontend and backend
      '/api': {
        target: 'http://localhost:8000',
        //Frontend request: /api/users -  becomes : http://localhost:8000/api/users
        changeOrigin: true,//Changes request origin header to backend target.
        secure: false,
      },
    },
  },
})

// This config tells Vite's development server to intercept requests starting with /api and forward them 
// to your backend — solving the most common local development headache: CORS errors.