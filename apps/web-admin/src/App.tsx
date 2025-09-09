import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong>GovPoint Admin</strong>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </header>
      <main style={{ marginTop: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}

