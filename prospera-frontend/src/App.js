// src/App.js
import React from 'react';
import SalaryBenchmark from './components/SalaryBenchmark';
import NegotiationAdvice from './components/NegotiationAdvice';

function App() {
    return (
        <div className="App">
            <header>
                <h1>Prospera: Empowering You to Earn What You Deserve</h1>
            </header>
            <main>
                <SalaryBenchmark />
                <NegotiationAdvice />
            </main>
        </div>
    );
}

export default App;
