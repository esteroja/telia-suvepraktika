import React, {useEffect, useRef, useState} from 'react';

const AddPerson = ({setPeople}) => {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const birthDateRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();

    function addPerson() {
        const newPerson = {
            "firstName": firstNameRef.current.value,
            "lastName": lastNameRef.current.value,
            "birthDate": birthDateRef.current.value,
            "email": emailRef.current.value,
            "phone": phoneRef.current.value,
            "address": addressRef.current.value,

        }

        fetch("http://localhost:8080/people",
            {
                "method": "POST",
                "body": JSON.stringify(newPerson),
                "headers": {"Content-Type": "application/json"}
            })
            .then(response => response.json())
            .then(json => {setPeople(json);
                firstNameRef.current.value = "";
                lastNameRef.current.value = "";
                birthDateRef.current.value = "";
                emailRef.current.value = "";
                phoneRef.current.value = "";
                addressRef.current.value = "";
            });
    }


    return (
        <div className="bg-purple-200 p-6 rounded-xl max-w-sm md:self-start self-center mt-8 md:mt-0 md:ml-6">
            <div className="text-2xl font-bold mb-4 text-gray-800">Lisa uus isik</div>
            <div className="">
                <div className="input-field">
                    <label className="input-label">Eesnimi</label>
                    <input className="input-box" placeholder="eesnimi" ref={firstNameRef}/>
                </div>
                <div className="input-field">
                    <label className="input-label">Perekonnanimi</label>
                    <input className="input-box" placeholder="perekonnanimi" ref={lastNameRef}/>
                </div>
                <div className="input-field">
                    <label className="input-label">Sünnikuupäev</label>
                    <input className="input-box" type="date" ref={birthDateRef}/>
                </div>
                <div className="input-field">
                    <label className="input-label">Email</label>
                    <input className="input-box" type="email" placeholder="email" ref={emailRef}/>
                </div>
                <div className="input-field">
                    <label className="input-label">Telefon</label>
                    <input className="input-box" placeholder="telefon" ref={phoneRef}/>
                </div>
                <div className="input-field">
                    <label className="input-label">Aadress</label>
                    <input className="input-box" placeholder="aadress" ref={addressRef}/>
                </div>
            </div>
            <div className="mt-4">
                <button className="button-style bg-indigo-400 hover:bg-indigo-600"
                        onClick={addPerson}>Lisa</button>
            </div>
        </div>
    )
}

export default AddPerson;