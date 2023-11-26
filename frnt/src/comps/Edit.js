import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server, baseURL } from "../config.js";

let obj = {
  name: "",
  date: "",
  desc: "",
};

const Edit = () => {
  const [formValue, setFormValue] = useState(obj);
  const refName = useRef(null);
  const refDate = useRef(null);
  const refDesc = useRef(null);
  const { id } = useParams();

  const handleSetValue = (e) => {
    console.log(e.target.value);
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    let reqGo = true;

    if (formValue.name == "" || formValue.name == null) {
      reqGo = false;
      refName.current.style.display = "inline-block";
      setTimeout(() => {
        refName.current.style.display = "none";
      }, 2500);
    }
    if (formValue.date == "" || formValue.date == null) {
      reqGo = false;
      refDate.current.style.display = "inline-block";
      setTimeout(() => {
        refDate.current.style.display = "none";
      }, 2500);
    }
    if (formValue.desc == "" || formValue.desc == null) {
      reqGo = false;
      refDesc.current.style.display = "inline-block";
      setTimeout(() => {
        refDesc.current.style.display = "none";
      }, 2500);
    }

    if (reqGo) {
      let sendData = await axios.put(`${server}todos/${id}`, formValue);
      if (sendData.status == 200) {
        window.location = baseURL;
      }
    }
  };

  const getDataFromId = async () => {
    let existingData = await axios.get(`${server}todos/${id}`);
    let dataGot = JSON.parse(existingData.data);
    let date = new Date(dataGot.date);
    let formattedDate = date.toISOString().split("T")[0];
    setFormValue({ ...dataGot, date: formattedDate });
    console.log(formattedDate);
  };

  useEffect(() => {
    getDataFromId();
  }, []);

  return (
    <div className="container custom-container">
      <h2 className="my-3">Add New Todos</h2>

      <form>
        <div className="row">
          <div className="col-12 col-md-6 mb-2">
            <label className="form-input py-2" htmlFor="name">
              Todo Name
              <span className="text-danger">
                <sup>*</sup>
              </span>
              :-
            </label>
            <span
              className="text-danger"
              ref={refName}
              style={{ float: "right", display: "none" }}
            >
              This Field is Required
            </span>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              onChange={handleSetValue}
              value={formValue.name}
              required
            />
          </div>

          <div className="col-12 col-md-6 mb-2">
            <label className="form-input py-2" htmlFor="name">
              Task Date
              <span className="text-danger">
                <sup>*</sup>
              </span>
              :-
            </label>
            <span
              className="text-danger"
              ref={refDate}
              style={{ float: "right", display: "none" }}
            >
              This Field is Required
            </span>
            <input
              type="date"
              name="date"
              className="form-control"
              onChange={handleSetValue}
              value={formValue.date}
              required
            />
          </div>

          <div className="col-12 mb-2">
            <label className="form-input py-2" htmlFor="name">
              Decription
              <span className="text-danger">
                <sup>*</sup>
              </span>
              :-
            </label>
            <span
              className="text-danger"
              ref={refDesc}
              style={{ float: "right", display: "none" }}
            >
              This Field is Required
            </span>
            <textarea
              name="desc"
              className="form-control"
              onChange={handleSetValue}
              value={formValue.desc}
              rows="10"
              placeholder="Enter Some Description"
              required
            />
          </div>

          <div className="col-12 col-md-6 mt-2">
            <input
              type="submit"
              className="btn btn-danger"
              value="Update Data"
              name="submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;
