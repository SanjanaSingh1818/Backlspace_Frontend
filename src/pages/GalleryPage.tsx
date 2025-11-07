import Navbar from '../components/Navbar';
import Gallery from '../components/Gallery';


export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Gallery />
      </div>

    </div>
  );
}
