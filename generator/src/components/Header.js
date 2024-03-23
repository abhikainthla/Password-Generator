import {useCallback, useRef, useState} from 'react'
import { GrCopy } from "react-icons/gr";
import './Header.css';
function Header() {
    // const generatePassword = () => {
    //     const length = parseInt(document.getElementById('passwordLength').value);
    //     const includeUpperCase = document.getElementById("uppercase").checked;
    //     const includeLowerCase = document.getElementById("lowercase").checked; 
    //     const numbersIncluded = document.getElementById("numbers").checked; 
    //     const symbolsIncluded = document.getElementById("symbols").checked;
    //     const generatedPassword = document.getElementById('password');
    //     const arr = [];
    //     let password = '';
    //     if (length > 50  || length < 8) {
    //         alert('Please enter a number between  8 and 50');
    //         return;
    //     }
    //     if (includeUpperCase) {arr.push(...'ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
    //     if (includeLowerCase) {arr.push(...'abcdefghijklmnopqrstuvwxyz')}
    //     if (numbersIncluded) {arr.push(...'0123456789')}
    //     if (symbolsIncluded) {arr.push(...`!@#$%^&*()`)}
    //     if(!includeUpperCase &&!includeLowerCase &&!numbersIncluded &&!symbolsIncluded  ){
    //         alert('At least one character type must be selected');
    //         return;
    //     }
    //     for (let i=0, max=length || 8; i < max; i++ ) {
    //         const character = arr[Math.floor(Math.random() * arr.length)];
    //         password += character;
    //     }
        
    //     generatedPassword.value = password;
    //     return password;
    // }

    // const handleGenerateClick = (event) => {
    //     event.preventDefault();
    //     generatePassword();
    // }
    // const handleCopyText = (event) => {
    //     event.preventDefault();
    //     const copied = document.getElementById("copied");
    //     const generatedPassword = document.getElementById('password');
    //     navigator.clipboard.writeText(generatedPassword.value).then(()=>{
    //         copied.innerText = "Copied"
    //         setInterval(function() {
    //             copied.innerText ="";}, 3000);
    //     },err=>{
    //         console.log('Error in copying', err);
    //     })
    // }

    //-------------------- code using useRef and useCallback --------------------
   
    const [password, setPassword] = useState("");
    const [passwordLength, setPassworlength] = useState(8);
    const [includeUpperCase, setIncludeUpperCase] = useState(true);
    const [includeLowerCase, setIncludeLowerCase] = useState(true);
    const [includeNumber, setIncludeNumber] = useState(true);
    const [includeSymbol, setIncludeSymbol] = useState(true);

    const passwordRef = useRef(null);
    const copiedRef = useRef(null);
 

    function handleCopyText(){
        navigator.clipboard.writeText(password).then(() => {
            if (copiedRef.current) {
                copiedRef.current.innerText = "Copied";
                setTimeout(() => {
                    if (copiedRef.current) {
                        copiedRef.current.innerText = "";
                    }
                }, 3000);
            }
        }, err => {
            console.log('Error in copying', err);
        });
    }

    const handleGenerateClick = useCallback( () => {
            const arr = [];
        let generatedPassword = '';
        if (passwordLength > 50  || passwordLength < 8) {
            alert('Please enter a number between  8 and 50');
            return;
        }
        if (includeUpperCase) {arr.push(...'ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
        if (includeLowerCase) {arr.push(...'abcdefghijklmnopqrstuvwxyz')}
        if (includeNumber) {arr.push(...'0123456789')}
        if (includeSymbol) {arr.push(...`!@#$%^&*()`)}
        if(!includeUpperCase &&!includeLowerCase &&!includeNumber &&!includeSymbol  ){
            alert('At least one character type must be selected');
            return;
        }
        for (let i=0, max=passwordLength || 8; i < max; i++ ) {
            const character = arr[Math.floor(Math.random() * arr.length)];
            generatedPassword += character;
        }
        
        setPassword(generatedPassword);
        return generatedPassword;

    }, [passwordLength, includeLowerCase, includeNumber, includeSymbol, includeUpperCase] )
    return (
        <div>
            <div>
                <h1>Password Generator</h1>
                <p className='tagline'>Generate a strong password with just one click.</p>
                <hr />
            </div>
            <input type='text' disabled id='password' value={password} ref={passwordRef} /><button id='copyText' onClick={handleCopyText}><GrCopy /></button><p ref={copiedRef}></p>
            <div className='settings'>
                <div className='inputs' >
                    <h3>Select Password length <b>(**8-50 characters**)</b></h3>
                    <input type='checkbox' defaultChecked id='uppercase' value={includeUpperCase} onChange={()=>setIncludeUpperCase((prev) => !prev)} />
                    <label className='label'>Include Upper case</label><br/>
                    <input type='checkbox' defaultChecked id='lowercase' value={includeLowerCase} onChange={()=>setIncludeLowerCase((prev) => !prev)}  />
                    <label className='label'>Include Lower case</label><br/>
                    <input type='checkbox' defaultChecked id='numbers' value={includeNumber} onChange={()=>setIncludeNumber((prev) => !prev)}  />
                    <label className='label'>Include Numbers</label><br/>
                    <input type='checkbox' defaultChecked id='symbols' value={includeSymbol} onChange={()=>setIncludeSymbol((prev) => !prev)}  />
                    <label className='label'>Include Symbols</label><br/>
                </div>
                <div>
                    <label htmlFor="passwordLength" className='label'>Choose Password Length: &nbsp;</label>
                    <input type="number" id="passwordLength" name="passwordLength" min="8" max="50" value={passwordLength} onChange={(e)=>{setPassworlength(e.target.value)}} />
                    &nbsp;
                </div>
            </div>
            <button id='generate' onClick={handleGenerateClick}>Generate Password</button>
        </div>  
    );
}

export default Header;