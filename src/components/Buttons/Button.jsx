import { Component } from "react";
import './styles.css'
export class Button extends Component{
    render(){
        const {text, eventClick, disabled} = this.props
        return(
            <div className="button-container">
                <button 
                onClick={eventClick} 
                className='button-next'
                disabled={disabled}
                >
                    {text}
                </button>
            </div>
        

        )
    }
}