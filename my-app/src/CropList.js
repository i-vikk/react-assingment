import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal } from "antd";

const CropList = () => {
  const [crops, setCrops] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCrop, setSelectedCrop] = useState(null);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const cropsPerPage = 10;
  //   const totalCrops = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-cache-test.leanagri.com/pop/pop_list/en/64/pop_list.json"
        );
        console.log("API Response:", response.data);
        setCrops(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
    showModal();
  };

  const showModal = () => {
    if (selectedCrop) {
      Modal.info({
        title: selectedCrop.crop_name,
        content: (
          <div>
            <img
              src={selectedCrop.thumbnails[0].image}
              alt={selectedCrop.crop_name}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ),
        onOk() {
          setSelectedCrop(null);
        },
      });
    }
  };
  //   const handlePageChange = (page) => {
  //     setCurrentPage(page);
  //   };

  const filteredCrops = crops.filter((crop) =>
    crop.crop_name?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto" }}>
      <h2>Crop List</h2>
      <div>
        <label htmlFor="filter">Filter by Crop Name:</label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Enter crop name"
        />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            style={{
              margin: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
            onClick={() => handleCropClick(crop)}
          >
            <img
              src={crop.thumbnails[0].image}
              alt={crop?.crop_name}
              style={{ width: "100%", height: "auto" }}
            />
            <p>{crop?.crop_name}</p>
            <p>Index: {crop.index}</p>
            <p>
              Service Cost:{" "}
              {crop.service_cost !== null
                ? `$${crop.service_cost}`
                : "Not available"}
            </p>
          </div>
        ))}
      </div>

      {/* <div>
        <Pagination
          current={currentPage}
          pageSize={cropsPerPage}
          total={totalCrops}
          onChange={handlePageChange}
          showTotal={(total) => `Total ${total} crops`}
        />
      </div> */}
    </div>
  );
};

export default CropList;
