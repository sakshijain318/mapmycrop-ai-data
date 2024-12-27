import React from "react";
import { Button, Container, Row } from "react-bootstrap";

const Dashboard = () => {
  const getCurrentISTDateTime = () => {
    const date = new Date();
    const options = { timeZone: "Asia/Kolkata", hour12: false };
    const formatter = new Intl.DateTimeFormat("en-US", {
      ...options,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const [
      { value: month },
      ,
      { value: day },
      ,
      { value: year },
      ,
      { value: hour },
      ,
      { value: minute },
      ,
      { value: second },
    ] = formatter.formatToParts(date);

    return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
  };

  const currentDate = getCurrentISTDateTime();
  const latitude = "18.14401096666323";
  const longitude = "74.53124013293073";

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const futureDate = addDays(getCurrentISTDateTime(), 3).toISOString().split(".")[0] + "Z"; // Date 3 days from now in ISO format

  const soilMoistureUrl = `https://api.meteomatics.com/${currentDate}P5D:PT1H/soil_moisture_index_-5cm:idx,soil_moisture_index_-15cm:idx,soil_moisture_index_-50cm:idx,soil_moisture_index_-150cm:idx/${latitude},${longitude}/html?source=mix`;

  const soilMoistureDeficitUrl = `https://api.meteomatics.com/${currentDate}P5D:PT1H/soil_moisture_deficit:mm/${latitude},${longitude}/html?source=mix`;

  const soilWaterContentUrl = `https://api.meteomatics.com/${currentDate}P5D:PT1H/volumetric_soil_water_-5cm:m3m3,volumetric_soil_water_-15cm:m3m3,volumetric_soil_water_-50cm:m3m3,volumetric_soil_water_-150cm:m3m3/${latitude},${longitude}/html?source=mix`;

  const soilTemperatureUrl = `https://api.meteomatics.com/${currentDate}--${futureDate}:PT1H/t_-5cm:C,t_-15cm:C,t_-50cm:C,t_-150cm:C/${latitude},${longitude}/html`;

  const evapoTranspirationUrl = `https://api.meteomatics.com/${currentDate}/evapotranspiration_1h:mm/90,-180_-90,180:1000x600/html`;

  const leafWetnessUrl = `https://api.meteomatics.com/${currentDate}--${futureDate}:PT30M/leaf_wetness:idx/${latitude},${longitude}/html`;

  const phytophthoraNegativePrognosisUrl = `https://api.meteomatics.com/${currentDate}P30D:P1D/phytophthora_negative:idx/${latitude},${longitude}/html`;

  return (
    <Container
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
        paddingTop: "2rem",
      }}
    >
      <Row style={{ width: "30%" }}>
        <div className="mb-3 d-flex flex-column">
          <Button
            variant="dark"
            className="m-2 py-2 px-3 fs-6 fw-bold"
            onClick={() => window.open(soilMoistureUrl, "_blank")}
          >
            Soil Moisture
          </Button>
          <Button
            variant="secondary"
            className="m-2 py-2 px-3 fs-6 fw-bold"
            onClick={() => window.open(soilMoistureDeficitUrl, "_blank")}
          >
            Soil Moisture Deficit
          </Button>
          <Button
            variant="dark"
            className="m-2 py-2 px-3 fs-6 fw-bold"
            onClick={() => window.open(soilWaterContentUrl, "_blank")}
          >
            Soil Water Content
          </Button>
          <Button
            variant="secondary"
            className="m-2 py-2 px-3 fs-6 fw-bold"
            onClick={() => window.open(soilTemperatureUrl, "_blank")}
          >
            Soil Temperature
          </Button>
          <Button
            variant="dark"
            className="m-2 py-2 px-3 fs-6 fw-bold"
            onClick={() => window.open(evapoTranspirationUrl, "_blank")}
          >
            Evapo Transpiration (ET)
          </Button>
          <Button
            variant="secondary"
            className="m-2 py-2 px-3 fs-6 fw-bold"
            onClick={() => window.open(leafWetnessUrl, "_blank")}
          >
            Leaf Wetness
          </Button>
          <Button
            variant="dark"
            className="m-2 py-2 px-3 fs-6 fw-bold"
            onClick={() =>
              window.open(phytophthoraNegativePrognosisUrl, "_blank")
            }
          >
            Phytophthora Negative Prognosis
          </Button>
        </div>
      </Row>
    </Container>
  );
};

export default Dashboard;
