import React, { useState, useEffect } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { server } from "../config.js";
import axios from "axios";

const Home = () => {
  const [datas, setDatas] = useState([]);
  const [effects, setEffects] = useState(true)

  const getAllData = async () => {
    let getData = await axios.get(`${server}todos`);
    let dataGot = JSON.parse(getData.data);
    let newArr = [];
    for (let i = 0; i < dataGot.length; i++) {
      let singleEle = dataGot[i];
      let monthName = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      const dateObject = new Date(singleEle.date);
      const year = dateObject.getFullYear();
      const month = monthName[dateObject.getMonth()];
      const day = dateObject.getDate();

      singleEle.date = `${day} ${month}, ${year}`;
      singleEle.srno = i + 1;
      newArr.push(singleEle);
    }

    setDatas(newArr);
  };

  const handleDelete = async (id) => {
    let deleteData = await axios.delete(`${server}todos/${id}`)
    setEffects(!effects)
  }

  useEffect(() => {
    getAllData();
  }, [effects]);

  return (
    <div className="container custom-container">
      <div className="d-flex align-items-center justify-content-between mt-2">
        <h3>CRUD Application</h3>
        <Link to="/add">
          <button className="btn btn-danger">Add Data</button>
        </Link>
      </div>
      <table className="table table-bordered table-dark table-striped  mt-2">
        <thead>
          <tr>
            <th scope="col">Sr. no</th>
            <th scope="col">Name</th>
            <th scope="col">Desc</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => {
            return (
              <tr key={data._id}>
                <th scope="row">{data.srno}</th>
                <td>{data.name}</td>
                <td>{data.desc}</td>
                <td>{data.date}</td>
                <td>
                  <Link to={`edit/${data._id}`}>
                    <button className="custom-btn edit mx-2">
                      <MdEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="custom-btn delete mx-2"
                  >
                    <RiDeleteBin5Fill />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
