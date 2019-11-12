import * as React from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    StripeProvider,
    Elements
        } from 'react-stripe-elements';
import axios from 'axios';


const uuidv4 = require('uuid/v4');
class Form extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            statename: "",
            country: "",
            zipCode: "",
            amount: "1337",
            idempotency: uuidv4()
        }

        //const uuidv4 = require('uuid/v4');
        //let idempotencyThing = uuidv4();
        //console.log(uuidv4());
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello")

       /* try {
            // get stripe token for the charge request and store it as a object named token.
            let { token } = await this.props.stripe.createToken({
                name: this.state.name,
                address_city: this.state.city,
                address_country: this.state.country,
                address_state: this.state.statename,
                address_zip: this.state.zipCode
                });
            //console.log(token.id)

            let amount = this.state.amount
            let token_id = token.id
            let idempotencyThing = this.state.idempotency;
            let response = await fetch('http://localhost:8080/stripe/checkout', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ token, amount, token_id, idempotencyThing })
            })
            console.log("state: " + this.state.idempotency + "\nvariable" + idempotencyThing);
            //console.log(JSON.stringify({ token, amount, token_id }))
            //redirect on success anwer-.. i think :D
            console.log("response: " + response)
            if(response.ok){
                console.log("payment successful")
                console.log("respons status: " + response.status)
                console.log("response status text: " + response.statusText)
            } else {
                console.log("payment failed")
                console.log("respons status: " + response.status)
                console.log("response status text: " + response.statusText)
            }
        } catch(e){
            throw e;
        }*/

        try {
            const parent = this;
            let response = fetch('http://localhost:8080/stripe/intent')
            .then(function (response) {
                console.log("response: " + response.client_secret)
                return response.json();
            })
            .then(function (responseJson){
                console.log("responseJson; " + responseJson)
                let clientSecret = responseJson.client_secret;
                let cards = JSON.stringify({payment_method: { card: 'card' }})
                console.log("client secret " + clientSecret);
                //parent.props.stripe.c
                parent.props.stripe.confirmCardPayment(clientSecret,cards/*{
                    payment_method: {card: card}
                }*/ );
            })
            console.log(response);
        } catch (error) {
            
        }
        /*axios.get('http://localhost:8080/stripe/intent')
        .then(function (response) {
            console.log(response);
            console.log(response.data)
        } );*/
        //console.log(token);
    }

    render() {
        

        return(
            <main className="container">
 
            <form className="form-group mt-3 p-3 border rounded shadow-lg pa-form"
                onSubmit={this.handleSubmit }
                >
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Name</label>
                    <input type="text" 
                            className="form-control" 
                            id="inputName" 
                            placeholder="Name" 
                            value={ this.state.name }
                            onChange={ (e) => this.setState({ name: e.target.value }) } 
                    />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail">Email</label>
                    <input type="email" className="form-control" id="inputEmail" placeholder="Email" value={ this.state.email } onChange={ (e) => this.setState({ email: e.target.value }) } />
                </div>
            </div>
             <div className="form-group">
                <label htmlFor="inputPhone">Phone number</label>
                <input type="text" className="form-control" id="inputPhone" placeholder="+46 470 123 45" value={ this.state.phone } onChange={ (e) => this.setState({ phone: e.target.value }) } />
            </div>
            <div className="form-group">
                <label htmlFor="inputAddress">Address</label>
                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={ this.state.address } onChange={ (e) => this.setState({ address: e.target.value }) }  />
            </div>
           
            <div className="form-row">
                <div className="form-group col-md-2">
                    <label htmlFor="inputZip">Zip</label>
                    <input type="text" className="form-control" id="inputZip" value={ this.state.zipCode } onChange={ (e) => this.setState({ zipCode: e.target.value }) } />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="inputCity">City</label>
                    <input type="text" className="form-control" id="inputCity" value={ this.state.city } onChange={ (e) => this.setState({ city: e.target.value }) } />
                </div>
            </div>
            <div className="form-row">
                 <div className="form-group col-md-4">
                    <label htmlFor="inputState">State</label>
                    <input type="text" className="form-control" id="inputState" value={ this.state.statename } onChange={ (e) => this.setState({ statename: e.target.value }) } />
                </div>
                 <div className="form-group col-md-4">
                    <label htmlFor="inputCountry">Country</label>
                    <input type="text" className="form-control" id="inputCountry" placeholder="Country" value={ this.state.country } onChange={ (e) => this.setState({ country: e.target.value }) }  />
                </div>
            </div>
           
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="cardNumber">Card number</label>
                    <CardNumberElement className="form-control" id="cardNumber"/> 
                </div>
            </div> 
            <div className="form row">
                <div className="form-group col-md-3">
                    <label htmlFor="expirationDate">Expiration</label>
                    <CardExpiryElement className="form-control" id="expirationDate" />
                </div>
                <div className="form-group col-md-3">
                    <label htmlFor="cvcNumber">CVC number</label>
                    <CardCVCElement className="form-control" id="cvcNumber" />
                </div>
            </div> 
             <div className="form-group">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                    <label className="form-check-label" htmlFor="gridCheck">
                        Remember card
                    </label>
                </div>
            </div>
            <button className="btn btn-primary">Take my money!</button>
            </form>
            </main>
        );
    }
}
export default injectStripe(Form);
