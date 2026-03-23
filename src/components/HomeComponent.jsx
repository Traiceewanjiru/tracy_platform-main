import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const HomeComponent = () => {

    let [services, setServices] = useState([])
    let [loading, setLoading] = useState("")
    let [error, setError] = useState("")

    const getServices = async () => {
        setError("")
        setLoading("Please wait...")

        try {
            const response = await axios.get("https://tracymwaniki.alwaysdata.net/api/get_services")
            console.log(response)
            if (response.status === 200) {
                setLoading("")
                setServices(response.data)
            }
        } catch (error) {
            setLoading("")
            setError(error.message)

        }
    }
    const img_url = "https://tracymwaniki.alwaysdata.net/static/images/"

    useEffect(() => { getServices() }, [])
    return (
        <div className="row">
            <Navbar />
            <h2 className="text-center">Available services</h2>
            <h5 className="text-warning">{loading}</h5>
            <h5 className="text-danger">{error}</h5>
            <h5 className="text-primary p-4 m-3 " id="tracy">Depression hub</h5>
            {services.map((service) => (

                <div className="col-md-3 justify content-center mt-4">
                    <div className="card shadow card-margin">
                        <img src={img_url + service.service_image} alt="" className=" service_img mt-4" />

                        <div className="card-body">
                            <h5 className="mt-2">{service.service_name}</h5>
                            <p className="text-muted">{service.service_description}</p>
                        </div>
                    </div>

                </div>

            ))}

        </div>
    );
}

export default HomeComponent;