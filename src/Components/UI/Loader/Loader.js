import classes from './Loader.module.css'

export default function Loader(){
    return(
        <main className='d-flex justify-content-center align-items-center vh-100'>
            <div className={classes.ldsRipple + ' '}><div></div><div></div></div>
        </main>
    )
}