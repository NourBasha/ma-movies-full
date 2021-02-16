import { connect } from "react-redux";
import { deleteAcc } from "../store/actions/actions";

const Profile = ({ user, deleteAccount }) => {
  const handleDelete = () => {
    deleteAccount();
  };

  return (
    <div className="profile container d-flex justify-content-center align-items-center">
      <div>
        {user ? (
          <div className=" row data d-flex justify-content-center">
            <div className=" col-10 profile-data ">
                
                    <label> Username: </label>
                    <h3 className="appText">{user.displayName}</h3>
                    <label> Email: </label>
                    <h3 className="appText">{user.email}</h3>
               
            </div>
           
            <button className="btn mamovie-button mt-2"  data-toggle="modal" data-target="#delete-modal">
              Delete Account
            </button>

            <div
              className="modal fade"
              id="delete-modal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content headings">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Are you sure?
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                      We are sad to see you go, if you proceed your watchlist and all your data will be deleted.
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-danger"   data-dismiss="modal" onClick={handleDelete}>
                     Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // /api/delete-account
    deleteAccount: () => dispatch(deleteAcc()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
