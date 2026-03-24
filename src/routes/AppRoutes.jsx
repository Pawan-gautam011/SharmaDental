import {  Routes, Route } from 'react-router-dom';
import { Home } from '../components/pages/Home';
import About from '../components/pages/About';
import Services from '../components/pages/Services';
import Contact from '../components/pages/Contact';
import { Gallery } from '../components/pages/Gallery';


export default function AppRoutes() {
  return (
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />

      </Routes>
    
  );
}