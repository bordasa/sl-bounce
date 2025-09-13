import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

console.log('main.tsx is loading...');

// Add basic styles
const style = document.createElement('style');
style.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #ffffff;
  }
  
  #root {
    min-height: 100vh;
  }
`;
document.head.appendChild(style);

const rootElement = document.getElementById('root');
console.log('Root element found:', !!rootElement);

if (rootElement) {
  console.log('Creating React root...');
  const root = createRoot(rootElement);
  
  console.log('Rendering App...');
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  console.log('App should be rendered');
} else {
  console.error('Root element not found!');
  document.body.innerHTML = '<h1>Error: Root element not found</h1>';
}