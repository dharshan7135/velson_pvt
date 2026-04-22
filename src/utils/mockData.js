// Mock data generators for all Velson ERP entities

let idCounter = 100;
const nextId = () => ++idCounter;

const refGroups = [
  { id: 1, RG_vCode: 'Department', RG_vDescription: 'Department', status: 'A' },
  { id: 2, RG_vCode: 'Designation', RG_vDescription: 'Designation', status: 'A' },
  { id: 3, RG_vCode: 'Company Type', RG_vDescription: 'Company Type', status: 'A' },
  { id: 4, RG_vCode: 'Customer Type', RG_vDescription: 'Customer Type', status: 'A' },
  { id: 5, RG_vCode: 'Supplier Type', RG_vDescription: 'Supplier Type', status: 'A' },
  { id: 6, RG_vCode: 'Machine Category', RG_vDescription: 'Machine Category', status: 'A' },
  { id: 7, RG_vCode: 'Vendor', RG_vDescription: 'Vendor', status: 'A' },
  { id: 8, RG_vCode: 'Process Type', RG_vDescription: 'Process Type', status: 'A' },
  { id: 9, RG_vCode: 'Team', RG_vDescription: 'Team', status: 'A' },
  { id: 10, RG_vCode: 'UOM', RG_vDescription: 'Unit of Measurement', status: 'A' },
  { id: 11, RG_vCode: 'Item Model', RG_vDescription: 'Item Model', status: 'A' },
  { id: 12, RG_vCode: 'Item Type', RG_vDescription: 'Item Type', status: 'A' },
  { id: 13, RG_vCode: 'Item Sub Group', RG_vDescription: 'Item Sub Group', status: 'A' },
  { id: 14, RG_vCode: 'Store', RG_vDescription: 'Store', status: 'A' },
  { id: 15, RG_vCode: 'QC Type', RG_vDescription: 'QC Type', status: 'A' },
  { id: 16, RG_vCode: 'Currency', RG_vDescription: 'Currency', status: 'A' },
  { id: 17, RG_vCode: 'Material Grade', RG_vDescription: 'Material Grade', status: 'A' },
  { id: 18, RG_vCode: 'Material Type', RG_vDescription: 'Material Type', status: 'A' },
  { id: 19, RG_vCode: 'Raw Material', RG_vDescription: 'Raw Material', status: 'A' },
  { id: 20, RG_vCode: 'Vehicle Model Number', RG_vDescription: 'Vehicle Model Number', status: 'A' },
  { id: 21, RG_vCode: 'Vehicle Sub Type', RG_vDescription: 'Vehicle Sub Type', status: 'A' },
  { id: 22, RG_vCode: 'Vehicle Name', RG_vDescription: 'Vehicle Name', status: 'A' },
  { id: 23, RG_vCode: 'Quotation Type', RG_vDescription: 'Quotation Type', status: 'A' },
  { id: 24, RG_vCode: 'Grade', RG_vDescription: 'Grade/Model', status: 'A' },
  { id: 25, RG_vCode: 'Tax Type', RG_vDescription: 'Tax Type', status: 'A' },
  { id: 26, RG_vCode: 'Currency Type', RG_vDescription: 'Currency Type', status: 'A' },
];

const refGroupValues = [
  // Department
  { id: 101, RG_iID: 1, groupName: 'Department', RGV_vCode: 'D001', RGV_vDescription: 'Production', status: 'A' },
  { id: 102, RG_iID: 1, groupName: 'Department', RGV_vCode: 'D002', RGV_vDescription: 'Quality', status: 'A' },
  { id: 103, RG_iID: 1, groupName: 'Department', RGV_vCode: 'D003', RGV_vDescription: 'Sales', status: 'A' },
  { id: 104, RG_iID: 1, groupName: 'Department', RGV_vCode: 'D004', RGV_vDescription: 'Purchase', status: 'A' },
  { id: 105, RG_iID: 1, groupName: 'Department', RGV_vCode: 'D005', RGV_vDescription: 'HR', status: 'A' },
  // Designation
  { id: 111, RG_iID: 2, groupName: 'Designation', RGV_vCode: 'DG001', RGV_vDescription: 'Manager', status: 'A' },
  { id: 112, RG_iID: 2, groupName: 'Designation', RGV_vCode: 'DG002', RGV_vDescription: 'Engineer', status: 'A' },
  { id: 113, RG_iID: 2, groupName: 'Designation', RGV_vCode: 'DG003', RGV_vDescription: 'Supervisor', status: 'A' },
  { id: 114, RG_iID: 2, groupName: 'Designation', RGV_vCode: 'DG004', RGV_vDescription: 'Operator', status: 'A' },
  // Company Type
  { id: 121, RG_iID: 3, groupName: 'Company Type', RGV_vCode: 'CT001', RGV_vDescription: 'Manufacturing', status: 'A' },
  { id: 122, RG_iID: 3, groupName: 'Company Type', RGV_vCode: 'CT002', RGV_vDescription: 'Trading', status: 'A' },
  // Customer Type
  { id: 131, RG_iID: 4, groupName: 'Customer Type', RGV_vCode: 'CU001', RGV_vDescription: 'Domestic', status: 'A' },
  { id: 132, RG_iID: 4, groupName: 'Customer Type', RGV_vCode: 'CU002', RGV_vDescription: 'Export', status: 'A' },
  // Supplier Type
  { id: 141, RG_iID: 5, groupName: 'Supplier Type', RGV_vCode: 'SU001', RGV_vDescription: 'Raw Material', status: 'A' },
  { id: 142, RG_iID: 5, groupName: 'Supplier Type', RGV_vCode: 'SU002', RGV_vDescription: 'Service', status: 'A' },
  // Machine Category
  { id: 151, RG_iID: 6, groupName: 'Machine Category', RGV_vCode: 'MC001', RGV_vDescription: 'CNC', status: 'A' },
  { id: 152, RG_iID: 6, groupName: 'Machine Category', RGV_vCode: 'MC002', RGV_vDescription: 'Lathe', status: 'A' },
  { id: 153, RG_iID: 6, groupName: 'Machine Category', RGV_vCode: 'MC003', RGV_vDescription: 'Milling', status: 'A' },
  // Vendor
  { id: 161, RG_iID: 7, groupName: 'Vendor', RGV_vCode: 'V001', RGV_vDescription: 'Haas Automation', status: 'A' },
  { id: 162, RG_iID: 7, groupName: 'Vendor', RGV_vCode: 'V002', RGV_vDescription: 'DMG Mori', status: 'A' },
  // Process Type
  { id: 171, RG_iID: 8, groupName: 'Process Type', RGV_vCode: 'PT001', RGV_vDescription: 'In-House', status: 'A' },
  { id: 172, RG_iID: 8, groupName: 'Process Type', RGV_vCode: 'PT002', RGV_vDescription: 'Outsource', status: 'A' },
  // Team
  { id: 181, RG_iID: 9, groupName: 'Team', RGV_vCode: 'T001', RGV_vDescription: 'Team A', status: 'A' },
  { id: 182, RG_iID: 9, groupName: 'Team', RGV_vCode: 'T002', RGV_vDescription: 'Team B', status: 'A' },
  // UOM
  { id: 191, RG_iID: 10, groupName: 'UOM', RGV_vCode: 'U001', RGV_vDescription: 'Nos', status: 'A' },
  { id: 192, RG_iID: 10, groupName: 'UOM', RGV_vCode: 'U002', RGV_vDescription: 'Kg', status: 'A' },
  { id: 193, RG_iID: 10, groupName: 'UOM', RGV_vCode: 'U003', RGV_vDescription: 'Mtr', status: 'A' },
  // Item Type
  { id: 201, RG_iID: 12, groupName: 'Item Type', RGV_vCode: 'IT001', RGV_vDescription: 'Raw Material', status: 'A' },
  { id: 202, RG_iID: 12, groupName: 'Item Type', RGV_vCode: 'IT002', RGV_vDescription: 'Finished Good', status: 'A' },
  // Currency
  { id: 211, RG_iID: 16, groupName: 'Currency', RGV_vCode: 'C001', RGV_vDescription: 'INR', status: 'A' },
  { id: 212, RG_iID: 16, groupName: 'Currency', RGV_vCode: 'C002', RGV_vDescription: 'USD', status: 'A' },
  // Material Grade
  { id: 221, RG_iID: 17, groupName: 'Material Grade', RGV_vCode: 'MG001', RGV_vDescription: 'SS304', status: 'A' },
  { id: 222, RG_iID: 17, groupName: 'Material Grade', RGV_vCode: 'MG002', RGV_vDescription: 'EN8', status: 'A' },
  // Tax Type
  { id: 231, RG_iID: 25, groupName: 'Tax Type', RGV_vCode: 'TT001', RGV_vDescription: 'Local', status: 'A' },
  { id: 232, RG_iID: 25, groupName: 'Tax Type', RGV_vCode: 'TT002', RGV_vDescription: 'Interstate', status: 'A' },
  // Quotation Type
  { id: 241, RG_iID: 23, groupName: 'Quotation Type', RGV_vCode: 'QT001', RGV_vDescription: 'Standard', status: 'A' },
  { id: 242, RG_iID: 23, groupName: 'Quotation Type', RGV_vCode: 'QT002', RGV_vDescription: 'Custom', status: 'A' },
];

export function generateMockData(entity) {
  switch (entity) {
    case 'referenceGroups':
      return refGroups;
    case 'referenceGroupValues':
      return refGroupValues;

    case 'ledgerMasters':
      return [
        { id: 1, LM_Ledger_Name: 'GST Output Tax', LM_Code: 'LM001', LedgerID: 1 },
        { id: 2, LM_Ledger_Name: 'GST Input Tax', LM_Code: 'LM002', LedgerID: 2 },
        { id: 3, LM_Ledger_Name: 'IGST Payable', LM_Code: 'LM003', LedgerID: 3 },
      ];

    case 'taxMasters':
      return [
        { id: 1, LedgerID: 1, LedgerName: 'GST Output Tax', TM_Tax_Percent: 18, TM_CGST_Tax: 9, TM_SGST_Tax: 9, TM_IGST_Tax: 18, TM_PCGST: 9, TM_PSGST: 9, TM_PIGST: 18, TM_SCGST: 9, TM_SSGST: 9, TM_SIGST: 18 },
        { id: 2, LedgerID: 2, LedgerName: 'GST Input Tax', TM_Tax_Percent: 12, TM_CGST_Tax: 6, TM_SGST_Tax: 6, TM_IGST_Tax: 12, TM_PCGST: 6, TM_PSGST: 6, TM_PIGST: 12, TM_SCGST: 6, TM_SSGST: 6, TM_SIGST: 12 },
        { id: 3, LedgerID: 1, LedgerName: 'GST Output Tax', TM_Tax_Percent: 5, TM_CGST_Tax: 2.5, TM_SGST_Tax: 2.5, TM_IGST_Tax: 5, TM_PCGST: 2.5, TM_PSGST: 2.5, TM_PIGST: 5, TM_SCGST: 2.5, TM_SSGST: 2.5, TM_SIGST: 5 },
      ];

    case 'companies':
      return [
        { id: 1, CompanyCode: 'C0001', CompanyName: 'Velson Engineering Pvt Ltd', CompanyTypeId: 121, City: 'Coimbatore', State: 'Tamil Nadu', StateCode: 33, GSTIN: '33AADCV1234A1Z1', PanNo: 'AADCV1234A', Status: 'Active' },
        { id: 2, CompanyCode: 'C0002', CompanyName: 'Velson Trading Co', CompanyTypeId: 122, City: 'Chennai', State: 'Tamil Nadu', StateCode: 33, GSTIN: '33BBEFW5678B2Z2', PanNo: 'BBEFW5678B', Status: 'Active' },
      ];

    case 'employees':
      return [
        { id: 1, EM_Code: 'EMP001', EM_Employee_Name: 'Rajesh Kumar', DepartmentId: 101, DepartmentName: 'Production', DesignationId: 111, DesignationName: 'Manager', Contact_No: '9876543210', Join_Date: '2022-01-15', EM_Status: 'Active' },
        { id: 2, EM_Code: 'EMP002', EM_Employee_Name: 'Priya Sharma', DepartmentId: 103, DepartmentName: 'Sales', DesignationId: 112, DesignationName: 'Engineer', Contact_No: '9876543211', Join_Date: '2022-06-01', EM_Status: 'Active' },
        { id: 3, EM_Code: 'EMP003', EM_Employee_Name: 'Mohammed Ali', DepartmentId: 102, DepartmentName: 'Quality', DesignationId: 113, DesignationName: 'Supervisor', Contact_No: '9876543212', Join_Date: '2023-03-10', EM_Status: 'Active' },
        { id: 4, EM_Code: 'EMP004', EM_Employee_Name: 'Lakshmi Venkat', DepartmentId: 104, DepartmentName: 'Purchase', DesignationId: 114, DesignationName: 'Operator', Contact_No: '9876543213', Join_Date: '2021-11-20', EM_Status: 'Relieved' },
      ];

    case 'customers':
      return [
        { id: 1, CustomerTypeId: 131, LM_Ledger_Name: 'Tata Motors Ltd', LM_Code: 'C-001', LM_Address1: '14 Haddows Road', LM_Area: 'Chennai', LM_State: 'Tamil Nadu', LM_StateCode: '33', LM_Country: 'India', LM_Contact_Person: 'Mr. Arvind', LM_Phone_Number: '044-28240000', LM_GSTIN: '33AAACT1234Z1Z1', LM_PAN_No: 'AAACT1234Z' },
        { id: 2, CustomerTypeId: 132, LM_Ledger_Name: 'Ashok Leyland', LM_Code: 'C-002', LM_Address1: '1 Sardar Patel Rd', LM_Area: 'Chennai', LM_State: 'Tamil Nadu', LM_StateCode: '33', LM_Country: 'India', LM_Contact_Person: 'Ms. Deepa', LM_Phone_Number: '044-28200000', LM_GSTIN: '33AACCA5678B1Z2', LM_PAN_No: 'AACCA5678B' },
        { id: 3, CustomerTypeId: 131, LM_Ledger_Name: 'Mahindra & Mahindra', LM_Code: 'C-003', LM_Address1: 'Gateway Building', LM_Area: 'Mumbai', LM_State: 'Maharashtra', LM_StateCode: '27', LM_Country: 'India', LM_Contact_Person: 'Mr. Ravi', LM_Phone_Number: '022-24901441', LM_GSTIN: '27AABCM1234E1Z5', LM_PAN_No: 'AABCM1234E' },
      ];

    case 'suppliers':
      return [
        { id: 1, SupplierTypeId: 141, LM_Ledger_Name: 'Steel Authority India', LM_Code: 'S-001', LM_Address1: 'Lodhi Road', LM_Area: 'New Delhi', LM_State: 'Delhi', LM_StateCode: '07', LM_Country: 'India', LM_Contact_Person: 'Mr. Singh', LM_Phone_Number: '011-24360100', LM_GSTIN: '07AAACS1234A1Z5' },
        { id: 2, SupplierTypeId: 142, LM_Ledger_Name: 'Tata Steel Ltd', LM_Code: 'S-002', LM_Address1: 'Bombay House', LM_Area: 'Mumbai', LM_State: 'Maharashtra', LM_StateCode: '27', LM_Country: 'India', LM_Contact_Person: 'Mr. Patel', LM_Phone_Number: '022-66658282', LM_GSTIN: '27AAACT5678B1Z2' },
      ];

    case 'contractors':
      return [
        { id: 1, Contract_Code: 'CON001', Contract_Name: 'Precision Works', Address: '45 Industrial Area, Coimbatore', Phone: '0422-2540001', Email: 'info@precisionworks.com', Status: 'Active' },
        { id: 2, Contract_Code: 'CON002', Contract_Name: 'Quality Fabricators', Address: '12 SIDCO Estate, Chennai', Phone: '044-26500002', Email: 'quality@fabricators.in', Status: 'Active' },
        { id: 3, Contract_Code: 'CON003', Contract_Name: 'Sri Lakshmi Enterprises', Address: '78 Anna Nagar, Madurai', Phone: '0452-2530003', Email: 'contact@srilakshmi.com', Status: 'Inactive' },
      ];

    case 'machines':
      return [
        { id: 1, MachineCategoryId: 151, MachineCategoryName: 'CNC', VendorId: 161, VendorName: 'Haas Automation', Machine_Code: 'M001', Machine_Name: 'CNC Horizontal Mill', Machine_Description: '5-axis horizontal milling center', Location: 'Shop Floor A', Status: 'Active' },
        { id: 2, MachineCategoryId: 152, MachineCategoryName: 'Lathe', VendorId: 162, VendorName: 'DMG Mori', Machine_Code: 'M002', Machine_Name: 'CNC Lathe L200', Machine_Description: 'Heavy duty CNC lathe', Location: 'Shop Floor B', Status: 'Active' },
        { id: 3, MachineCategoryId: 153, MachineCategoryName: 'Milling', VendorId: 161, VendorName: 'Haas Automation', Machine_Code: 'M003', Machine_Name: 'Vertical Machining Center', Machine_Description: 'VMC 850', Location: 'Shop Floor A', Status: 'Active' },
      ];

    case 'processes':
      return [
        { id: 1, PM_Process_Name: 'Turning', ProcessTypeId: 171, ProcessTypeName: 'In-House', TeamId: 181, TeamName: 'Team A', PM_Process_Order: 1, PM_Days: 0, PM_Hours: 2, Minutes: 30, Setting_Time: 15, Cycle_Time: 5, Handling_Time: 3, Idle_Time: 2, Machine_id: 2, Machine_Name: 'CNC Lathe L200' },
        { id: 2, PM_Process_Name: 'Milling', ProcessTypeId: 171, ProcessTypeName: 'In-House', TeamId: 181, TeamName: 'Team A', PM_Process_Order: 2, PM_Days: 0, PM_Hours: 3, Minutes: 0, Setting_Time: 20, Cycle_Time: 8, Handling_Time: 5, Idle_Time: 3, Machine_id: 1, Machine_Name: 'CNC Horizontal Mill' },
        { id: 3, PM_Process_Name: 'Heat Treatment', ProcessTypeId: 172, ProcessTypeName: 'Outsource', TeamId: 182, TeamName: 'Team B', PM_Process_Order: 3, PM_Days: 1, PM_Hours: 0, Minutes: 0, Setting_Time: 0, Cycle_Time: 0, Handling_Time: 0, Idle_Time: 0, Machine_id: null, Machine_Name: '' },
      ];

    case 'vehicles':
      return [
        { id: 1, Customer_Id: 1, CustomerName: 'Tata Motors Ltd', Vehicle_Model_No_Id: 'VM001', Model_Sub_Type_Id: 'Standard', Vehicle_Name_Id: 'Nexon', Serial_No: '1', Vehicle_No: 'TN-01-AB-1234', BOM_Type: 'Standard', Status: 'Active' },
        { id: 2, Customer_Id: 2, CustomerName: 'Ashok Leyland', Vehicle_Model_No_Id: 'VM002', Model_Sub_Type_Id: 'Heavy', Vehicle_Name_Id: 'Dost', Serial_No: '1', Vehicle_No: 'TN-09-CD-5678', BOM_Type: 'Custom', Status: 'Active' },
      ];

    case 'items':
      return [
        { id: 1, GroupId: 1, GroupName: 'Raw Materials', IM_Part_No: 'RM00001', IM_PartName: 'SS304 Round Bar 25mm', IM_Description: 'Stainless Steel 304 Round Bar', UnitId: 192, UnitName: 'Kg', IM_HSN_Code: '72041000', IM_Purchase_Rate: 250, IM_Rate: 300, IM_WEIGHT: 12.5, ItemTypeId: 201, ItemTypeName: 'Raw Material', Status: 'Active' },
        { id: 2, GroupId: 2, GroupName: 'Finished Goods', IM_Part_No: 'FG00001', IM_PartName: 'Shaft Assembly SA-100', IM_Description: 'Precision turned shaft assembly', UnitId: 191, UnitName: 'Nos', IM_HSN_Code: '84831020', IM_Purchase_Rate: 1500, IM_Rate: 2200, IM_WEIGHT: 3.2, ItemTypeId: 202, ItemTypeName: 'Finished Good', Status: 'Active' },
        { id: 3, GroupId: 1, GroupName: 'Raw Materials', IM_Part_No: 'RM00002', IM_PartName: 'EN8 Round Bar 50mm', IM_Description: 'Carbon Steel EN8 Round Bar', UnitId: 192, UnitName: 'Kg', IM_HSN_Code: '72142000', IM_Purchase_Rate: 180, IM_Rate: 220, IM_WEIGHT: 25, ItemTypeId: 201, ItemTypeName: 'Raw Material', Status: 'Active' },
      ];

    case 'itemGroups':
      return [
        { id: 1, IM_PartName: 'Raw Materials', StoreId: 1, StoreName: 'Main Store', PrefixId: 1, PrefixName: 'RM', status: 'A' },
        { id: 2, IM_PartName: 'Finished Goods', StoreId: 1, StoreName: 'Main Store', PrefixId: 2, PrefixName: 'FG', status: 'A' },
        { id: 3, IM_PartName: 'Bought Out Parts', StoreId: 2, StoreName: 'Sub Store', PrefixId: 3, PrefixName: 'BO', status: 'A' },
      ];

    case 'quotations':
      return [
        { id: 1, PO_No: '25-26/Q00001', PODate: '2025-04-15', CustomerName: 'Tata Motors Ltd', Customer_ID: 1, TaxType: 'Local', Net_Amt: 125000.00, Status: 'Open' },
        { id: 2, PO_No: '25-26/Q00002', PODate: '2025-04-18', CustomerName: 'Ashok Leyland', Customer_ID: 2, TaxType: 'Interstate', Net_Amt: 85000.00, Status: 'Confirmed' },
      ];

    case 'users':
      return [
        { id: 1, UserName: 'admin', FirstName: 'Admin', LastName: 'User', EmailId: 'admin@velson.com', Gender: 'Male', MobileNo: '9876543210', Status: 'Active', RoleId: 1, RoleName: 'SuperAdmin' },
        { id: 2, UserName: 'manager1', FirstName: 'Rajesh', LastName: 'Kumar', EmailId: 'rajesh@velson.com', Gender: 'Male', MobileNo: '9876543211', Status: 'Active', RoleId: 3, RoleName: 'Admin' },
        { id: 3, UserName: 'user1', FirstName: 'Priya', LastName: 'Sharma', EmailId: 'priya@velson.com', Gender: 'Female', MobileNo: '9876543212', Status: 'Active', RoleId: 2, RoleName: 'User' },
      ];

    case 'roles':
      return [
        { id: 1, RoleName: 'SuperAdmin', Status: 'Active' },
        { id: 2, RoleName: 'User', Status: 'Active' },
        { id: 3, RoleName: 'Admin', Status: 'Active' },
      ];

    case 'menus':
      return [
        { id: 1, MenuName: 'Dashboard', MenuOrder: 1, Status: 'Active' },
        { id: 2, MenuName: 'Masters', MenuOrder: 2, Status: 'Active' },
        { id: 3, MenuName: 'Inventory', MenuOrder: 3, Status: 'Active' },
        { id: 4, MenuName: 'Sales', MenuOrder: 4, Status: 'Active' },
        { id: 5, MenuName: 'Accounting', MenuOrder: 5, Status: 'Active' },
        { id: 6, MenuName: 'Quality Control', MenuOrder: 6, Status: 'Active' },
        { id: 7, MenuName: 'Configuration', MenuOrder: 7, Status: 'Active' },
      ];

    case 'qcCheckMethods':
      return [
        { id: 1, CM_vCode: 'QCM001', CM_vName: 'Visual Inspection', CM_vDescription: 'Visual check for surface defects', CM_cStatus: 'A' },
        { id: 2, CM_vCode: 'QCM002', CM_vName: 'Dimensional Check', CM_vDescription: 'Measurement using gauges', CM_cStatus: 'A' },
        { id: 3, CM_vCode: 'QCM003', CM_vName: 'Hardness Test', CM_vDescription: 'Rockwell/Brinell hardness testing', CM_cStatus: 'A' },
      ];

    case 'qcInspectionChars':
      return [
        { id: 1, Code: 'IC001', Name: 'Surface Finish', Description: 'Surface roughness measurement', Status: 'A' },
        { id: 2, Code: 'IC002', Name: 'Roundness', Description: 'Circularity tolerance check', Status: 'A' },
        { id: 3, Code: 'IC003', Name: 'Hardness', Description: 'Material hardness value', Status: 'A' },
      ];

    case 'systemInfo':
      return [
        { id: 1, IPAddress: '192.168.1.100', MACAddress: 'AA:BB:CC:DD:EE:01', DeviceName: 'WORK-PC-01', USERNAME: 'admin', DEPT: 'IT' },
        { id: 2, IPAddress: '192.168.1.101', MACAddress: 'AA:BB:CC:DD:EE:02', DeviceName: 'PROD-PC-01', USERNAME: 'rajesh', DEPT: 'Production' },
      ];

    default:
      return [];
  }
}

export function getRefValuesByGroup(values, groupId) {
  return values.filter((v) => v.RG_iID === groupId && v.status === 'A');
}

export function generateNextCode(prefix, existingItems, codeField) {
  const max = existingItems.reduce((m, item) => {
    const code = item[codeField] || '';
    const num = parseInt(code.replace(/\D/g, ''), 10) || 0;
    return Math.max(m, num);
  }, 0);
  return `${prefix}${String(max + 1).padStart(4, '0')}`;
}

export function generateQuotationNumber(existingQuotations) {
  const now = new Date();
  const fy = now.getMonth() >= 3
    ? `${String(now.getFullYear() % 100).padStart(2, '0')}-${String((now.getFullYear() + 1) % 100).padStart(2, '0')}`
    : `${String((now.getFullYear() - 1) % 100).padStart(2, '0')}-${String(now.getFullYear() % 100).padStart(2, '0')}`;
  const prefix = `${fy}/Q`;
  const max = existingQuotations.reduce((m, q) => {
    if (q.PO_No && q.PO_No.startsWith(prefix)) {
      const num = parseInt(q.PO_No.split('Q')[1], 10) || 0;
      return Math.max(m, num);
    }
    return m;
  }, 0);
  return `${prefix}${String(max + 1).padStart(5, '0')}`;
}
