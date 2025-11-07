import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

interface Workspace {
  _id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  discount?: number;
  location: string; // ✅ replaced category with location
  cta_text: string;
  cta_url: string;
}

interface WorkspaceCardProps {
  workspace: Workspace;
  onCtaClick?: () => void;
}

export default function WorkspaceCard({ workspace, onCtaClick }: WorkspaceCardProps) {
  const discountedPrice =
    workspace.discount && workspace.discount > 0
      ? workspace.price - (workspace.price * workspace.discount) / 100
      : workspace.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Discount Badge */}
      {workspace.discount && workspace.discount > 0 && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-black/80 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          {workspace.discount}% OFF
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={workspace.image_url}
          alt={workspace.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
            {workspace.title}
          </h3>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4 mr-1 text-red-500" />
          <span className="font-medium">{workspace.location}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {workspace.description}
        </p>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div>
            <p className="text-sm text-gray-500">Starting from</p>
            <div className="flex items-baseline gap-2">
              {workspace.discount && workspace.discount > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{workspace.price.toLocaleString()}
                </span>
              )}
              <span className="text-2xl font-bold text-gray-900">
                ₹{discountedPrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">/month</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href={workspace.cta_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCtaClick}
          className="w-full block bg-gradient-to-r from-black/80 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
        >
          {workspace.cta_text || 'Learn More'}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Border Animation */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-400 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
    </motion.div>
  );
}
