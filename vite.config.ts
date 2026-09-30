import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'landslideriskmanagment-sih.onrender.com', // Your Render host
      'all'                                      // Or set to 'all' to allow any host on Render
    ]
  }
});