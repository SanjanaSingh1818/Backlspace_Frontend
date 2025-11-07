import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logo from "../assets/white-logo-bg.png";


export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
  {/* Logo Image */}
<img src={logo} alt="Backspace Logo" className="h-12 w-auto mb-4 object-contain" />


  <p className="text-gray-400 mb-4">
    Your Space to Think, <br /> Collaborate, and Grow.
  </p>

  <div className="flex gap-3">
    <a
      href="#"
      className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300"
    >
      <Facebook className="w-5 h-5" />
    </a>
    <a
      href="#"
      className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300"
    >
      <Twitter className="w-5 h-5" />
    </a>
    <a
      href="#"
      className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300"
    >
      <Instagram className="w-5 h-5" />
    </a>
    <a
      href="#"
      className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300"
    >
      <Linkedin className="w-5 h-5" />
    </a>
  </div>
</div>


          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('workspaces')}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Workspace Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('amenities')}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Amenities
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Testimonials
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Managed Office</li>
              <li>Hot Desk</li>
              <li>Dedicated Desk</li>
              <li>Private Cabin</li>
              <li>Meeting Rooms</li>
              <li>Virtual Office</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>B.K. Tower, H-65,  <br/>Sector-63, Noida,  <br/> Uttar Pradesh 201301</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+91 9999385375</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>info@backspace.co.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Backspace Coworking and Managed Offices. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
