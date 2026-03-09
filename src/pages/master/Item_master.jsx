import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';

const Item_master = () => {
    const [modal, setModal] = useState({ open: false, type: '', label: '' });

    const handleAdd = (label) => setModal({ open: true, type: 'Add', label });
    const handleView = (label) => setModal({ open: true, type: 'View', label });
    const closeModal = () => setModal({ open: false, type: '', label: '' });

    return (
        <div className="min-h-screen bg-slate-50/50 p-6">
            {/* Modal */}
            {modal.open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={closeModal}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-[#0097A7] px-6 py-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white">{modal.type} — {modal.label}</h2>
                            <button onClick={closeModal} className="text-white/80 hover:text-white text-2xl leading-none cursor-pointer"><IoClose /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10" placeholder={`Enter ${modal.label} name`} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Code</label>
                                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10" placeholder={`Enter ${modal.label} code`} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                                <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#0097A7] focus:ring-4 focus:ring-[#0097A7]/10 resize-none" rows="3" placeholder={`Enter description`}></textarea>
                            </div>
                        </div>
                        <div className="px-6 pb-6 flex justify-end gap-3">
                            <button onClick={closeModal} className="px-5 py-2 bg-slate-100 text-slate-600 rounded-lg font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
                            <button className="px-5 py-2 bg-[#0097A7] text-white rounded-lg font-semibold text-sm hover:bg-[#00838F] transition-colors cursor-pointer">
                                {modal.type === 'Add' ? 'Save' : 'Close'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Section */}
            {/* <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100"> */}
            <div className="flex items-center gap-3">
                {/* <div className="w-2 h-8 bg-main rounded-full"></div> */}
                <h1 className="text-2xl font-bold text-slate-800 pb-6">ITEM MASTER</h1>
                {/* </div> */}
                {/* <div className="flex gap-3">
                    <button className="px-4 py-2 bg-main-light text-main rounded-xl font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <span>📊</span> Excel
                    </button>
                    <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-100 transition-colors">
                        <span>✕</span> Close
                    </button>
                </div> */}
            </div>

            <div className="w-full flex-1 space-y-6">

                {/* Container 1: Core Specifications — Horizontal */}
                <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="bg-[#0097A7] w-full py-4 mb-6">
                        <h2 className="text-xl md:text-2xl font-black text-white text-left pl-8 tracking-wide" >Core Specifications</h2>
                    </div>

                    <div className="px-8 pb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-5">
                            <FormSelect label="Item Group" id="itemGroup" required options={[{ label: 'A', value: 'a' }]} onAdd={handleAdd} onView={handleView} />
                            <FormInput label="Part No" id="partNo" required defaultValue="0" />
                            <FormInput label="OutSource Part No" id="outsourcePartNo" />
                            <FormInput label="Part Name" id="partName" required />
                            <FormInput label="Model" id="model" />
                            <FormInput label="Brand" id="brand" />
                            <FormInput label="Description" id="description" />
                            <FormInput label="Size" id="size" />
                            <FormInput label="Weight" id="weight" defaultValue="0" />
                            <FormSelect label="UOM" id="uom" required options={[{ label: 'Pcs', value: 'pcs' }]} onAdd={handleAdd} onView={handleView} />
                            <FormInput label="HSN Code" id="hsnCode" />
                            <FormInput label="Purchase Rate" id="purchaseRate" required defaultValue="0" />
                            <FormInput label="Margin (%)" id="margin" defaultValue="0" />
                            <FormInput label="Rate" id="rate" required defaultValue="0" />
                            <FormSelect label="Currency" id="currency" options={[{ label: 'Rs', value: 'rs' }]} defaultValue="rs" onAdd={handleAdd} onView={handleView} />

                            <div className="grid grid-cols-[140px_1fr] items-center gap-3 group">
                                <label className="text-sm font-semibold text-slate-700 flex items-center justify-end gap-1 text-right">
                                    <span className="text-red-500">*</span>
                                    GST Per :
                                </label>
                                <div className="flex items-center gap-2">
                                    <select className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm outline-none focus:border-main focus:ring-4 focus:ring-main/10 hover:border-slate-300">
                                        <option>18%</option>
                                    </select>
                                    <span className="text-sm font-medium text-slate-400 border border-slate-200 px-3 py-2 rounded-lg bg-slate-50 text-center">0.00</span>
                                </div>
                            </div>

                            <FormInput label="Category" id="category" />
                        </div>
                    </div>
                </div>

                {/* Container 2: Inventory & Source — Horizontal */}
                <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="bg-[#0097A7] w-full py-4 mb-6">
                        <h2 className="text-xl md:text-2xl font-black text-white text-left pl-8 tracking-wide" >Inventory & Source</h2>
                    </div>

                    <div className="px-8 pb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-5">
                            <FormSelect label="Sub Group" id="subGroup" required options={[]} onAdd={handleAdd} onView={handleView} />
                            <FormInput label="Reorder Level" id="reorderLevel" defaultValue="0" />
                            <FormInput label="Min Stock" id="minStock" defaultValue="0" />
                            <FormSelect label="Store Name" id="storeName" options={[{ label: 'STORE 1-MAINSTORE', value: 'store1' }]} defaultValue="store1" onAdd={handleAdd} onView={handleView} />
                            <FormInput label="Rack No" id="rackNo" />
                            <FormInput label="Location" id="location" />
                            <FormInput label="Remarks" id="remarks" />
                            <FormInput label="Note" id="note" />
                            <FormSelect label="Item Type" id="itemType" required options={[]} onAdd={handleAdd} onView={handleView} />
                            <FormInput label="Source" id="source" />
                            <FormInput label="Barcode Type" id="barcodeType" />
                            <FormInput label="Barcode" id="barcode" />
                            <FormInput label="Print Name" id="printName" />
                            <FormSelect label="QC Type" id="qcType" required options={[{ label: 'QUALITY', value: 'quality' }]} defaultValue="quality" onAdd={handleAdd} onView={handleView} />
                        </div>
                    </div>
                </div>

                {/* Container 3: Material Specifications — Horizontal */}
                <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="bg-[#0097A7] w-full py-4 mb-6">
                        <h2 className="text-xl md:text-2xl font-black text-white text-left pl-8 tracking-wide" >Material Specifications</h2>
                    </div>

                    <div className="px-8 pb-8">
                        <div className="text-center font-semibold text-slate-400 text-sm italic border-y border-slate-50 mb-4 pb-4 bg-slate-50/30 rounded-lg">
                            Raw Material Selection
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-5">
                            <FormSelect label="Material Grade" id="materialGrade" options={[]} onAdd={handleAdd} onView={handleView} />
                            <FormSelect label="Material Type" id="materialType" options={[]} onAdd={handleAdd} onView={handleView} />
                            <FormInput label="Raw Material" id="rawMaterial" />
                            <FormInput label="Length" id="length" />
                            <FormInput label="RM. Weight" id="rmWeight" />
                            <FormInput label="FG Weight" id="fgWeight" />

                            {/* Image Placeholder Area */}
                            <div className="grid grid-cols-[140px_1fr] items-start gap-3 group pt-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center justify-end gap-1 text-right mt-2">
                                    Image :
                                </label>
                                <div className="w-full max-w-[200px] aspect-square bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 hover:border-main transition-colors cursor-pointer">
                                    <div className="p-3 bg-white rounded-xl shadow-sm hover:scale-110 transition-transform text-2xl">
                                        📂
                                    </div>
                                    <span className="text-xs font-medium text-slate-500 hover:text-main transition-colors text-center px-4">Click to upload Image</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Action Bar */}
                <div className="mt-8 flex justify-end gap-4 pb-12">
                    <button className="px-8 py-3 bg-white text-slate-600 rounded-2xl font-bold shadow-sm border border-slate-200 hover:bg-slate-50 transition-all">
                        Reset
                    </button>
                    <button className="px-8 py-3 bg-gradient-to-r from-main to-main-dark text-white rounded-2xl font-bold shadow-lg shadow-main-light hover:opacity-90 hover:-translate-y-0.5 transition-all">
                        Save Item Master
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Item_master;
