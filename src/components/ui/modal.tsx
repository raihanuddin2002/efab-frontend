'use client';

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    disabled?: boolean;
};

export default function Modal({ isOpen, onClose, children, disabled }: ModalProps) {
    useEffect(() => {
        // Prevent background scroll when modal is open
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Mount portal to body
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
                className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <FontAwesomeIcon
                    icon={faClose}
                    className='absolute top-3 right-4 text-gray-500 hover:text-black cursor-pointer'
                    onClick={onClose}
                    aria-disabled={disabled}
                />
                {children}
            </div>
        </div>,
        document.body
    );
}
