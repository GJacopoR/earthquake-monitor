import './App.css';
import React, {useEffect, useState} from 'react'
import Loader from './Components/UI/Loader/Loader';
import Navbar from './Components/UI/Navbar/Navbar';

function App() {

  const [day, setDay] = useState(new Date())
  const [data, setData] = useState(null)
  const [startMag, setStartMag] = useState(0)

  useEffect(() => {
    fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${formatDateISO(day)}&endtime=${getNextDay(day)}`)
    .then((response) => response.json())
    .then((data) => {setData(data.features)})
  }, [day])

  return (
    <body className="App">
      { data ? (
        <>
          <Navbar day={formatDateISO(day)} count={data.length}/>
          <main className='container-fluid px-md-5 min-vh-100'>
            <section className='row my-3 d-flex justify-content-center'>
              <div className='col-12 col-md-6 d-flex justify-content-center justify-content-md-end align-items-center'>
                <label className='fw-bold' htmlFor='start'>Start date :</label>
              </div>
              <div className='col-12 col-md-6 d-flex justify-content-center justify-content-md-start align-items-center'>
                <input className='btn btn-outline-light'
                  type='date'
                  max={formatDateISO(new Date())}
                  onChange={ (event) => setDay(new Date(event.target.value))}/>
              </div>
            </section>
          </main>
        </>
      ) : (
        <>
          <Loader />
        </>)}
    </body>
  );
}

function formatDateISO(date){
  return date.toISOString().substring(0, 10)
}

function getNextDay(date){
  let tomorrow = new Date;
  tomorrow.setDate(tomorrow.getDate()+1)
  return formatDateISO(tomorrow)
}

export default App;
