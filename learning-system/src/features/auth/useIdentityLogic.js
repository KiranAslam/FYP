import { useState } from 'react';

export const useIdentityLogic = (correctId, correctPass) => {
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(''); 
    const [step, setStep] = useState('ID'); 
    // --- FACE RECOGNITION LOGIC ---
    const verifyFace = async (imageSrc) => {
        try {
            const response = await fetch('http://localhost:5000/verify-face', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: imageSrc })
            });

            const data = await response.json();

            if (data.status === 'success') {
                completeScan(); 
            } else {
                setMessage("FACE NOT RECOGNIZED. TRY AGAIN.");
                setStatus('error');
            }
        } catch (error) {
            setMessage("BACKEND CONNECTION ERROR.");
            setStatus('error');
            console.error(error);
        }
    };

    const handleSubmit = () => {
        if (step === 'ID') {
            if (inputValue.trim().toUpperCase() === correctId.toUpperCase()) {
                setStep('PASS');
                setInputValue('');
                setMessage('');
                setStatus('');
            } else {
                setMessage("INCORRECT IDENTITY. ACCESS DENIED.");
                setStatus('error');
                setInputValue('');
            }
        } else if (step === 'PASS') {
            if (inputValue === correctPass) {   
                setStep('SCANNING'); 
                setInputValue('');
                setMessage('SCANNING FOR BIOMETRIC DATA...'); 
                setStatus('info'); 
            } else {
                setMessage("INCORRECT PASSWORD. ACCESS DENIED.");
                setStatus('error');
                setInputValue('');
            }
        }
    };

    const completeScan = () => {
        setMessage("ACCESS GRANTED.");
        setStatus('success');
        setStep('GRANTED');
    };

    return { 
        inputValue, setInputValue, message, status, 
        step, handleSubmit, completeScan, verifyFace 
    };
};