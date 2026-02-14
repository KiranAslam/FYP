import React, { useEffect, useRef } from 'react'; 
import Webcam from "react-webcam"; 
import { useIdentityLogic } from './useIdentityLogic';
import './IdentityStyles.css';

const IdentityScreen = () => {
    const { inputValue, setInputValue, message, status, step, handleSubmit, verifyFace } = 
          useIdentityLogic("Kiran", "1234");
    const webcamRef = useRef(null);
    useEffect(() => {
        let interval;
        if (step === 'SCANNING') {
            interval = setInterval(() => {
                if (webcamRef.current) {
                    const imageSrc = webcamRef.current.getScreenshot();
                    if (imageSrc) {
                        verifyFace(imageSrc); 
                    }
                }
            }, 2000); 
        }
        return () => clearInterval(interval);
    }, [step, verifyFace]);
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
                    <div className="scanner-square">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="webcam-capture"
                            videoConstraints={{
                                width: 640,
                                height: 640,
                                facingMode: "user"
                            }}
                        />
                        <div className="scanner-grid"></div>
                        <div className="scanner-line"></div>
                        <div className="scan-corners">
                            <div className="corner top-left"></div>
                            <div className="corner top-right"></div>
                            <div className="corner bottom-left"></div>
                            <div className="corner bottom-right"></div>
                        </div>

                        <div className="scan-text-container">
                            <p className="scan-text">BIOMETRIC ANALYZING...</p>
                        </div>
                    </div>
                    <div className="data-readout">
                        <div className="readout-item">
                            <span className="label">STATUS:</span>
                            <span className={`value ${status === 'error' ? 'blink' : ''}`}>
                                {status === 'error' ? 'RETRYING' : 'SCANNING ACTIVE'}
                            </span>
                        </div>
                        <div className="readout-item">
                            <span className="label">SECURE:</span>
                            <span className="value">AES-256</span>
                        </div>
                        <div className="readout-item">
                            <span className="label">USER_ID:</span>
                            <span className="value">KIRAN_01</span>
                        </div>
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