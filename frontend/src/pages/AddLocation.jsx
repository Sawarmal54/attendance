import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateLocation() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ });

  const [error, setError] = useState(null)
  

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
        setError("User not logged in");
        return;
      }
  
    try {
      const res = await fetch("/api/location/addlocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formData, userRef: currentUser._id}),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      setError(null);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };




  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Add New location</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Location Name */}
        <label>
          Location Name:
          <input
            type="text"
            className="border p-3 rounded-lg"
            id="name"
            onChange={handleChange}
            required
          />
        </label>

        {/* Location Address */}
        <label>
          Location Address:
          <input
            type="text"
            className="border p-3 rounded-lg"
            id="address"
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Create Location</button>
      </form>
    </div>
  );

  }