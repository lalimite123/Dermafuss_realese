import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandableGalleryProps {
    images: string[];
    className?: string;
}

export const ExpandableGallery: React.FC<ExpandableGalleryProps> = ({ images = [
    '/galerie1.jpg',
    '/galerie2.jpg',
    '/galerie3.jpg',
    '/galerie4.jpg',
    '/galerie5.jpg',
    '/landing1.jpg',
    '/landing2.jpg',
    '/landing3.jpg',
], className = '' }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openImage = (index: number) => {
        setSelectedIndex(index);
    };

    const closeImage = () => {
        setSelectedIndex(null);
    };

    const goToNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % images.length);
        }
    };

    const goToPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
        }
    };

    useEffect(() => {
        if (selectedIndex !== null) {
            const onKey = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    setSelectedIndex(null);
                } else if (e.key === 'ArrowRight') {
                    setSelectedIndex((prev) => prev !== null ? (prev + 1) % images.length : prev);
                } else if (e.key === 'ArrowLeft') {
                    setSelectedIndex((prev) => prev !== null ? (prev - 1 + images.length) % images.length : prev);
                }
            };
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', onKey);
            return () => {
                window.removeEventListener('keydown', onKey);
                document.body.style.overflow = '';
            };
        }
    }, [selectedIndex, images.length]);

    const getFlexValue = (index: number) => {
        if (hoveredIndex === null) {
            return 1;
        }
        return hoveredIndex === index ? 2 : 0.5;
    };

    return (
        <div className={className}>
            {/* Horizontal Expandable Gallery */}
            <div className="flex gap-2 h-96 w-full">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        className="relative cursor-pointer overflow-hidden rounded-md"
                        style={{ flex: 1 }}
                        animate={{ flex: getFlexValue(index) }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => openImage(index)}
                    >
                        <img
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <motion.div
                            className="absolute inset-0 bg-black"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredIndex === index ? 0 : 0.3 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Expanded View Modal */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={closeImage}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
                            onClick={closeImage}
                        >
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Previous Button */}
                        {images.length > 1 && (
                            <button
                                className="absolute left-4 z-10 text-white hover:text-gray-300 transition-colors"
                                onClick={goToPrev}
                            >
                                <svg
                                    className="w-10 h-10"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                        )}

                        {/* Image */}
                    <motion.div
                        className="relative max-w-5xl max-h-[90vh] w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                            <motion.img
                                key={selectedIndex}
                                src={images[selectedIndex]}
                                alt={`Gallery image ${selectedIndex + 1}`}
                                className="w-full h-full object-contain rounded-xl shadow-2xl"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                drag="x"
                                dragElastic={0.1}
                                onDragEnd={(e, info) => {
                                    if (info.offset.x < -40) {
                                        setSelectedIndex((prev) => prev !== null ? (prev + 1) % images.length : prev);
                                    } else if (info.offset.x > 40) {
                                        setSelectedIndex((prev) => prev !== null ? (prev - 1 + images.length) % images.length : prev);
                                    }
                                }}
                            />
                        </motion.div>

                        {/* Next Button */}
                        {images.length > 1 && (
                            <button
                                className="absolute right-4 z-10 text-white hover:text-gray-300 transition-colors"
                                onClick={goToNext}
                            >
                                <svg
                                    className="w-10 h-10"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        )}

                        <div className="absolute bottom-4 left-0 right-0 px-4 flex flex-col items-center gap-3">
                            <div className="text-white text-xs bg-white/10 backdrop-blur-sm px-3 py-1 rounded-md">
                                {selectedIndex + 1} / {images.length}
                            </div>
                            <div className="max-w-5xl w-full flex gap-2 overflow-x-auto py-1">
                                {images.map((src, i) => (
                                    <button
                                        key={i}
                                        onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                                        className={`h-14 w-20 flex-shrink-0 rounded-md overflow-hidden border ${selectedIndex === i ? 'border-primary' : 'border-white/30'}`}
                                    >
                                        <img src={src} alt={`Thumb ${i + 1}`} className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Example Usage
export function Component() {
    const images = [
    "https://images.unsplash.com/photo-1709884735646-897b57461d61?q=80&w=3628&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1502085671122-2d218cd434e6?q=80&w=3626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];
    return (
        <div className="min-h-screen dark:bg-black bg-white flex items-center justify-center p-8">
            <ExpandableGallery images={images} className="w-3/4 max-w-7xl" />
        </div>
    );
}