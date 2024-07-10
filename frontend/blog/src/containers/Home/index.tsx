import React from "react";
import NavBar from "@/components/NavBar";
import Banner from "@/components/Banner";

const Home: React.FC = () => {
    return (
        <>
            <div className="home">
                <NavBar />
                <Banner/>
                {/* <div className="bg-nav w-100 h-96 text-slate-50">banner 部分</div> */}
                <div
                    className="content text-slate-50"
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "calc(100vh - 160px)",
                        backgroundColor: "#0E0E13",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    内容部分
                </div>
                <div
                    className="footer"
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "100px",
                        color: "#fff",
                        backgroundColor: "#0E0E13",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    底部内容
                </div>
            </div>
        </>
    );
};

export default Home;
