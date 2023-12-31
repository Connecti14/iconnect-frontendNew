import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../config";
const ArticleTab=({name})=>{
    const [nepoleanData, setnepoleanData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const getnepoleanData = () => {
        setIsLoading(true)
        axios.get(`${baseUrl}/article`).then((responce) => {
            setnepoleanData(responce.data);
            setIsLoading(false)
        }).catch((error)=>{
            setIsLoading(false)
        })
    };
    const formatDate = (date) => {
        const dateString = date;
        const dateObject = new Date(dateString);

        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('en-US', options);
        return formattedDate
    }
    useEffect(() => {
        getnepoleanData();
    }, []);
    return(
        <>
          {isLoading && (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            {
                nepoleanData && nepoleanData.some(item => item.articleSection === name) ? nepoleanData.map((item,i) => (
                    <>
                        {
                            item.articleSection ==name  ?
                                <div className="card mt-4" key={i}>
                                    <div className="card-header">
                                        <div className='d-flex justify-content-between'>
                                            <p>{item.title}</p>
                                            <p>{formatDate(item.date)}</p>
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
                                </div>:''
                        }
                    </>
                ))
                    : <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <span className="sr-only">No Data Availabel</span>
                </div>
            }


        </>
    )
}
export default ArticleTab