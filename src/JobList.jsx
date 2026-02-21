import React, { useEffect, useState } from 'react';
import { api } from './api';
import JobItem from './JobItem'; // Asumiendo que creas este componente aparte

const JobList = ({ candidateData }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
        try {
            const data = await api.getJobs();
            setJobs(data);
        } catch (err) {
            setError('No se pudieron cargar las vacantes. Reintenta más tarde.');
        } finally {
            setLoading(false);
        }
        };

        fetchJobs();
    }, []);

    if (loading) return <div className="loading">Cargando posiciones...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <section className="job-list-container">
        <h2>Posiciones Abiertas</h2>
        <div className="grid">
            {jobs.map((job) => (
            <JobItem 
                key={job.id} 
                job={job} 
                candidateData={candidateData} 
            />
            ))}
        </div>
        
        <style>{`
            .grid {
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            }
            .loading { text-align: center; padding: 2rem; }
            .error-message { color: red; border: 1px solid red; padding: 1rem; }
        `}</style>
        </section>
    );
};

export default JobList;