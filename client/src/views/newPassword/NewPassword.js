
import {reduxForm, Field} from 'redux-form';

import _ from 'lodash';

import PasswordField from './passwordField';

const FIELDS = [
    {
        name : 'password',
        label : 'Enter new password'
    },
    {
        name : 'match_password',
        label : 'Re-enter new password'
    }
]


const NewPassword = (props) =>{

    console.log(props.match.params.userRecordID);

    const handleSave = ( values )=> {
        console.log('values are : ', values);
    }
  
    const RenderFields = ()=>{

      return(
        _.map(FIELDS, ({name,label})=>{
          return  <div key={name} className='mb-3'>
                <Field component={PasswordField} type='password' name={name} label={label}/>
            </div>
        })
      )

    }

    return(
        <div className='new-password d-flex align-items-center'>
           
               <div className='container '>

                   <div className='row d-flex justify-content-center form-row'>

                        <div className='col form-col d-flex justify-content-center align-items-center'>

                            <form onSubmit= { props.handleSubmit( values => handleSave(values) ) }>
                                   {
                                       RenderFields()
                                   }
                                    {/* <div className='mb-3 d-flex flex-column'>
                                        <label>  Enter new password </label>
                                        <Field component='input' type='password' name='password' />
                                    </div>
                                    <div className='mb-3 d-flex flex-column'>
                                        <label>Re-enter new password</label>
                                        <Field component='input' type='password' name='match_password'  />
                                    </div> */}
                                    <button type='submit' className='btn mamovie-button'>
                                                Save 
                                    </button>
                            </form>

                        </div>

                   </div>

               </div>
        </div>
    )
}

const validate = values =>{
    const errors = {}

    if(values.match_password !== values.password){
        errors.match_password = 'Passwords don\'t match';
    }

    return errors;
}

export default  reduxForm(
    {
        form: 'newPassword',
        validate
    }
) (NewPassword); 