import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import { ListTree, Database, Package, Cog } from 'lucide-react';
const columns = [{ key: 'Booking_Code', label: 'Booking' },{ key: 'Assembly_part_Name', label: 'Assembly' },{ key: 'Child_Part_Name', label: 'Child Part' },{ key: 'Qty', label: 'Qty' },{ key: 'Status', label: 'Status' }];
const emptyForm = {
    RowId: '', Ref_RowID: '', Customer_Id: '', Customer_Booking_id: '', Vehicle_Model_Id: '', Model_Type_Id: '', Assembly_Part_Id: '', Child_Part_Id: '', Booking_id: '',
    Booking_Code: '', Serial_No: '', Model_No_Id: '', Model_No: '', Assembly_part_No: '', Child_part_No: '', Route_card_No: '', Service_job_No: '',
    Deleted_Date: '', Created_date: new Date().toISOString().slice(0, 10),
    Customer_Name: '', Vehicle_Model_Name: '', Model_Type_Name: '', Assembly_part_Name: '', Child_Part_Name: '',
    Total_Qty: 0, Qty: 0, Stock_Qty: 0, Require_Qty: 0, UOM: '', Vehicle_Per_Qty: 0,
    Status: 'A', created_By: '', Deleted_By: '', Deleted_System: '',
    P1: '', P2: '', P3: '', P4: '', P5: '', P6: '', P7: '',
};
const MainIndexDetails = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false); const [form, setForm] = useState(emptyForm); const [editId, setEditId] = useState(null);
    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setModal(true); };
    const close = () => setModal(false); const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const save = () => { if (editId) updateRecord('mainIndexDetails', editId, form); else addRecord('mainIndexDetails', form); close(); };
    return (
        <div className="p-6">
            <PageHeader title="Main Index Page Details" description="Assembly and child part BOM details with stock requirements" icon={ListTree} />
            <DataTable columns={columns} data={state.mainIndexDetails || []} onAdd={openAdd} addLabel="Add Detail" onEdit={openEdit} onDelete={(r) => deleteRecord('mainIndexDetails', r.id)} />
            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Detail' : 'New Index Detail'} size="xl">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormContainer title="Booking & Model" icon={Database}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Booking Code" id="Booking_Code" value={form.Booking_Code} onChange={(e) => set('Booking_Code', e.target.value)} required />
                                <FormField label="Customer Name" id="Customer_Name" value={form.Customer_Name} onChange={(e) => set('Customer_Name', e.target.value)} />
                                <FormField label="Vehicle Model" id="Vehicle_Model_Name" value={form.Vehicle_Model_Name} onChange={(e) => set('Vehicle_Model_Name', e.target.value)} required />
                                <FormField label="Model No" id="Model_No" value={form.Model_No} onChange={(e) => set('Model_No', e.target.value)} required />
                                <FormField label="Model Type" id="Model_Type_Name" value={form.Model_Type_Name} onChange={(e) => set('Model_Type_Name', e.target.value)} />
                                <FormField label="Route Card No" id="Route_card_No" value={form.Route_card_No} onChange={(e) => set('Route_card_No', e.target.value)} />
                            </div>
                        </FormContainer>
                        <FormContainer title="Parts & BOM" icon={Cog}>
                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Assembly Part" id="Assembly_part_Name" value={form.Assembly_part_Name} onChange={(e) => set('Assembly_part_Name', e.target.value)} />
                                <FormField label="Assembly Part No" id="Assembly_part_No" value={form.Assembly_part_No} onChange={(e) => set('Assembly_part_No', e.target.value)} />
                                <FormField label="Child Part" id="Child_Part_Name" value={form.Child_Part_Name} onChange={(e) => set('Child_Part_Name', e.target.value)} />
                                <FormField label="Child Part No" id="Child_part_No" value={form.Child_part_No} onChange={(e) => set('Child_part_No', e.target.value)} />
                            </div>
                        </FormContainer>
                    </div>
                    <FormContainer title="Quantity" icon={Package}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField label="Qty" id="Qty" type="number" value={form.Qty} onChange={(e) => set('Qty', e.target.value)} />
                            <FormField label="Total Qty" id="Total_Qty" type="number" value={form.Total_Qty} onChange={(e) => set('Total_Qty', e.target.value)} />
                            <FormField label="Stock Qty" id="Stock_Qty" type="number" value={form.Stock_Qty} onChange={(e) => set('Stock_Qty', e.target.value)} />
                            <FormField label="Required Qty" id="Require_Qty" type="number" value={form.Require_Qty} onChange={(e) => set('Require_Qty', e.target.value)} />
                            <FormField label="Per Vehicle" id="Vehicle_Per_Qty" type="number" value={form.Vehicle_Per_Qty} onChange={(e) => set('Vehicle_Per_Qty', e.target.value)} />
                            <FormField label="UOM" id="UOM" value={form.UOM} onChange={(e) => set('UOM', e.target.value)} />
                            <FormField label="Status" id="Status" value={form.Status} onChange={(e) => set('Status', e.target.value)} />
                            <FormField label="Created By" id="created_By" value={form.created_By} onChange={(e) => set('created_By', e.target.value)} />
                        </div>
                    </FormContainer>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>
        </div>
    );
};
export default MainIndexDetails;
