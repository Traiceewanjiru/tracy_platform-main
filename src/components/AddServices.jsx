import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";

const AddServices = () => {
    let [service_name, setServiceName] = useState("")
    let [service_description, setServiceDescription] = useState("")
    let [service_category, setServiceCategory] = useState("")
    let [service_image, setServiceImage] = useState("")

    let [loading, setLoading] = useState("")
    let [error, setError] = useState("")
    let [success, setSuccess] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        setLoading("Please wait....")

        try {
            const service_data = new FormData()

            service_data.append("service_name", service_name)
            service_data.append("service_description", service_description)
            service_data.append("service_category", service_category)
            service_data.append("service_image", service_image)

            const response = await axios.post("https://tracymwaniki.alwaysdata.net/api/add_service", service_data)
            console.log(response)

            if (response.status === 200) {
                setLoading("")
                setSuccess(response.data.message)

                // clear the form
                setServiceName("")
                setServiceDescription("")
                setServiceCategory("")
                setServiceImage("")
            }
        } catch (error) {
            setError(error.message)
            setLoading("")
        }

    }

    return (
        <div className="row justify-content-center mt-4">
            <Navbar />
            <div className="col-md-6 card shadow p-4">
                <h2>Add Services</h2>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter service"
                        required
                        onChange={(e) => { setServiceName(e.target.value) }}
                        value={service_name}
                    />
                    <br />
                    <textarea
                        placeholder="Enter description"
                        className="form-control"
                        rows="7"
                        required
                        onChange={(e) => { setServiceDescription(e.target.value) }}
                        value={service_description}
                    >
                    </textarea>
                    <br />
                    <select
                        className="form-select"
                        required
                        onChange={(e) => { setServiceCategory(e.target.value) }}
                    >
                        <option value="">Select Category</option>
                        <option value="depressionhub">depression hub</option>
                        <option value="maternityhub">maternity hub</option>
                        <option value="cancerhub">cancer hub</option>
                        <option value="diabeteshub">diabetes hub</option>
                    </select>
                    <br />

                    <input
                        type="file"
                        placeholder="Enter service image"
                        required
                        accept="image/*"
                        onChange={(e) => { setServiceImage(e.target.files[0]) }}
                    />
                    <br />

                    <button className="btn btn-dark">Add service</button>

                </form>
            </div>

        </div>
    );
}

export default AddServices;