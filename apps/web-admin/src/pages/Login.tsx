import React, { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('http://localhost:8081/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });
    const data = await res.json();
    setToken(data.token || null);
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      {token && (
        <div style={{ marginTop: 12 }}>
          <div><strong>Token:</strong></div>
          <code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>{token}</code>
        </div>
      )}
    </div>
  );
}

