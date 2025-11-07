import Navbar from '../components/Navbar';
import Contact from '../components/Contact';


export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Contact />
      </div>

    </div>
  );
}
