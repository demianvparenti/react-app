import React, { useState } from 'react';
import { api } from './api';

const JobItem = ({ job, candidateData }) => {
    const [repoUrl, setRepoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const handleApply = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            uuid: candidateData.uuid,
            jobId: String(job.id),
            candidateId: String(candidateData.candidateId),
            applicationId: String(candidateData.applicationId),
            repoUrl: repoUrl.trim()
        };

        console.log("Enviando este payload:", payload);

        try {
            const response = await api.applyToJob(payload);
            setStatus('success');
        } catch (err) {
            setStatus('error');
            console.error("Detalle del error 400:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={cardStyle}>
        <h3>{job.title}</h3>
        <p><small>ID: {job.id}</small></p>
        
        {status === 'success' ? (
            <p style={{ color: 'green', fontWeight: 'bold' }}>¡Postulación enviada con éxito!</p>
        ) : (
            <form onSubmit={handleApply}>
            <input
                type="url"
                placeholder="https://github.com/tu-usuario/tu-repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                required
                style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            />
            <button 
                type="submit" 
                disabled={loading || !repoUrl}
                style={{ backgroundColor: loading ? '#ccc' : '#007bff', color: 'white', padding: '8px 16px', border: 'none', cursor: 'pointer' }}
            >
                {loading ? 'Enviando...' : 'Submit Application'}
            </button>
            {status === 'error' && <p style={{ color: 'red' }}>Error al enviar. Intenta de nuevo.</p>}
            </form>
        )}
        </div>
    );
};

const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px 0',
    textAlign: 'left',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

export default JobItem;