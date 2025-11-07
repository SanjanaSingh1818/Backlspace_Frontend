import Navbar from '../components/Navbar';
import Amenities from '../components/Amenities';


export default function AmenitiesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Amenities />
      </div>
   
    </div>
  );
}
