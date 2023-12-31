import { useState } from "react";
import "./BlogSection.css";
import ArticleTab from "../article/ArticleTab";

const BlogSection = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
     <div className="container">
                <div className="row mt-5">
                    <div className=" col d-grid">
                        <div className="d-flex left-side-btn">
                            <button  onClick={() => handleTabClick(1)} class="btn btn-primary btn-style btnN-1" type="button">Napolean</button>
                            <button onClick={() => handleTabClick(2)} class="btn btn-primary btn-style btnN-2" type="button">Dr. Ambedkar</button>
                            <button onClick={() => handleTabClick(3)} class="btn btn-primary btn-style " type="button">Education
                            </button>
                            <button onClick={() => handleTabClick(4)}  class="btn btn-primary btn-style " type="button">Other</button>
                            {/* <button onClick={() => handleTabClick(5)}  class="btn btn-primary btn-style " type="button">Other</button> */}
                       
                        </div>
                    </div>
                    {/* <div className="col d-grid">
                        <div className="d-flex right-side-btn">
                            <button class="btn btn-primary btn-style " type="button">Stock Market
                            </button>
                            <button class="btn btn-primary btn-style " type="button">Other</button>
                        </div>
                    </div> */}
                </div>
            </div>
            {activeTab === 1 && <ArticleTab name='napoleon' />}
            {activeTab === 2 && <ArticleTab name='ambedkar' />}
            {activeTab === 3 && <ArticleTab name='education' />}
            {activeTab === 4 && <ArticleTab name='other' />}
            {/* {activeTab === 5 && <ArticleTab name='other' />} */}
    </>
  );
};

export default BlogSection;
