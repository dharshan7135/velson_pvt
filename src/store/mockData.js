// ============================================================
// Mock Data Store — Every entity used in the ERP demo
// ============================================================

export const companies = [
    {
        id: 1,
        companyCode: 'COMP001',
        fullName: 'Velson Engineering Pvt Ltd',
        address: '12, Industrial Area Phase-II, Coimbatore',
        state: 'Tamil Nadu',
        code: 'TN',
        phoneOff: '0422-2345678',
        phoneRes: '0422-9876543',
        subHead: 'Manufacturing',
        subjectTo: 'GST',
        bankName: 'State Bank of India',
        accountName: 'Velson Engineering Pvt Ltd',
        accountNo: '38291057234',
        ifscCode: 'SBIN0001234',
        branch: 'RS Puram',
        emailId: 'info@velson.com',
        gstin: '33AABCV1234F1Z5',
        panNo: 'AABCV1234F',
        salesPhoneNo: '9876543210',
        salesEmailId: 'sales@velson.com',
        salesWebsite: 'www.velson.com',
        purchasePhoneNo: '9876543211',
        quotationPhoneNo: '9876543212',
        quotationEmailId: 'quotation@velson.com',
        quotationWebsite: 'www.velson.com/quote',
        purchaseEmailId: 'purchase@velson.com',
    },
    {
        id: 2,
        companyCode: 'COMP002',
        fullName: 'TechVision Industries',
        address: '45, SIDCO Industrial Estate, Chennai',
        state: 'Tamil Nadu',
        code: 'TN',
        phoneOff: '044-28901234',
        phoneRes: '044-28905678',
        subHead: 'Technology',
        subjectTo: 'GST',
        bankName: 'HDFC Bank',
        accountName: 'TechVision Industries',
        accountNo: '50100123456789',
        ifscCode: 'HDFC0001234',
        branch: 'Anna Nagar',
        emailId: 'info@techvision.in',
        gstin: '33AABCT5678G1Z2',
        panNo: 'AABCT5678G',
        salesPhoneNo: '9123456780',
        salesEmailId: 'sales@techvision.in',
        salesWebsite: 'www.techvision.in',
        purchasePhoneNo: '9123456781',
        quotationPhoneNo: '9123456782',
        quotationEmailId: 'quote@techvision.in',
        quotationWebsite: 'www.techvision.in/quote',
        purchaseEmailId: 'purchase@techvision.in',
    },
];

export const employees = [
    {
        id: 1, employeeCode: 'EMP001', employeeName: 'Rajesh Kumar',
        address: '23, MG Road, Coimbatore', contactNo: '9876501234',
        aadhaarNo: '234567891234', joinDate: '2022-01-15', relievingDate: '',
        department: 'Production', designation: 'Supervisor',
        contractPerson: 'Mr. Suresh', emailId: 'rajesh@velson.com', companyName: 'COMP001',
    },
    {
        id: 2, employeeCode: 'EMP002', employeeName: 'Anitha S',
        address: '10, Gandhi Nagar, Coimbatore', contactNo: '9876502345',
        aadhaarNo: '345678912345', joinDate: '2023-03-01', relievingDate: '',
        department: 'Quality', designation: 'QC Inspector',
        contractPerson: 'Ms. Priya', emailId: 'anitha@velson.com', companyName: 'COMP001',
    },
    {
        id: 3, employeeCode: 'EMP003', employeeName: 'Vikram P',
        address: '5, Lake View, Chennai', contactNo: '9123401234',
        aadhaarNo: '456789123456', joinDate: '2021-06-10', relievingDate: '',
        department: 'Engineering', designation: 'Design Engineer',
        contractPerson: 'Mr. Arjun', emailId: 'vikram@techvision.in', companyName: 'COMP002',
    },
];

export const contractors = [
    { id: 1, contractorCode: 'CON001', contractorName: 'Kumar & Sons', address: '78, Junction Rd, Salem', city: 'Salem' },
    { id: 2, contractorCode: 'CON002', contractorName: 'Supreme Works', address: '12, NS Road, Erode', city: 'Erode' },
];

export const suppliers = [
    {
        id: 1, supplierCode: 'SUP001', supplierName: 'Steel India Corp', address: '56, Steel Market, Mumbai',
        city: 'Mumbai', state: 'Maharashtra', stateCode: '27', country: 'India', pincode: '400001',
        phone1: '9022334455', phone2: '9022334456', grade: 'A', emailId: 'steel@india.com',
        website: 'www.steelindia.com', gstNo: '27AABCS1234F1ZP', partDetails: 'MS Round Bar',
        bankName: 'Bank of Baroda', partNo1: 'STL-001',
    },
    {
        id: 2, supplierCode: 'SUP002', supplierName: 'Allied Components', address: '90, Auto Nagar, Pune',
        city: 'Pune', state: 'Maharashtra', stateCode: '27', country: 'India', pincode: '411001',
        phone1: '9876123456', phone2: '', grade: 'B', emailId: 'info@allied.com',
        website: 'www.alliedcomp.com', gstNo: '27AABCA5678G1Z3', partDetails: 'Bearings, Bushings',
        bankName: 'ICICI Bank', partNo1: 'ALC-002',
    },
];

export const machines = [
    {
        id: 1, machineCode: 'MCH001', machineName: 'CNC Lathe - Fanuc', serialNo: 'FN-2024-0042',
        machineCategory: 'CNC', workHoursPerDay: 8, model: 'Alpha D21LiB5',
        manufacture: 'Fanuc Corporation', country: 'Japan', currency: 'JPY', price: 3500000,
        vendorName: 'SUP001', installationPlace: 'Shop Floor A', remark: 'Primary CNC unit',
        yearOfFG: '2024', dateOfPurchase: '2024-01-20', dateOfInstallation: '2024-02-15',
        warrantyExpDate: '2027-02-15', amcExpDate: '2026-02-15',
    },
    {
        id: 2, machineCode: 'MCH002', machineName: 'VMC - Haas', serialNo: 'HS-2023-1187',
        machineCategory: 'VMC', workHoursPerDay: 10, model: 'VF-2SS',
        manufacture: 'Haas Automation', country: 'USA', currency: 'USD', price: 78000,
        vendorName: 'SUP002', installationPlace: 'Shop Floor B', remark: 'High-speed VMC',
        yearOfFG: '2023', dateOfPurchase: '2023-06-10', dateOfInstallation: '2023-07-25',
        warrantyExpDate: '2026-07-25', amcExpDate: '2025-07-25',
    },
];

export const processes = [
    {
        id: 1, partName: 'Shaft Assembly', processName: 'Turning', processName1: 'Rough Turning',
        team: 'Team A', machineCode: 'MCH001', processOrder: 1, machineName: 'CNC Lathe - Fanuc',
        days: 0, hours: 2, minutes: 30, settingTime: 15, cycleTime: 45, handlingTime: 5, idleTime: 10,
        imageUpload: '',
    },
    {
        id: 2, partName: 'Gear Housing', processName: 'Milling', processName1: 'Face Milling',
        team: 'Team B', machineCode: 'MCH002', processOrder: 1, machineName: 'VMC - Haas',
        days: 0, hours: 4, minutes: 0, settingTime: 20, cycleTime: 90, handlingTime: 10, idleTime: 15,
        imageUpload: '',
    },
];

export const groupMaster = [
    { id: 1, group: 'Current Liabilities', underGroupOf: 'Liabilities', printingOrder: 1, groupTotal: 0 },
    { id: 2, group: 'Fixed Assets', underGroupOf: 'Assets', printingOrder: 2, groupTotal: 0 },
    { id: 3, group: 'Direct Expenses', underGroupOf: 'Expenses', printingOrder: 3, groupTotal: 0 },
    { id: 4, group: 'Sales Accounts', underGroupOf: 'Revenue', printingOrder: 4, groupTotal: 0 },
];

export const accounts = [
    {
        id: 1, acCode: 'AC001', lId: 'L001', acName: 'Cash in Hand', address: 'Head Office',
        dueDays: 0, tdsPercent: 0, shortName: 'CASH', creditLimit: 100000, tcsPercent: 0,
        ledgerType: 'Cash', hireCharges: 0, km: 0, group: 'Current Liabilities',
        accountName: 'Cash Account', openingBalance: 50000, acType: 'Debit', area: 'Coimbatore',
        bankAcNo: '', ifscCode: '', branch: '', taxType: 'None', stateName: 'Tamil Nadu',
        stateCode: '33', gstNo: '', panNo: '', aadhaarNo: '', emailId: '', phoneNo: '',
        cellNo: '', contactPerson: '', bank: '', status: 'Active', ledgerId: 'LED001',
    },
    {
        id: 2, acCode: 'AC002', lId: 'L002', acName: 'SBI Current Account', address: 'RS Puram Branch',
        dueDays: 30, tdsPercent: 0, shortName: 'SBI', creditLimit: 500000, tcsPercent: 0,
        ledgerType: 'Bank', hireCharges: 0, km: 0, group: 'Fixed Assets',
        accountName: 'SBI Account', openingBalance: 250000, acType: 'Debit', area: 'Coimbatore',
        bankAcNo: '38291057234', ifscCode: 'SBIN0001234', branch: 'RS Puram', taxType: 'GST',
        stateName: 'Tamil Nadu', stateCode: '33', gstNo: '33AABCV1234F1Z5', panNo: 'AABCV1234F',
        aadhaarNo: '', emailId: 'finance@velson.com', phoneNo: '0422-2345678',
        cellNo: '9876543210', contactPerson: 'Mr. Finance', bank: 'SBI', status: 'Active', ledgerId: 'LED002',
    },
];

export const itemGroups = [
    { id: 1, group: 'Raw Material', storeName: 'STORE 1-MAINSTORE', underGroupOf: '' },
    { id: 2, group: 'Finished Goods', storeName: 'STORE 1-MAINSTORE', underGroupOf: '' },
    { id: 3, group: 'Semi Finished', storeName: 'STORE 2-SUBSTORE', underGroupOf: 'Raw Material' },
    { id: 4, group: 'Consumables', storeName: 'STORE 1-MAINSTORE', underGroupOf: '' },
];

export const items = [
    {
        id: 1, itemGroup: 'Raw Material', subGroup: 'Semi Finished', partNo: 'P001',
        outSourcePartNo: 'OS-P001', partName: 'MS Round Bar 20mm', model: '', brand: 'Tata',
        description: 'Mild Steel Round Bar 20mm dia', size: '20mm', weight: 5.2, uom: 'Kg',
        hsnCode: '72142000', purchaseRate: 55, marginPercent: 15, rate: 63.25, currency: 'INR',
        gstPer: 18, category: 'Metal', reorderLevel: 100, minStock: 50,
        storeName: 'STORE 1-MAINSTORE', rackNo: 'R-01', location: 'Bay A',
        remarks: '', note: '', itemType: 'Raw Material', source: 'Domestic', barcodeType: 'EAN-13',
        barcode: '8901234567890', printName: 'MS Round 20mm', qcType: 'QUALITY',
        materialGrade: 'EN8', materialType: 'Mild Steel', rawMaterial: 'MS Bar',
        length: '3000mm', rmWeight: 5.5, fgWeight: 5.2, imageUpload: '',
    },
    {
        id: 2, itemGroup: 'Finished Goods', subGroup: '', partNo: 'P002',
        outSourcePartNo: '', partName: 'Shaft Assembly Complete', model: 'SA-200', brand: 'Velson',
        description: 'Complete shaft assembly with bearings', size: '200mm', weight: 12.5, uom: 'Pcs',
        hsnCode: '84839000', purchaseRate: 0, marginPercent: 25, rate: 2500, currency: 'INR',
        gstPer: 18, category: 'Assembly', reorderLevel: 10, minStock: 5,
        storeName: 'STORE 1-MAINSTORE', rackNo: 'R-05', location: 'Bay C',
        remarks: 'Handle with care', note: '', itemType: 'Finished Goods', source: 'In-house',
        barcodeType: 'QR', barcode: 'VEL-SA200-001', printName: 'Shaft Assy SA-200',
        qcType: 'QUALITY', materialGrade: 'EN24', materialType: 'Alloy Steel',
        rawMaterial: 'Alloy Bar', length: '200mm', rmWeight: 14, fgWeight: 12.5, imageUpload: '',
    },
];

export const characteristics = [
    { id: 1, characteristics: 'Hardness (HRC)' },
    { id: 2, characteristics: 'Surface Roughness (Ra)' },
    { id: 3, characteristics: 'Tensile Strength (MPa)' },
    { id: 4, characteristics: 'Diameter Tolerance (mm)' },
];

export const serviceJobs = [
    { id: 1, vehicleType: 'Two Wheeler', jobName: 'Full Service', labourCharge: 350, materialCharge: 1200 },
    { id: 2, vehicleType: 'Four Wheeler', jobName: 'Oil Change', labourCharge: 200, materialCharge: 800 },
    { id: 3, vehicleType: 'Four Wheeler', jobName: 'Brake Pad Replacement', labourCharge: 500, materialCharge: 2500 },
];

export const referenceGroups = [
    { id: 1, groupName: 'Department' },
    { id: 2, groupName: 'Designation' },
    { id: 3, groupName: 'UOM' },
    { id: 4, groupName: 'Currency' },
    { id: 5, groupName: 'Machine Category' },
    { id: 6, groupName: 'Vehicle Type' },
    { id: 7, groupName: 'Team' },
    { id: 8, groupName: 'Store Name' },
];

export const references = [
    { id: 1, referenceType: 'Department', code: 'DEPT001', description: 'Production' },
    { id: 2, referenceType: 'Department', code: 'DEPT002', description: 'Quality' },
    { id: 3, referenceType: 'Department', code: 'DEPT003', description: 'Engineering' },
    { id: 4, referenceType: 'Designation', code: 'DESG001', description: 'Supervisor' },
    { id: 5, referenceType: 'Designation', code: 'DESG002', description: 'QC Inspector' },
    { id: 6, referenceType: 'Designation', code: 'DESG003', description: 'Design Engineer' },
    { id: 7, referenceType: 'UOM', code: 'UOM001', description: 'Kg' },
    { id: 8, referenceType: 'UOM', code: 'UOM002', description: 'Pcs' },
    { id: 9, referenceType: 'UOM', code: 'UOM003', description: 'Mtr' },
    { id: 10, referenceType: 'Currency', code: 'CUR001', description: 'INR' },
    { id: 11, referenceType: 'Currency', code: 'CUR002', description: 'USD' },
    { id: 12, referenceType: 'Currency', code: 'CUR003', description: 'JPY' },
    { id: 13, referenceType: 'Machine Category', code: 'MCAT001', description: 'CNC' },
    { id: 14, referenceType: 'Machine Category', code: 'MCAT002', description: 'VMC' },
    { id: 15, referenceType: 'Machine Category', code: 'MCAT003', description: 'Lathe' },
    { id: 16, referenceType: 'Vehicle Type', code: 'VT001', description: 'Two Wheeler' },
    { id: 17, referenceType: 'Vehicle Type', code: 'VT002', description: 'Four Wheeler' },
    { id: 18, referenceType: 'Team', code: 'TM001', description: 'Team A' },
    { id: 19, referenceType: 'Team', code: 'TM002', description: 'Team B' },
    { id: 20, referenceType: 'Store Name', code: 'STR001', description: 'STORE 1-MAINSTORE' },
    { id: 21, referenceType: 'Store Name', code: 'STR002', description: 'STORE 2-SUBSTORE' },
];

export const taxes = [
    {
        id: 1, taxLedgerAc: 'GST 18%', taxPercent: 18, cgstPercent: 9, sgstPercent: 9, igstPercent: 18,
        purchaseCGST: 'Input CGST 9%', purchaseSGST: 'Input SGST 9%', purchaseIGST: 'Input IGST 18%',
        salesCGST: 'Output CGST 9%', salesSGST: 'Output SGST 9%', salesIGST: 'Output IGST 18%',
        hsnCode: '72142000',
    },
    {
        id: 2, taxLedgerAc: 'GST 12%', taxPercent: 12, cgstPercent: 6, sgstPercent: 6, igstPercent: 12,
        purchaseCGST: 'Input CGST 6%', purchaseSGST: 'Input SGST 6%', purchaseIGST: 'Input IGST 12%',
        salesCGST: 'Output CGST 6%', salesSGST: 'Output SGST 6%', salesIGST: 'Output IGST 12%',
        hsnCode: '84839000',
    },
    {
        id: 3, taxLedgerAc: 'GST 5%', taxPercent: 5, cgstPercent: 2.5, sgstPercent: 2.5, igstPercent: 5,
        purchaseCGST: 'Input CGST 2.5%', purchaseSGST: 'Input SGST 2.5%', purchaseIGST: 'Input IGST 5%',
        salesCGST: 'Output CGST 2.5%', salesSGST: 'Output SGST 2.5%', salesIGST: 'Output IGST 5%',
        hsnCode: '',
    },
];

// Lookup helpers
export const stateList = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal',
];

export const countryList = ['India', 'USA', 'Japan', 'China', 'Germany', 'UK', 'South Korea', 'Taiwan'];
