import React, { useState, useRef } from 'react';
import { useAppContext } from '../../store/AppContext';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import FormField from '../../components/FormField';
import FormContainer from '../../components/FormContainer';
import DropdownWithCreate from '../../components/DropdownWithCreate';
import Tabs from '../../components/Tabs';
import { Package, Info, Warehouse, Receipt, Hammer, MoreHorizontal, Upload, X } from 'lucide-react';

const columns = [
    { key: 'partNo', label: 'Part No' },
    { key: 'partName', label: 'Part Name' },
    { key: 'itemGroup', label: 'Group' },
    { key: 'uom', label: 'UOM' },
    { key: 'rate', label: 'Rate', render: (v) => `₹${v}` },
    { key: 'gstPer', label: 'GST %' },
    { key: 'storeName', label: 'Store' },
];

const tabs = [
    { key: 'basic', label: 'Basic Info', icon: Info },
    { key: 'inventory', label: 'Inventory', icon: Warehouse },
    { key: 'tax', label: 'Tax', icon: Receipt },
    { key: 'rawMaterial', label: 'Raw Material', icon: Hammer },
    { key: 'other', label: 'Other', icon: MoreHorizontal },
];

const emptyForm = {
    itemGroup: '', subGroup: '', partNo: '', outSourcePartNo: '', partName: '',
    model: '', brand: '', description: '', size: '', weight: '', uom: '',
    hsnCode: '', purchaseRate: '', marginPercent: '', rate: '', currency: '',
    gstPer: '', category: '', reorderLevel: '', minStock: '', storeName: '',
    rackNo: '', location: '', remarks: '', note: '', itemType: '', source: '',
    barcodeType: '', barcode: '', printName: '', qcType: '',
    materialGrade: '', materialType: '', rawMaterial: '', length: '',
    rmWeight: '', fgWeight: '', imageUpload: '',
};

const ItemMaster = () => {
    const { state, addRecord, updateRecord, deleteRecord } = useAppContext();
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = useState('basic');
    const [imagePreview, setImagePreview] = useState(null);
    const [showImageFull, setShowImageFull] = useState(false);
    const fileInputRef = useRef(null);

    // Inline add modals
    const [addItemGroupModal, setAddItemGroupModal] = useState(false);
    const [newItemGroup, setNewItemGroup] = useState({ group: '', storeName: '', underGroupOf: '' });

    const groupOptions = state.itemGroups.map(g => ({ label: g.group, value: g.group }));
    const uomOptions = state.references.filter(r => r.referenceType === 'UOM').map(r => ({ label: r.description, value: r.description }));
    const currOptions = state.references.filter(r => r.referenceType === 'Currency').map(r => ({ label: r.description, value: r.description }));
    const storeOptions = state.references.filter(r => r.referenceType === 'Store Name').map(r => ({ label: r.description, value: r.description }));
    const itemTypeOptions = ['Raw Material', 'Finished Goods', 'Semi Finished', 'Consumables'].map(v => ({ label: v, value: v }));
    const qcTypeOptions = ['QUALITY', 'STANDARD', 'NONE'].map(v => ({ label: v, value: v }));
    const gstOptions = [5, 12, 18, 28].map(v => ({ label: `${v}%`, value: v }));
    const materialGradeOptions = Array.from(new Set(state.items.map(i => i.materialGrade).filter(Boolean))).map(v => ({ label: v, value: v }));
    const materialTypeOptions = Array.from(new Set(state.items.map(i => i.materialType).filter(Boolean))).map(v => ({ label: v, value: v }));

    const openAdd = () => { setForm(emptyForm); setEditId(null); setErrors({}); setActiveTab('basic'); setImagePreview(null); setModal(true); };
    const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setErrors({}); setActiveTab('basic'); setImagePreview(row.imageUpload || null); setModal(true); };
    const close = () => setModal(false);
    const set = (f, v) => {
        setForm((p) => ({ ...p, [f]: v }));
        setErrors(prev => {
            const e = { ...prev };
            if (['itemGroup', 'uom', 'itemType', 'qcType'].includes(f)) {
                if (!v) e[f] = 'Required';
                else delete e[f];
            }
            if (['partNo', 'partName'].includes(f)) {
                if (!(v || '').trim()) e[f] = 'Required';
                else delete e[f];
            }
            if (f === 'rate') {
                if (v === '' || v === null) e.rate = 'Required';
                else if (Number(v) < 0) e.rate = 'Must be ≥ 0';
                else delete e.rate;
            }
            if (f === 'gstPer') {
                if (v === '' || v === null) e.gstPer = 'Required';
                else delete e.gstPer;
            }
            if (f === 'purchaseRate') {
                if (v !== '' && Number(v) < 0) e.purchaseRate = 'Must be ≥ 0';
                else delete e.purchaseRate;
            }
            if (f === 'marginPercent') {
                if (v !== '' && (Number(v) < 0 || Number(v) > 100)) e.marginPercent = '0-100';
                else delete e.marginPercent;
            }
            return e;
        });
    };

    const validate = () => {
        const e = {};
        if (!form.itemGroup) e.itemGroup = 'Required';
        if (!form.subGroup && !form.subGroup === '') { /* optional */ }
        if (!form.partNo.trim()) e.partNo = 'Required';
        if (!form.partName.trim()) e.partName = 'Required';
        if (!form.uom) e.uom = 'Required';
        if (!form.rate && form.rate !== 0) e.rate = 'Required';
        if (form.rate && Number(form.rate) < 0) e.rate = 'Must be ≥ 0';
        if (!form.gstPer && form.gstPer !== 0) e.gstPer = 'Required';
        if (!form.itemType) e.itemType = 'Required';
        if (!form.qcType) e.qcType = 'Required';
        if (form.purchaseRate && Number(form.purchaseRate) < 0) e.purchaseRate = 'Must be ≥ 0';
        if (form.marginPercent && (Number(form.marginPercent) < 0 || Number(form.marginPercent) > 100)) e.marginPercent = '0-100';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const save = () => {
        if (!validate()) return;
        if (editId) updateRecord('items', editId, form);
        else addRecord('items', form);
        close();
    };

    const saveItemGroup = () => {
        if (!newItemGroup.group.trim()) return;
        addRecord('itemGroups', newItemGroup);
        set('itemGroup', newItemGroup.group);
        setNewItemGroup({ group: '', storeName: '', underGroupOf: '' });
        setAddItemGroupModal(false);
    };

    const renderBasicInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <DropdownWithCreate label="Item Group" id="itemGroup" required options={groupOptions} value={form.itemGroup} onChange={(v) => set('itemGroup', v)} onAdd={() => setAddItemGroupModal(true)} error={errors.itemGroup} />
            <DropdownWithCreate label="Sub Group" id="subGroup" required options={groupOptions} value={form.subGroup} onChange={(v) => set('subGroup', v)} error={errors.subGroup} />
            <FormField label="Part No" id="partNo" required value={form.partNo} onChange={(e) => set('partNo', e.target.value)} error={errors.partNo} />
            <FormField label="OutSourcePartNo" id="outSourcePartNo" value={form.outSourcePartNo} onChange={(e) => set('outSourcePartNo', e.target.value)} />
            <FormField label="Part Name" id="partName" required value={form.partName} onChange={(e) => set('partName', e.target.value)} error={errors.partName} />
            <FormField label="Model" id="model" value={form.model} onChange={(e) => set('model', e.target.value)} />
            <FormField label="Brand" id="brand" value={form.brand} onChange={(e) => set('brand', e.target.value)} />
            <FormField label="Description" id="description" value={form.description} onChange={(e) => set('description', e.target.value)} />
            <FormField label="Size" id="size" value={form.size} onChange={(e) => set('size', e.target.value)} />
            <FormField label="Weight" id="weight" type="number" value={form.weight} onChange={(e) => set('weight', e.target.value)} />
            <DropdownWithCreate label="UOM" id="uom" required options={uomOptions} value={form.uom} onChange={(v) => set('uom', v)} error={errors.uom} />
            <FormField label="Margin %" id="marginPercent" type="number" value={form.marginPercent} onChange={(e) => set('marginPercent', e.target.value)} error={errors.marginPercent} />
            <FormField label="Category" id="category" value={form.category} onChange={(e) => set('category', e.target.value)} />
        </div>
    );

    const renderInventory = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <FormField label="Reorder Level" id="reorderLevel" type="number" value={form.reorderLevel} onChange={(e) => set('reorderLevel', e.target.value)} />
            <FormField label="Min Stock" id="minStock" type="number" value={form.minStock} onChange={(e) => set('minStock', e.target.value)} />
            <DropdownWithCreate label="Store Name" id="storeName" options={storeOptions} value={form.storeName} onChange={(v) => set('storeName', v)} />
            <FormField label="Rack No" id="rackNo" value={form.rackNo} onChange={(e) => set('rackNo', e.target.value)} />
            <FormField label="Location" id="location" value={form.location} onChange={(e) => set('location', e.target.value)} />
            <FormField label="Remarks" id="remarks" value={form.remarks} onChange={(e) => set('remarks', e.target.value)} />
            <FormField label="Note" id="note" value={form.note} onChange={(e) => set('note', e.target.value)} />
            <DropdownWithCreate label="Item Type" id="itemType" required options={itemTypeOptions} value={form.itemType} onChange={(v) => set('itemType', v)} error={errors.itemType} />
            <FormField label="Source" id="source" value={form.source} onChange={(e) => set('source', e.target.value)} />
            <FormField label="Barcode Type" id="barcodeType" value={form.barcodeType} onChange={(e) => set('barcodeType', e.target.value)} />
            <FormField label="Barcode" id="barcode" value={form.barcode} onChange={(e) => set('barcode', e.target.value)} />
            <FormField label="Print Name" id="printName" value={form.printName} onChange={(e) => set('printName', e.target.value)} />
            <DropdownWithCreate label="QC Type" id="qcType" required options={qcTypeOptions} value={form.qcType} onChange={(v) => set('qcType', v)} error={errors.qcType} />
        </div>
    );

    const renderTax = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <DropdownWithCreate label="GST Per" id="gstPer2" required options={gstOptions} value={form.gstPer} onChange={(v) => set('gstPer', v)} error={errors.gstPer} />
            <FormField label="HSN Code" id="hsnCode2" value={form.hsnCode} onChange={(e) => set('hsnCode', e.target.value)} />
            <FormField label="Purchase Rate" id="purchaseRate2" type="number" value={form.purchaseRate} onChange={(e) => set('purchaseRate', e.target.value)} />
            <FormField label="Rate" id="rate2" required type="number" value={form.rate} onChange={(e) => set('rate', e.target.value)} error={errors.rate} />
            <DropdownWithCreate label="Currency" id="currency2" options={currOptions} value={form.currency} onChange={(v) => set('currency', v)} />
        </div>
    );

    const renderRawMaterial = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <DropdownWithCreate label="Material Grade" id="materialGrade" options={materialGradeOptions} value={form.materialGrade} onChange={(v) => set('materialGrade', v)} />
            <DropdownWithCreate label="Material Type" id="materialType" options={materialTypeOptions} value={form.materialType} onChange={(v) => set('materialType', v)} />
            <FormField label="Raw Material" id="rawMaterial" value={form.rawMaterial} onChange={(e) => set('rawMaterial', e.target.value)} />
            <FormField label="Length" id="length" value={form.length} onChange={(e) => set('length', e.target.value)} />
            <FormField label="RM Weight" id="rmWeight" type="number" value={form.rmWeight} onChange={(e) => set('rmWeight', e.target.value)} />
            <FormField label="FG Weight" id="fgWeight" type="number" value={form.fgWeight} onChange={(e) => set('fgWeight', e.target.value)} />
        </div>
    );

    const renderOther = () => (
        <div className="space-y-4">
            <div className="form-field-group">
                <label className="form-label">Image Upload</label>
                <div className="flex items-start gap-4">
                    {/* Thumbnail / Placeholder */}
                    <div
                        onClick={() => imagePreview && setShowImageFull(true)}
                        className={`w-24 h-24 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden flex-shrink-0 transition-colors ${
                            imagePreview ? 'cursor-pointer hover:border-[#0097A7] hover:shadow-md' : ''
                        }`}
                    >
                        {imagePreview ? (
                            <img src={imagePreview} alt="Item" className="w-full h-full object-cover rounded-xl" />
                        ) : (
                            <>
                                <Upload className="w-5 h-5 text-slate-400 mb-0.5" />
                                <span className="text-[10px] text-slate-400">No image</span>
                            </>
                        )}
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-col gap-2 pt-1">
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setImagePreview(reader.result);
                                        set('imageUpload', reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-[#0097A7] text-white rounded-lg font-semibold text-xs flex items-center gap-1.5 hover:bg-[#00838F] transition-colors cursor-pointer"
                        >
                            <Upload className="w-3.5 h-3.5" />
                            Browse
                        </button>
                        {imagePreview && (
                            <button
                                type="button"
                                onClick={() => {
                                    setImagePreview(null);
                                    set('imageUpload', '');
                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                }}
                                className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg font-semibold text-xs flex items-center gap-1.5 hover:bg-red-100 transition-colors cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const tabContent = {
        basic: renderBasicInfo,
        inventory: renderInventory,
        tax: renderTax,
        rawMaterial: renderRawMaterial,
        other: renderOther,
    };

    return (
        <div className="p-6">
            <PageHeader title="Item Master" description="Manage items, pricing, inventory and material specifications" icon={Package} />
            <DataTable columns={columns} data={state.items} onAdd={openAdd} addLabel="Add Item" onEdit={openEdit} onDelete={(r) => deleteRecord('items', r.id)} />

            <FormModal isOpen={modal} onClose={close} title={editId ? 'Edit Item' : 'Add Item'} size="xl">
                <div className="p-6">
                    <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                    {tabContent[activeTab]?.()}
                    <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
                        <button onClick={close} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={save} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">{editId ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            </FormModal>

            {/* Inline add Item Group */}
            <FormModal isOpen={addItemGroupModal} onClose={() => setAddItemGroupModal(false)} title="Add Item Group" size="md">
                <div className="p-6 space-y-4">
                    <FormField label="Group" id="newIG_group" required value={newItemGroup.group} onChange={(e) => setNewItemGroup(g => ({ ...g, group: e.target.value }))} />
                    <DropdownWithCreate label="Store Name" id="newIG_store" required options={storeOptions} value={newItemGroup.storeName} onChange={(v) => setNewItemGroup(g => ({ ...g, storeName: v }))} />
                    <DropdownWithCreate label="Under Group Of" id="newIG_under" options={groupOptions} value={newItemGroup.underGroupOf} onChange={(v) => setNewItemGroup(g => ({ ...g, underGroupOf: v }))} placeholder="Search or Select Group" />
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setAddItemGroupModal(false)} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={saveItemGroup} className="px-5 py-2.5 bg-[#0097A7] text-white rounded-xl font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">Save</button>
                    </div>
                </div>
            </FormModal>

            {/* Fullscreen Image Lightbox */}
            {showImageFull && imagePreview && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setShowImageFull(false)}>
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                    <button
                        onClick={() => setShowImageFull(false)}
                        className="absolute top-5 right-5 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                    <img
                        src={imagePreview}
                        alt="Item Full View"
                        className="relative max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
};

export default ItemMaster;
