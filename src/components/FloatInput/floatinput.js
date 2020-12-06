import { useState } from 'react';
import './floatinput.scss';

function FloatInput({label, onChange}){
    const [isActive, setIsActive] = useState(false);

    const onTextChange = (text) => {
        onChange(text); 
        if (text !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }

    return (
        <div className="float-label">
            <input type="email" onChange={onTextChange} />
            <label className={isActive?"Active":""} htmlFor="email">
                {label}
            </label>
        </div>
    );
}

export default FloatInput;