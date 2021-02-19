import { useState } from "react";


const PasswordRecovery = (props)=>{

    const [email, setEmail] = useState('');

    return (

        <div className='recover container'>
            <div className='row '>
                    <div className='col'>

                        <form>
                            <label> Enter your E-mail </label>
                            <input type='text'
                             className='form-control'
                             onChange={(e)=> setEmail(e.target.value)}
                             value={email}      
                             />
                             <button type='submit'>
                                Recover
                             </button>
                        </form>

                    </div>
            </div>
           
        </div>
    );
        
    
}

export default PasswordRecovery ;