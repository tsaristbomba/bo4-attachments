import React, { useState, useEffect } from "react";

function Home() {
  const [data, setData] = useState([]);
  const [selected, setSelect] = useState("");

  const ENDPOINT = process.env.REACT_APP_DB_HOST;

  useEffect(() => {
    fetchGuns();
  }, []);

  const fetchGuns = async () => {
    try {
      const response = await fetch(ENDPOINT);
      const json = await response.json();
      setData(json.BO4.guns.primary["assault-rifles"]);
      //console.log(json.BO4.guns.primary["assault-rifles"]["AN-94"].image);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <form>
          <select
            onChange={(e) => setSelect(e.target.value)}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Select a gun
            </option>
            {data ? (
              data.map((gun) => {
                return (
                  <option value={gun.id} key={gun.id}>
                    {" "}
                    {gun.name}{" "}
                  </option>
                );
              })
            ) : (
              <option>...</option>
            )}
          </select>
        </form>
      </div>
      <div className="attachments">
        <div className="gun">
          {selected !== "" && (
            <img
              className="gun-weapon"
              src={data[selected].image}
              alt={data[selected].name}
            />
          )}
        </div>
        <div className="optics">
          {selected !== "" && <p>Optics</p>}
          {selected !== "" &&
            data[selected].attachments.optics.map((data, key) => (
              <img
                className="optics-att"
                key={key}
                src={data.image}
                alt={data.name}
              />
            ))}
        </div>
        <div className="other">
          {selected !== "" && <p>Other</p>}
          {selected !== "" &&
            data[selected].attachments.other.map((data, key) => (
              <img
                className="other-att"
                key={key}
                src={data.image}
                alt={data.name}
              />
            ))}
        </div>
        <div className="om">
          {selected !== "" && data[selected].attachments["operator-mod"] && (
            <p>Operator Mod</p>
          )}
          {selected !== "" && data[selected].attachments["operator-mod"] && (
            <img
              className="om-att"
              src={data[selected].attachments["operator-mod"].image}
              alt={data[selected].attachments["operator-mod"].name}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
