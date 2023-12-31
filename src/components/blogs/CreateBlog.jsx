import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../config";

const CreateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [postBy, setPostBy] = useState('');
  const [articleSection, setArticleSection] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const createArticle = async (e) => {
    e.preventDefault();
    const data = {
      title,
      articleSection,
      image,
      description,
      postBy
    };

    try {
      if (id) {
        await axios.put(`${baseUrl}/article/${id}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        navigate('/');
      } else {
        await axios.post(`${baseUrl}/article`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating article:', error.message);
    }
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const base64String = await convertToBase64(selectedFile);
      setImage(base64String);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const getSingleArticleData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/article/${id}`);
      setTitle(response.data.title);
      setPostBy(response.data?.postBy);
      setDescription(response.data.description);
      setArticleSection(response.data.articleSection);
    } catch (error) {
      console.error('Error fetching article:', error.message);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleArticleData();
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <form onSubmit={createArticle}>
        <div className="form-group">
          <label className="label-color" >Article Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group mt-3">
          <label className="label-color" >Select article type</label>
          <select
            className="form-control"
            id="articleSection"
            value={articleSection}
            onChange={(e) => setArticleSection(e.target.value)}
          >
            <option>Select</option>
            <option value="psychology">Psychology</option>
            <option value="history">History</option>
            <option value="social">Social</option>
            <option value="stock">Stock Market</option>
            <option value="other">Other</option>
            <option value="ambedkar">Dr. Ambedkar</option>
            <option value="napoleon">Napoleon</option>
            <option value="education">Napoleon</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <label className="label-color" >Upload file</label>
          <input
            type="file"
            className="form-control-file"
            id="image"
            multiple
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group mt-3">
          <label className="label-color" >Write an article...</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            id="editor"
            rows="8"
            placeholder="Write an article..."
            required
          ></textarea>
        </div>

        <div className="form-group mt-3">
          <label className="label-color" >Creator Name</label>
          <input
            type="text"
            className="form-control"
            id="postBy"
            value={postBy}
            onChange={(e) => setPostBy(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
