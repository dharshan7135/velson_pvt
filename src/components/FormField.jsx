import React from 'react';

const FormField = ({ label, required, children, error, className = '' }) => {
  return (
    <div className={`form-field-group ${className}`}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      {children}
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export const FormContainer = ({ children, columns = 2, className = '' }) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };
  return (
    <div className={`grid ${gridCols[columns] || gridCols[2]} gap-4 ${className}`}>
      {children}
    </div>
  );
};

export const FormActions = ({ onSave, onCancel, saveLabel = 'Save', saving = false }) => {
  return (
    <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-semibold rounded-lg border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 transition-all duration-200"
        >
          Cancel
        </button>
      )}
      {onSave && (
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#0097A7] text-white hover:bg-[#007a87] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {saving ? 'Saving...' : saveLabel}
        </button>
      )}
    </div>
  );
};

export default FormField;
