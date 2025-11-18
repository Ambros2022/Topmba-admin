import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import DiscreteSliderLabel from './Slider';
// import PieChart from './PieChart';
const PieChart = dynamic(() => import('./PieChart'), {
    ssr: false, // disable server-side rendering for Chart.js
    loading: () => <p>Loading chart...</p>,
});

interface Mark {
    value: number;
    label: string;
}

const marks: Mark[] = [
    { value: 10000, label: '10,000' },
    { value: 1000000, label: '10L' },
    { value: 2000000, label: '20L' },
    { value: 3000000, label: '30L' },
    { value: 4000000, label: '40L' },
    { value: 5000000, label: '50L' },
    { value: 6000000, label: '60L' },
    { value: 7000000, label: '70L' },
    { value: 8000000, label: '80L' },
    { value: 9000000, label: '90L' },
    { value: 10000000, label: '1Cr' },
];

const percentage: Mark[] = [
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
    { value: 11, label: '11' },
    { value: 12, label: '12' },
    { value: 13, label: '13' },
    { value: 14, label: '14' },
    { value: 15, label: '15' },
    { value: 16, label: '16' },
    { value: 17, label: '17' },
    { value: 18, label: '18' },
    { value: 19, label: '19' },
    { value: 20, label: '20' },
];

const loan: Mark[] = [
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
    { value: 11, label: '11' },
    { value: 12, label: '12' },
    { value: 13, label: '13' },
    { value: 14, label: '14' },
    { value: 15, label: '15' },
];

const LoanCalculator: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState<number>(2000000); // Initial loan amount in rupees
    const [interestRate, setInterestRate] = useState<number>(10); // Initial interest rate in percentage
    const [loanTenure, setLoanTenure] = useState<number>(10); // Initial loan tenure in years
    const [loanTenureUnit, setLoanTenureUnit] = useState<'yr' | 'mo'>('yr'); // Default to years

    // Calculated values
    const emi = calculateEMI(loanAmount, interestRate, loanTenure, loanTenureUnit);
    const totalInterest = calculateTotalInterest(loanAmount, interestRate, loanTenure, loanTenureUnit);
    const payableAmount = calculatePayableAmount(loanAmount, totalInterest);

    // Handle changes in loan amount input
    const handleLoanAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        const value = rawValue === '' ? NaN : parseInt(rawValue, 10);
        if (!isNaN(value)) {
            setLoanAmount(value);
        } else {
            setLoanAmount(0); // Handle empty input by setting loanAmount to 0 or another default value
        }
    };

    const handleInterestRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setInterestRate(value);
        } else {
            setInterestRate(0); // Handle invalid input
        }
    };

    // Handle changes in loan tenure input
    const handleLoanTenureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        const value = rawValue === '' ? NaN : parseInt(rawValue, 10);
        if (!isNaN(value)) {
            setLoanTenure(value);
        } else {
            setLoanTenure(0); // Handle empty input by setting loanTenure to 0 or another default value
        }
    };

    // Toggle between years and months for loan tenure
    const handleLoanTenureUnitChange = (unit: 'yr' | 'mo') => {
        if (unit !== loanTenureUnit) {
            if (unit === 'yr' && loanTenureUnit === 'mo') {
                setLoanTenure(Math.ceil(loanTenure / 12)); // Convert months to years
            } else if (unit === 'mo' && loanTenureUnit === 'yr') {
                setLoanTenure(loanTenure * 12); // Convert years to months
            }
            setLoanTenureUnit(unit);
        }
    };

    // Format number to display with commas
    const formatNumber = (num: number) => {
        return num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    };

    return (
        <section className='bg-white py-3'>
            <div className="container">
                <h2 className='fw-bold text-center text-blue'>EMI Calculator for Education Loans</h2>
                <div className="row p-3 bg-skyBlue rounded mt-3">
                    <div className="col-lg-8 mt-3">
                        <div className='d-flex gap-3 flex-wrap'>
                            <h3 className='fw-bold text-blue align-self-center'>Loan Amount</h3>
                            <div className='d-flex'>
                                <div className='input-group'>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={isNaN(loanAmount) ? '' : formatNumber(loanAmount)}
                                        onChange={handleLoanAmountChange}
                                    />
                                    <span className='input-group-text bg-white'><i className='bi bi-currency-rupee text-blue'></i></span>
                                </div>
                            </div>
                            <DiscreteSliderLabel
                                ariaLabel="Loan Amount Slider"
                                defaultValue={2000000}
                                getAriaValueText={(value) => `${formatNumber(value)}`}
                                step={100000}
                                marks={marks}
                                min={10000}
                                max={10000000}
                                value={isNaN(loanAmount) ? 2000000 : loanAmount}
                                onChange={(event, value) => setLoanAmount(value as number)}
                                className='text-blue'
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div className='d-flex gap-3 flex-wrap mt-5'>
                            <h3 className='fw-bold text-blue align-self-center'>Interest Rate</h3>
                            <div className='d-flex'>
                                <div className='input-group'>
                                    <input
                                        type="number"
                                        step="0.01" // Allows for decimal values
                                        className='form-control'
                                        value={isNaN(interestRate) ? '' : `${interestRate}`}
                                        onChange={handleInterestRateChange}
                                    />
                                    <span className='input-group-text bg-white'><i className='bi bi-percent text-blue'></i></span>
                                </div>
                            </div>
                            <DiscreteSliderLabel
                                ariaLabel="Interest Rate Slider"
                                defaultValue={10}
                                getAriaValueText={(value) => `${value}`}
                                step={0.1} // Allows for decimal steps
                                marks={percentage}
                                min={5}
                                max={20}
                                value={isNaN(interestRate) ? 10 : interestRate}
                                onChange={(event, value) => setInterestRate(value as number)}
                                className='text-blue'
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div className='d-flex gap-3 flex-wrap mt-5'>
                            <h3 className='fw-bold text-blue align-self-center'>Loan Tenure</h3>
                            <div className='d-flex align-items-center'>
                                <div className='input-group'>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={isNaN(loanTenure) ? '' : `${loanTenure}`}
                                        onChange={handleLoanTenureChange}
                                    />
                                    <span
                                        className={`input-group-text bg-white text-blue tenure-button ${loanTenureUnit === 'yr' ? 'active' : ''}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleLoanTenureUnitChange('yr')}
                                    >
                                        <h6 className='my-auto'>Yr</h6>
                                    </span>
                                    <span
                                        className={`input-group-text bg-white text-blue tenure-button ${loanTenureUnit === 'mo' ? 'active' : ''}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleLoanTenureUnitChange('mo')}
                                    >
                                        <h6 className='my-auto'>Mo</h6>
                                    </span>
                                </div>

                            </div>
                            <DiscreteSliderLabel
                                ariaLabel="Loan Tenure Slider"
                                defaultValue={10}
                                getAriaValueText={(value) => `${value}`}
                                step={1}
                                marks={loan}
                                min={5}
                                max={15}
                                value={isNaN(loanTenure) ? 10 : loanTenure}
                                onChange={(event, value) => setLoanTenure(value as number)}
                                className='text-blue'
                                valueLabelDisplay="auto"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 mt-3 text-center">
                        <div className="p-3">
                            <h3 className='fw-bold text-blue'>EMI Amount</h3>
                            <h6 className='text-black'>{isNaN(emi) ? '' : formatNumber(emi)} Per Month</h6>
                        </div>
                        <div className="p-3 mt-3">
                            <h3 className='fw-bold text-blue'>Total Interest</h3>
                            <h6 className='text-black'>{isNaN(totalInterest) ? '' : formatNumber(totalInterest)}</h6>
                        </div>
                        <div className="p-3 mt-3">
                            <h3 className='fw-bold text-blue'>Payable Amount</h3>
                            <h6 className='text-black'>{isNaN(payableAmount) ? '' : formatNumber(payableAmount)}</h6>
                        </div>
                        <div className="d-flex mb-3 justify-content-center pieChartDesign">
                            <PieChart loanAmount={loanAmount} totalInterest={totalInterest} />
                        </div>
                    </div>
                    <h6 className='text-center mt-3'><i className='bi bi-question-circle'></i> Get a detailed breakdown of your total repayment using our comprehensive education loan repayment calculator.</h6>
                </div>
            </div>
        </section >
    );
};

// Function to calculate EMI
const calculateEMI = (loanAmount: number, interestRate: number, loanTenure: number, loanTenureUnit: 'yr' | 'mo'): number => {
    const monthlyInterestRate = interestRate / 1200; // Monthly interest rate
    const totalMonths = loanTenureUnit === 'yr' ? loanTenure * 12 : loanTenure; // Total number of months

    // Formula to calculate EMI: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths) / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    return Math.round(emi);
};

// Function to calculate total interest
const calculateTotalInterest = (loanAmount: number, interestRate: number, loanTenure: number, loanTenureUnit: 'yr' | 'mo'): number => {
    const emi = calculateEMI(loanAmount, interestRate, loanTenure, loanTenureUnit);
    const totalPayment = emi * (loanTenureUnit === 'yr' ? loanTenure * 12 : loanTenure);
    const totalInterest = totalPayment - loanAmount;

    return Math.round(totalInterest);
};

// Function to calculate payable amount (principal + total interest)
const calculatePayableAmount = (loanAmount: number, totalInterest: number): number => {
    return loanAmount + totalInterest;
};

export default LoanCalculator;
