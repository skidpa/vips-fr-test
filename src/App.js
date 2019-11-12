import React from 'react';
import logo from './logo.svg';
import { StripeProvider, Elements } from 'react-stripe-elements';
import Form from './Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

    return (

        <div>
            <StripeProvider apiKey="pk_test_AtSP8PNrjvdY0irSoVFsaH4P00GrVSyWv8"> 
                <Elements>
                    <Form /> 
                </Elements>
            </StripeProvider>
        </div>
    );
}

export default App;
