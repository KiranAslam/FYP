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
            } else {
                setMessage("INCORRECT IDENTITY. ACCESS DENIED.");
                setStatus('error');
                setInputValue('');
            }
        } else if (step === 'PASS') {
            if (inputValue === correctPass) {
                setStep('GRANTED'); 
                setMessage("IDENTITY CONFIRMED. ACCESS GRANTED.");
                setStatus('success');
            } else {
                setMessage("INCORRECT PASSWORD. ACCESS DENIED.");
                setStatus('error');
                setInputValue('');
            }
        }
    };

    return { inputValue, setInputValue, message, status, step, handleSubmit };
};