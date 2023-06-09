import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

// const initialState = {
//   name: "",
//   email: "",
//   contact: "",
// };
const AddEdit = () => {
  const [state, setState] = useState({ name: "", email: "", contact: "" });
  const { name, email, contact } = state;
  const Navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      // console.log("if condition");
      return toast.error("Please provides value into each input fields");
    } else {
      console.log("else condition");
      if (id) {
        axios
          .post(`http://localhost:5000/api/post`, {
            name,
            email,
            contact,
          })
          .then(() => {
            setState({ name: "", email: "", contact: "" });
          })
          .catch((err) => toast.error(err.response.data));
        return toast.success("Contact Added Successfully");
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            name,
            email,
            contact,
          })
          .then(() => {
            setState({ name: "", email: "", contact: "" });
            console.log(state);
            console.log("hi");
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact updateded Successfully");
      }

      setTimeout(() => Navigate("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
    console.log(state);
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name.."
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email.."
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="tel"
          id="contact"
          name="contact"
          placeholder="Your Contact Number.."
          value={contact}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
