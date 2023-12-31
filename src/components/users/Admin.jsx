import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from '../../config';


const Admin = () => {
    const [latestArticle, setlatestArticle] = useState([]);
const navigate=useNavigate()
    const getlatestArticle = () => {
        axios.get(`${baseUrl}/article`).then((response) => {
            setlatestArticle(response.data);
        });
    };

    const formatDate = (date) => {
        const dateString = date;
        const dateObject = new Date(dateString);

        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('en-US', options);
        return formattedDate
    }

    const deleteArticle = async (id) => {
        await axios.delete(`${baseUrl}/delete-article/` + id);
        getlatestArticle();
    }

    useEffect(() => {
        getlatestArticle();
    }, []);
    useEffect(()=>{
        if (!localStorage.getItem("user")) {
            navigate('/')
        }
          },[])

    return (
        <div className="container mt-5">
            {latestArticle.length > 0 ? (
                latestArticle.map((item) => (
                    <div key={item._id} className="card mb-4">
                        <div className="card-header bg-gray-200">
                            <div className="d-flex justify-content-between">
                                <h1 className="text-3xl font-bold">{item.title}</h1>
                                <h1 className="date-style">{formatDate(item.date)}</h1>
                            </div>
                        </div>

                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src={item.image}
                                    alt="Blog Thumbnail"
                                    className="w-100 h-100 object-cover object-center"
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <p className="card-text">{item.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer bg-gray-200 d-flex justify-content-between">
                            <p className="text-sm text-gray-500">Post By: {item?.postBy}</p>
                            <div className='flex'>
                                <button onClick={() => deleteArticle(item._id)} className="btn btn-danger">
                                    Delete
                                </button>
                                <Link to={`/create/${item._id}`} className="btn btn-primary mx-3">
                                    Update
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}

export default Admin;
