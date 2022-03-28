import classes from './Navbar.module.css'

export default function Navbar(props){
    return (
        <nav className= {classes.navbar + " text-light bg-dark p-3"}>
            <div className='row d-flex align-items-center'>
                <div className='col-md-2 col-12 py-1'>
                    <button className='btn btn-outline-light rounded-pill fs-5 fw-bold'>
                        EQ-Monitor
                    </button>
                </div>
                <div className='col-md-5 col-12 py-1 text-md-center'>
                    Now watching : {props.day}
                </div>
                <div className='col-md-5 col-12 py-1 text-md-center'>
                    There were {props.count} earthquake from {props.yesterday}
                </div>
            </div>
        </nav>
    )
}