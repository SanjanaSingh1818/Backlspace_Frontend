import Navbar from '../components/Navbar';
import About from '../components/About';


export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <About />
      </div>
    
    </div>
  );
}
