import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const HomeComponent = () => {

    let [services, setServices] = useState([])
    let [loading, setLoading] = useState("")
    let [error, setError] = useState("")
    let [depressionhub, setDepressionhub] = useState([])
    let [cancerhub, setCancerhub] = useState([])
    let [maternityhub, setMaternityhub] = useState([])
    let [diabeteshub, setDiabeteshub] = useState([])

    const getServices = async () => {
        setError("")
        setLoading("Please wait...")

        try {
            const response = await axios.get("https://tracymwaniki.alwaysdata.net/api/get_services")
            console.log(response)
            if (response.status === 200) {
                setLoading("")
                setServices(response.data)

                let depressionhub_services = response.data.filter((service) => service.service_category === "depressionhub")
                setDepressionhub(depressionhub_services)

                let cancerhub_services = response.data.filter((service) => service.service_category === "cancerhub")
                setCancerhub(cancerhub_services)

                let maternityhub_services = response.data.filter((service) => service.service_category === "maternityhub")
                setMaternityhub(maternityhub_services)

                let diabeteshub_services = response.data.filter((service) => service.service_category === "diabeteshub")
                setDepressionhub(diabeteshub_services)
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

            <h2 className="text-center my-2 p-4 bg-dark text-white">Depression hub</h2>
            {depressionhub.map((service) => (

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

            <h2 className="text-center my-2 p-4 bg-dark text-white">Cancer hub</h2>
            {cancerhub.map((service) => (

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

            <h2 className="text-center my-2 p-4 bg-dark text-white">Diabetes hub</h2>
            {depressionhub.map((service) => (

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

            <h2 className="text-center my-2 p-4 bg-dark text-white">Maternity hub</h2>
            {maternityhub.map((service) => (

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