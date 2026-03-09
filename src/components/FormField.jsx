import React from 'react';
import { AlertCircle } from 'lucide-react';

const FormField = ({
    label, id, type = 'text', required, error, register, placeholder,
    className = '', disabled, ...props
}) => {
    return (
        <div className={`form-field-group ${className}`}>
            <label htmlFor={id} className="form-label">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <div className="relative">
                {type === 'textarea' ? (
                    <textarea
                        id={id}
                        className={`form-input resize-none ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}`}
                        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
                        rows={3}
                        disabled={disabled}
                        {...(register ? register : {})}
                        {...props}
                    />
                ) : (
                    <input
                        id={id}
                        type={type}
                        className={`form-input ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}`}
                        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
                        disabled={disabled}
                        {...(register ? register : {})}
                        {...props}
                    />
                )}
            </div>
            {error && (
                <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormField;
