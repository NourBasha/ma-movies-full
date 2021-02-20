//
const PasswordField = ({ input, label, meta: { error, touched } }) => {


    return (
      <div className="field">

            <span >
               <label className='d-block'> {label} </label>
               <input type='password' {...input} />
            </span>
            <div className="error-message text-danger" style={{fontSize:'12px', margin:'2px'}}>{touched && error}</div>

        {/* {label === "Recipients\u2019 List"
          ? [
             <span key={label}>
                <label>{label}</label>,
              <input {...input} placeholder="Comma separated E-mails" />
             </span>,
            ]
          : [
            <span key={label}>
               <label>{label}</label>, <input {...input} />
            </span>
          ]}

  
        <div className="error-message">{touched && error}</div> */}
      </div>
    );
  };
  
  export default PasswordField;
  