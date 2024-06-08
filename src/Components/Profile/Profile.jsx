import React from 'react';
import './Profile.css'

function Profile() {
    const login = sessionStorage.getItem('login');

    return (
        <>

            <section className='Profile-section'>
                <div className="Profile-container">

                    {login === true ? (
                        <>

                        </>
                    ) : (
                        <p>Please log in to view your profile.</p>
                    )}
                </div>
            </section >
        </>
    );
}

export default Profile;
