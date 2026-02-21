import React, { useState } from 'react';
import { api } from './api';
import JobList from './JobList';
import './App.css';

function App() {
    const [email, setEmail] = useState('');
    const [candidateData, setCandidateData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
          // Llamada al Step 2: Obtener datos por email
          const data = await api.getCandidateByEmail(email);
          setCandidateData(data);
        } catch (err) {
          setError('No se encontró un candidato con ese email. Verifica que sea el mismo con el que te postulaste.');
        } finally {
          setLoading(false);
        }
    };

    return (
        <div className="App">
            <header>
                <h1>Nimble Gravity - Candidate Challenge</h1>
            </header>

            <main>
                {!candidateData ? (
                    <section className="login-section">
                        <form onSubmit={handleLogin}>
                            <label htmlFor="email">Ingresa tu email de candidato:</label>
                            <input
                              id="email"
                              type="email"
                              placeholder="ejemplo@correo.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <button type="submit" disabled={loading}>
                              {loading ? 'Buscando...' : 'Comenzar Challenge'}
                            </button>
                        </form>
                        {error && <p className="error-text">{error}</p>}
                    </section>
                    ) : (
                    <>
                      <div className="welcome-msg">
                          <p>Bienvenido, <strong>{candidateData.firstName}</strong>!</p>
                          <button onClick={() => setCandidateData(null)}>Cambiar email</button>
                      </div>
                      
                      <JobList candidateData={candidateData} />
                    </>
                )}
            </main>
        </div>
    );
}

export default App;