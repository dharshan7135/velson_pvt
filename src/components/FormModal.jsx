import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const FormModal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    const overlayRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose?.(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-6xl',
    };

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={(e) => { if (e.target === overlayRef.current) onClose?.(); }}
        >
            <div className={`bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} mx-4 overflow-hidden animate-scale-in`}>
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0097A7] to-[#00838F] px-6 py-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-1 transition-all cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                {/* Body */}
                <div className="max-h-[70vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FormModal;
