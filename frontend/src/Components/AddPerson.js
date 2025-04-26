import React, {useRef, useState} from 'react';

const AddPerson = ({setPeople}) => {
    const [error, setError] = useState('');

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const birthDateRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();

    const isEmailValid = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const isPhoneValid = (phone) => {
        const phonePattern = /^[0-9]+$/;
        return phonePattern.test(phone);
    };

    function addPerson(e) {
        e.preventDefault();

        if (
            !firstNameRef.current.value.trim() ||
            !lastNameRef.current.value.trim() ||
            !birthDateRef.current.value.trim() ||
            !emailRef.current.value.trim() ||
            !phoneRef.current.value.trim() ||
            !addressRef.current.value.trim()
        ) {
            setError('Kõik väljad on kohustuslikud');
            return;
        }
        if (!isEmailValid(emailRef.current.value)) {
            setError('Vale e-maili formaat');
            return;
        } else {
            setError('');
        }
        if (!isPhoneValid(phoneRef.current.value)) {
            setError('Vale telefoninumbri formaat');
            return;
        }
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
                setError('');
                alert('Uus isik on lisatud!');
            });
    }

    return (
        <div className="bg-purple-200 p-6 rounded-xl max-w-sm md:self-start self-center mt-8 md:mt-0 md:ml-6">
            <div className="text-2xl font-bold mb-4 text-gray-800">Lisa uus isik</div>
            <form>
                <div>
                    <div className="input-field">
                        <label className="input-label">Eesnimi</label>
                        <input className="input-box" placeholder="Eesnimi" ref={firstNameRef} required/>
                    </div>
                    <div className="input-field">
                        <label className="input-label">Perekonnanimi</label>
                        <input className="input-box" placeholder="Perekonnanimi" ref={lastNameRef} required/>
                    </div>
                    <div className="input-field">
                        <label className="input-label">Sünnikuupäev</label>
                        <input className="input-box" type="date" ref={birthDateRef} required/>
                    </div>
                    <div className="input-field">
                        <label className="input-label">Email</label>
                        <input className="input-box" type="email" placeholder="Email" ref={emailRef} required/>
                    </div>
                    <div className="input-field">
                        <label className="input-label">Telefon</label>
                        <input className="input-box" placeholder="Telefon" ref={phoneRef} required/>
                    </div>
                    <div className="input-field">
                        <label className="input-label">Aadress</label>
                        <input className="input-box" placeholder="Aadress" ref={addressRef} required/>
                    </div>
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}
                <div className="mt-4">
                    <button className="button-style bg-indigo-400 hover:bg-indigo-600"
                            type="submit" onClick={addPerson}>Lisa</button>
                </div>
            </form>
        </div>
    )
}

export default AddPerson;