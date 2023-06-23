import React from "react";

const Loading = () => {
  return (
    <div className="m-5  text-center">
      <div className="spinner-grow text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: "1.5rem",
          }}
          className="text-center mt-5 px-5 py-3"
        >
          Please wait while we are fetching the helmets from server.
        </p>

        <p
          style={{
            backgroundColor: "#fee2e2",
            borderRadius: "20px",

            fontSize: "1.4rem",
          }}
          className="text-center  mt-3 p-3"
        >
          We are using free server so it may take some time. It may needs
          maximum 1 minute to load the data for first time.
        </p>
        <p
          style={{
            backgroundColor: "#f2fee2",
            borderRadius: "20px",
            fontSize: "1.2rem",
          }}
          className="text-center  mt-3 p-3"
        >
          otherwise, please check my
          <a
            style={{
              textDecoration: "none",
            }}
            className="px-2 mx-2 "
            href="https://github.com/atik65"
          >
            Github
          </a>
          profile to see the projects.
        </p>
      </div>
    </div>
  );
};

export default Loading;
