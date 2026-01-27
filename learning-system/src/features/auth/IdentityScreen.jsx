import React, { useEffect } from 'react';
import { useIdentityLogic } from './useIdentityLogic';
import './IdentityStyles.css';

const IdentityScreen = () => {
    const { inputValue, setInputValue, message, status, step, handleSubmit, completeScan } = 
          useIdentityLogic("Kiran Aslam", "1234");

    useEffect(() => {
        if (step === 'SCANNING') {
            const timer = setTimeout(() => {
                completeScan();
            }, 15000); 
            return () => clearTimeout(timer);
        }
    }, [step, completeScan]);
    return (
        <div className="login-bg">
            {step !== 'GRANTED' && step !== 'SCANNING' && (
                <h2 className="label-text">
                    {step === 'ID' && "PLEASE IDENTIFY YOURSELF"}
                    {step === 'PASS' && "ENTER PASSWORD"}
                </h2>
            )}
            {(step === 'ID' || step === 'PASS') && (
                <div className="input-container">
                    <div className="inner-border">
                        <input
                            type={step === 'PASS' ? "password" : "text"}
                            className="cyber-input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            autoFocus
                            spellCheck="false"
                        />
                    </div>
                </div>
            )}
            {step === 'SCANNING' && (
                <div className="face-scan-container">
                    <div className="scanner-circle">
                        <div className="scanner-ring"></div>
                        <div className="scanner-grid"></div>
                        <div className="scanner-line"></div>
                        <div className="scan-corners"></div>
                     <p className="scan-text">BIO-DATA SYNC...</p>
                </div>
        
                <div className="data-readout">
                    <span>POSITION: 45.02.11</span>
                    <span>STATUS: ANALYZING</span>
                    <span>ENCRYPTION: ACTIVE</span>
                </div>

            <div className="progress-bar-container">
                <div className="progress-bar"></div>
            </div>
            </div>
          )}
            {message && (
                <p className={`message ${status}`}>
                    {message}
                </p>
            )}
        </div>
    );
};
export default IdentityScreen;