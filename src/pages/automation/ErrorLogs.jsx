import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { AlertTriangle, Database, Shield } from 'lucide-react';

const columns = [
    { key: 'User_Name', label: 'User Name' },
    { key: 'System_Name', label: 'System' },
    { key: 'Execution_Time', label: 'Execution Time' },
    { key: 'Error_MSG', label: 'Error Message' },
];

const emptyForm = {
    Id: '', User_Id: '',
    Execution_Time: '',
    User_Name: '', System_Name: '',
    Created_Date: new Date().toISOString().slice(0, 10),
    Error_MSG: '', SQL_query: '',
};

const ErrorLogs = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false);
    const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('errorLogs', editId, form); else addRecord('errorLogs', form); close(); };

    return (
        <div className="p-6">
            <PageHeader title="Error Logs" description="System-level error and audit log entries" icon={AlertTriangle} />
            <DataTable columns={columns} data={state.errorLogs || []} onAdd={openAdd} addLabel="New Log Entry" onEdit={openEdit} onDelete={(r) => deleteRecord('errorLogs', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Log Entry' : 'New Log Entry'} size="lg">
                <div className="p-6 space-y-6">
                    <FormContainer title="User & System" icon={Database}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Log ID" id="Id" value={form.Id} onChange={(e) => set('Id', e.target.value)} required />
                            <FormField label="User Name" id="User_Name" value={form.User_Name} onChange={(e) => set('User_Name', e.target.value)} required />
                            <FormField label="System Name" id="System_Name" value={form.System_Name} onChange={(e) => set('System_Name', e.target.value)} />
                            <FormField label="Execution Time" id="Execution_Time" type="datetime-local" value={form.Execution_Time} onChange={(e) => set('Execution_Time', e.target.value)} />
                            <FormField label="Created Date" id="Created_Date" type="date" value={form.Created_Date} onChange={(e) => set('Created_Date', e.target.value)} />
                        </div>
                    </FormContainer>
                    <FormContainer title="Error Details" icon={Shield}>
                        <div className="grid grid-cols-1 gap-4">
                            <FormField label="Error Message" id="Error_MSG" value={form.Error_MSG} onChange={(e) => set('Error_MSG', e.target.value)} />
                            <FormField label="SQL Query" id="SQL_query" value={form.SQL_query} onChange={(e) => set('SQL_query', e.target.value)} />
                        </div>
                    </FormContainer>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save Log'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default ErrorLogs;
