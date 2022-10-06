import Sidebar from "./Sidebar";
import Loader from "./Loader";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePhoneAction } from "../store/asyncMethods/ProfileMethods";
import toast, { Toaster } from 'react-hot-toast';
import { RESET_PROFILE_ERRORS } from "../store/types/ProfileTypes";
import { useHistory } from "react-router-dom";
const UpdatePhone = () => {
    const { user: { phone, _id } } = useSelector((state) => state.AuthReducer);
    const { redirect, loading } = useSelector((state) => state.PostReducer);
    const { updateErrors } = useSelector((state) => state.UpdateName);
    const [userPhone, setUserPhone] = useState('');
    const dispatch = useDispatch();
    const { push } = useHistory();

    useEffect(() => {
        setUserPhone("");
    }, [])

    const updatePhoneMethod = (e) => {
        e.preventDefault();
        dispatch(updatePhoneAction({ phone: userPhone, id: _id }));
    }

    useEffect(() => {
        if (updateErrors.length !== 0) {
            updateErrors.map((error) => {
                toast.error(error.msg);
            })
            dispatch({ type: RESET_PROFILE_ERRORS });
        }
    }, [updateErrors]);

    useEffect(() => {
        if (redirect) {
            push('/dashboard');
        }
    }, [redirect]);

    return !loading ? <div className="container mt-96">
        <Helmet>
            <title>Update Contact Number</title>
            <meta
                name="description"
                content="Update Contact Number"
            />
        </Helmet>
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
                style: {
                    border: '1px solid #713200',
                    fontSize: "0.8rem"
                },
            }}
        />
        <div className="row ml-minus-16 mr-minus-16">
            <div className="col-4" style={{ padding: "1rem" }}>
                <Sidebar />
            </div>

            <div className="col-8" style={{ padding: "1rem" }}>
                <div className="card__h3">Update Contact Number</div>
                <div className="group">
                <div className="card__h3__small">Your Previous Contact Number</div>
                    <input type="text"
                        className="group__control"
                        // placeholder="Enter Your New Name"
                        // onChange={(e) => setUserName(e.target.value)}
                        value={phone}
                    />
                </div>
                <form onSubmit={updatePhoneMethod}>
                    <div className="group">
                    <div className="card__h3__small">Enter Your New Contact Number</div>
                        <input type="text"
                            name = "phone"
                            className="group__control"
                            placeholder="Enter Your New Email"
                            onChange={(e) => setUserPhone(e.target.value)}
                            value={userPhone}
                        />
                    </div>
                    <div className="group">
                        <input style={{ width: "30%" }} type="submit" className="btn" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    </div> : <Loader />
}

export default UpdatePhone;