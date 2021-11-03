
import React from 'react'
import './modal.css'
import {Link} from 'react-router-dom'


function ModalForSearch({ openmodal,sresult}) {
    return (
        <>
            <div className={openmodal ? "modalContainer" : "none"}>
                {
                    sresult.map((e) => (
                        <Link className="link" to={'/mainprofile/'+e.username}>
                        <div id="svalue" className="cont">
                            {e.username}
                        </div>
                        </Link>
                    ))
                }
            </div>

        </>
    )
}

export default ModalForSearch
