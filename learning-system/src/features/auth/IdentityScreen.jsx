import React from 'react';
import { useIdentityLogic } from './useIdentityLogic';
import './IdentityStyles.css';

const IdentityScreen = () => {
    // Aapka set kiya hua User ID aur Password
    const { inputValue, setInputValue, message, status, step, handleSubmit } = 
          useIdentityLogic("Kiran Aslam", "1234");

    return (
        <div className="login-bg">
            {/* Header: Sirf tab dikhega jab login process (ID ya PASS) chal raha ho */}
            {step !== 'GRANTED' && (
                <h2 className="label-text">
                    {step === 'ID' && "PLEASE IDENTIFY YOURSELF"}
                    {step === 'PASS' && "ENTER PASSWORD"}
                </h2>
            )}
        
            {/* Input Box: Double border wala container */}
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

            {/* Success Message: Jab password sahi hoga, to sirf ye center mein aayega */}
            <p className={`message ${status}`}>
                {message}
            </p>
        </div>
    );
};

export default IdentityScreen;