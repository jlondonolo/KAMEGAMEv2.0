import React from 'react';

const ParticlesBackground = () => {
    return (
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute h-2 w-2 rounded-full bg-blue-400" style={{top: '10%', left: '10%', boxShadow: '0 0 20px 2px rgba(66, 135, 245, 0.7)', animation: 'float 8s ease-in-out infinite'}}></div>
            <div className="absolute h-3 w-3 rounded-full bg-purple-400" style={{top: '20%', left: '85%', boxShadow: '0 0 20px 2px rgba(149, 76, 233, 0.7)', animation: 'float 10s ease-in-out infinite'}}></div>
            <div className="absolute h-2 w-2 rounded-full bg-cyan-400" style={{top: '70%', left: '20%', boxShadow: '0 0 20px 2px rgba(34, 211, 238, 0.7)', animation: 'float 6s ease-in-out infinite'}}></div>
            <div className="absolute h-2 w-2 rounded-full bg-indigo-400" style={{top: '40%', left: '90%', boxShadow: '0 0 20px 2px rgba(129, 140, 248, 0.7)', animation: 'float 12s ease-in-out infinite'}}></div>
            <div className="absolute h-3 w-3 rounded-full bg-blue-500" style={{top: '90%', left: '40%', boxShadow: '0 0 20px 2px rgba(59, 130, 246, 0.7)', animation: 'float 9s ease-in-out infinite'}}></div>
            <div className="absolute h-1 w-1 rounded-full bg-purple-500" style={{top: '30%', left: '60%', boxShadow: '0 0 20px 2px rgba(139, 92, 246, 0.7)', animation: 'float 7s ease-in-out infinite'}}></div>
        </div>
    );
};

export default ParticlesBackground;