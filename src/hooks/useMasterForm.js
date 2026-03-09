import { useState } from 'react';

export const useMasterForm = (initialFormState, initialTableData = []) => {
    const [formData, setFormData] = useState(initialFormState);
    const [tableData, setTableData] = useState(initialTableData);
    const [selectedId, setSelectedId] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleRowClick = (row) => {
        setFormData(row);
        setSelectedId(row.id);
    };

    const handleClear = () => {
        setFormData(initialFormState);
        setSelectedId(null);
    };

    const handleSave = () => {
        if (selectedId) {
            setTableData(prev => prev.map(row => row.id === selectedId ? { ...row, ...formData } : row));
        } else {
            setTableData(prev => [...prev, { ...formData, id: Date.now() }]);
        }
        handleClear();
    };

    const handleDelete = () => {
        if (selectedId) {
            setTableData(prev => prev.filter(row => row.id !== selectedId));
            handleClear();
        } else {
            alert('Please select a row from the table to delete.');
        }
    };

    return {
        formData,
        setFormData,
        tableData,
        setTableData,
        selectedId,
        handleChange,
        handleRowClick,
        handleClear,
        handleSave,
        handleDelete
    };
};
