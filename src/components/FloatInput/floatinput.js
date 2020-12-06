import { useState } from 'react';
import './floatinput.scss';

function FloatInput({label, onChange, defaultValue, rows}){
    const [isActive, setIsActive] = useState(defaultValue?true:false);

    const onTextChange = (event) => {
        const text = event.target.value;
        if (text !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
        onChange(text)
    }

    return (
        <div className="float-label">
            {rows?
                <div className="textareaWrapper">
                    <textarea rows={`${rows}`} onChange={onTextChange} defaultValue={defaultValue}/>
                </div>
            :
                <input onChange={onTextChange} defaultValue={defaultValue}/>
            }
            <label className={isActive?"Active":""} htmlFor="email">
                {label}
            </label>
        </div>
    );
}

export default FloatInput;