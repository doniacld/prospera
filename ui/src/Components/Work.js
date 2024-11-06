import React from "react";
import PickMeals from "../Assets/14.png";
import ChooseMeals from "../Assets/13.png";
import DeliveryMeals from "../Assets/15.png";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Input Your Information",
      text: "Upload your CV or connect with LinkedIn, or enter your job title, location, etc.",
    },
    {
      image: ChooseMeals,
      title: "Data Retrieval",
      text: "Prospera retrieves your data, and the AI model compares your input with industry benchmarks. ",
    },
    {
      image: DeliveryMeals,
      title: "Receive Output",
      text: "Get a salary comparison and insights to help you negotiate your pay.",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
        Understand how Prospera empowers you to negotiate your salary with confidence.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;