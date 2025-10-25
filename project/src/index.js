import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom"; 
import './index.css';
// import App from './App';
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/AboutUs';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Discover from './pages/Discover';
import MoviePlaylist from './pages/MoviePlaylist';
import Settings from './pages/Settings';
import "./css/Global.css";




export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Layout />}>

          </Route>
          <Route index element={<Home />} />

          <Route path="about" element={<About />} />
          <Route path="Blog" element={<Blog />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="Discover" element={<Discover />} />
          <Route path="MoviePlaylist" element={<MoviePlaylist />} />
          <Route path="Settings" element={<Settings />} />


        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
