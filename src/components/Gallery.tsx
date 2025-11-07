import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const galleryImages = [
  {
    url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
    caption: 'Modern Office Spaces',
    category: 'workspace',
  },
  {
    url: 'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg',
    caption: 'Collaborative Areas',
    category: 'workspace',
  },
  {
    url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    caption: 'Meeting Rooms',
    category: 'workspace',
  },
  {
    url: 'https://images.pexels.com/photos/1181607/pexels-photo-1181607.jpeg',
    caption: 'Private Cabins',
    category: 'workspace',
  },
  {
    url: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg',
    caption: 'Breakout Zones',
    category: 'amenities',
  },
  {
    url: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg',
    caption: 'Conference Hall',
    category: 'workspace',
  },
  {
    url: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
    caption: 'Event Space',
    category: 'events',
  },
  {
    url: 'https://images.pexels.com/photos/1181443/pexels-photo-1181443.jpeg',
    caption: 'Hot Desk Area',
    category: 'workspace',
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section id="gallery" className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
           See Our <span className="text-red-600"> Work Places</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-black/80 to-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a virtual tour of our stunning workspace and amenities
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg aspect-square"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-lg">{image.caption}</p>
                  <p className="text-red-300 text-sm">{image.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="text-center mt-4">
                <p className="text-white text-xl font-semibold">{selectedImage.caption}</p>
                <p className="text-red-300">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
