import './App.css';
import React, {useEffect, useState} from 'react'
import Loader from './Components/UI/Loader/Loader';
import Navbar from './Components/UI/Navbar/Navbar';
import BarChart from './Components/UI/BarChart/BarChart';

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
          <Navbar day={formatDateISO(day)}
          yesterday={getPreviousDay(day)}
          count={data.length}/>
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
            <section className='row my-3 d-flex justify-content-center'>
              <div className='col-12 col-md-6 d-flex justify-content-center justify-content-md-end align-items-center'>
                <label className='fw-bold' htmlFor='start'>Start magnitude :</label>
              </div>
              <div className='col-12 col-md-6 d-flex justify-content-center justify-content-md-start align-items-center'>
                <input className='btn btn-outline-light'
                  type='number'
                  min='0'
                  max='9'
                  onChange={ (event) => setStartMag(event.target.value)}/>
              </div>
            </section>
            <section className='row min-vh-100'>
              <div className='col-12 col-md-6 py-1'>
                <BarChart data={data}/>
              </div>
              <div className='col-12 col-md-6 py-1'>
                
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
  let tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate()+1)
  return formatDateISO(tomorrow)
}

function getPreviousDay(date){
  let yesterday = new Date(date)
  yesterday.setDate(yesterday.getDate()-1)
  return formatDateISO(yesterday)
}

export default App;
