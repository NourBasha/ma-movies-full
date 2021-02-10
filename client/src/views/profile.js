import {connect} from 'react-redux';

const Profile = ({user}) =>{
    return(
        <div className='profile container d-flex justify-content-center align-items-center'>
            <div >
                   {
                   window.localStorage.getItem('username') !== ''
                    ?
                        (<div className='profile-data'> 
                             <label> Username: </label>
                             <h3 className='appText'>{user.displayName}</h3>
                             <label> Email: </label>
                             <h3 className='appText' >{user.email}</h3>
                            
                        </div>)
                    :null
                    }
            </div>
        </div>
    )
}

const mapStateToProps = ({auth}) =>{
    return{
        user: auth.user
    }
}



export default connect(mapStateToProps) (Profile);