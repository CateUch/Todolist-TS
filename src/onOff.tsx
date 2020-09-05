import React, {useState} from 'react';
import { prependOnceListener } from 'process';

type PropsType ={
    onClick: (value: boolean) => void
    
}

export default function OnOff(props: PropsType) {
    console.log('onoff rendering')

    let [on, setOn] = useState<boolean>(true);
    

    const onStyle = {
        width: '20px',
        height: '30px',
        border: "1px solid black",
        display: 'inline-block',
        padding: '2px',
        backgroundColor: on ? 'lightgreen' : 'white'
    };


    const offStyle = {
        width: '20px',
        height: '30px',
        border: "1px solid black",
        display: 'inline-block',
        padding: '2px',
        marginLeft: '2px',
        backgroundColor: on ? 'white' : 'red'
    };
    const indicatorStyle = {
        width: '20px',
        height: '20px',
        border: "1px solid black",
        borderRadius: '15px',
        margin: '2px',
       //marginLeft: '2px',
        backgroundColor: on ? 'lightgreen' : 'red',
        padding: '2px',
        display: 'inline-block',
        verticalAlign: 'middle'
    };


return <div>
    <div style={onStyle} onClick={ () => { { setOn(true) } {props.onClick(true)} } }>On</div>
    <div style={offStyle} onClick={ () =>{ { setOn(false) } {props.onClick(false)} } }>Off</div>
    <div style={indicatorStyle}></div>
</div>
}