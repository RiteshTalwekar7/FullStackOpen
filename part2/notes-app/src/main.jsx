import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "The browser can execute only javascript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of http protocol",
    important: true
  }
];


createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)
