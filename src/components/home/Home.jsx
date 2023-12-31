import { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import baseUrl from '../../config'
import { Link } from 'react-router-dom'

const Home = ({ getFromLoginData }) => {
    const [latestData, setLatestData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getLatestPost = async () => {
        setIsLoading(true)
        try {
            const getdata = await axios.get(`${baseUrl}/lates-article`)
            setLatestData(getdata?.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    const getFormat = (newDate) => {
        const timestamp = newDate;
        const date = new Date(timestamp);
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).format(date);
        return formattedDate
    }
    useEffect(() => {
        getLatestPost()

        if (localStorage.getItem("user")) {
            let localdata = localStorage.getItem("user");
            let parsedata = JSON.parse(localdata);

            getFromLoginData(parsedata);
        }

    }, [])
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className=" col d-grid">
                        <div className="d-flex left-side-btn">
                            <Link to={`/article/history`} class="btn btn-primary btn-style btnN-1" type="button">Hostory</Link>
                            <Link to={`/article/psychology`} class="btn btn-primary btn-style btnN-2" type="button">Psycology</Link>
                        </div>
                    </div>
                    <div className="col d-grid">
                        <div className="d-flex right-side-btn">
                            <Link to={`/article/stock`} class="btn btn-primary btn-style " type="button">Stock Market
                            </Link>
                            <Link to={`/article/other`} class="btn btn-primary btn-style " type="button">Other</Link>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}


            <div className='m-auto' style={{ width: "85%" }}>
                {latestData && !isLoading
                    ? latestData?.map((item, i) => (
                        i === 0 && (
                            <div className="card mt-4" key={i}>
                                <div className="card-header">
                                    <div className='d-flex justify-content-between'>
                                        <p>{item.title}</p>
                                        <p>{getFormat(item.date)}</p>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 col-md-3">
                                            {/* Image */}
                                            <img
                                                src={item.image}
                                                alt="Card Image"
                                                className="img-fluid rounded"
                                                style={{ objectFit: 'cover', maxHeight: '100%' }}
                                            />
                                        </div>
                                        <div className="col-12 col-md-9">
                                            {/* Content */}
                                            <div style={{ maxHeight: '450px', overflow: 'auto' }}>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <p className="card-text">
                                        <small className="text-muted">Posted By: {item.postBy}</small>
                                    </p>
                                </div>
                            </div>
                        )
                    ))
                    : null}
            </div>


            {/* <div className="container mt-5 mb-5">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row">

                                {
                                    latestData.map((item, i) => (
                                        (i === 0 || i === 1 || i === 2 || i === 3) && (
                                            <div key={i} className="col-md-3">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <p>{item.title}</p>
                                                    </div>
                                                    <div className="card-body">
                                                        <img src={item.image} alt="" className="d-block w-100" />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ))
                                }


                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190207/examples/carousel/carousel-1/images/lands-endslide__800x600.jpg" className="d-block w-100" alt="Second slide" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div> */}
        </>
    )
}
export default Home