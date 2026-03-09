import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Item_master from './pages/master/Item_master'

function App() {
  const [activePage, setActivePage] = useState('Process Master');

  const renderPage = () => {
    switch (activePage) {
      case 'Process Master': return <Process_master />;
      case 'Group Master': return <Group_master />;
      case 'Reference Master': return <Reference_master />;
      case 'Company Master': return <Company_master />;
      case 'Tax Master': return <Tax_master />;
      case 'Ledger Master': return <Ledger_master />;
      case 'Employee Master': return <Employee_master />;
      case 'Supplier Master': return <Supplier_master />;
      case 'Machine Master': return <Machine_master />;
      case 'Item Master': return <Item_master />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-2xl font-bold text-slate-400">{activePage} — Coming Soon</h1>
          </div>
        );
    }
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <Item_master />
      </main>
    </div>
  )
}

export default App;
