import React from 'react';
import { useIdentityLogic } from './useIdentityLogic';
import './IdentityStyles.css';
const IdentityScreen = () => {
    const { inputValue, setInputValue, message, status, step, handleSubmit } = 
          useIdentityLogic("Kiran Aslam", "1234");
    return (
        <div className="login-bg">
            {step !== 'GRANTED' && (
                <h2 className="label-text">
                    {step === 'ID' && "PLEASE IDENTIFY YOURSELF"}
                    {step === 'PASS' && "ENTER PASSWORD"}
                </h2>
            )}
            {step !== 'GRANTED' && (
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
            <p className={`message ${status}`}>
                {message}
            </p>
        </div>
    );
};

export default IdentityScreen;