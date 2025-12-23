import React from 'react';
import { Sparkles, Zap, Heart, Star } from 'lucide-react';

const GradientShowcase = () => {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-3xl font-bold gradient-text text-center mb-8">
        Enhanced Gradient Theme System
      </h2>
      
      {/* Gradient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="gradient-card p-6 text-center">
          <Sparkles className="w-8 h-8 mx-auto mb-4 text-blue-500" />
          <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Professional
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Corporate gradient themes
          </p>
        </div>
        
        <div className="gradient-card p-6 text-center">
          <Zap className="w-8 h-8 mx-auto mb-4 text-yellow-500" />
          <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Dynamic
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Animated backgrounds
          </p>
        </div>
        
        <div className="gradient-card p-6 text-center">
          <Heart className="w-8 h-8 mx-auto mb-4 text-red-500" />
          <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Responsive
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Adapts to all devices
          </p>
        </div>
        
        <div className="gradient-card p-6 text-center">
          <Star className="w-8 h-8 mx-auto mb-4 text-purple-500" />
          <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Accessible
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            High contrast support
          </p>
        </div>
      </div>
      
      {/* Gradient Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="btn-gradient-primary">
          Primary Action
        </button>
        <button className="btn-gradient-secondary">
          Secondary Action
        </button>
      </div>
      
      {/* Theme Features */}
      <div className="text-center">
        <p className="text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
          ✨ Professional gradient themes for both light and dark modes
        </p>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Automatically adapts to user preferences with smooth transitions
        </p>
      </div>
    </div>
  );
};

export default GradientShowcase;
