import { useState } from 'react';

export const useIdentityLogic = (correctId, correctPass) => {
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(''); 
    const [step, setStep] = useState('ID'); 

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
// exact logic will be inserted here
    const completeScan = () => {
        setMessage("BIOMETRIC SCAN COMPLETE. ACCESS GRANTED.");
        setStatus('success');
        setStep('GRANTED');
    };

    return { inputValue, setInputValue, message, status, step, handleSubmit, completeScan };
};