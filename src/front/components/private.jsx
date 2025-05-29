import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, []);
    return (
        <>
           <ul className="nav nav-pills mb-3 mt-5 justify-content-center" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                        <i className="fa-solid fa-table-cells"></i>
                    </button>
                </li>
                
            </ul>

            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                    <div className="card card-body">
                        <div className="row">
                            {[
                                "https://concepto.de/wp-content/uploads/2020/08/Programacion-informatica-scaled-e1724960033513-2048x1024.jpg",
                                "https://instrumentarte.com/wp-content/uploads/2017/10/consejos-guitarristas-conciertos.jpg",
                                "https://elrincondelaabuelavenezolana.com/wp-content/uploads/2018/03/el-pabellon-criollo-del-rincon-abuela-venezolana.jpg",
                                "https://ongteprotejo.org/wp-content/uploads/2014/10/adorable-chanchito-feliz.jpg",
                                "https://lacasadegestalt.es/wp-content/uploads/2022/08/Acuarela-2.jpg",
                                "https://desdelafe.mx/wp-content/uploads/2018/06/superacionpersonalaca.jpg",
                                "https://img2.rtve.es/i/?w=1600&i=01715014988019.jpg",
                                "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/10/5f/26/2c.jpg",
                                "https://concepto.de/wp-content/uploads/2020/08/Programacion-informatica-scaled-e1724960033513-2048x1024.jpg"
                            ].map((src, index) => (
                                <div key={index} className="col-sm-12 col-md-6 col-lg-4 col-xl-4 p-1">
                                    <img src={src} className="img-fluid w-100 h-100" alt={`imagen-${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

              
            </div>
           
        </>
    );
};
