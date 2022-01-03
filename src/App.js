import "./App.css";
import useGoogleSheets from "use-google-sheets";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Arrow } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import { useEffect, useState } from "react";

function App() {
  const [dataBopak, setDataBopak] = useState();
  const _plugins = [new Arrow()];
  const SHEET_ID = "1y9h4RAJ2jta2DnQv-jo2IfMUFO5wlyfGbFoxQim9v6U";
  const API_KEY = "AIzaSyBoOE2j2frgnUrF0-ukd4sHSpeGacA52ng";

  const { data, loading, error } = useGoogleSheets({
    apiKey: API_KEY,
    sheetId: SHEET_ID,
  });

  const dataBops = data[0]?.data;
  useEffect(() => {
    if (dataBops) {
      setDataBopak(dataBops);
    }
  }, [dataBops]);
  console.log(dataBops)

  if (loading) {
    return (
      <div className="App" >
        <img className="App-logo" src="hbd.png" alt="hbdbop" style={{ height: "400px", top: "18vh"}} />
      </div>
    );
  }

  if (error) {
    return <div>Error!</div>;
  }

  function NewlineText(props) {
    const text = props.text;
    const newText = text.split('\n').map(str => <p style={{ fontSize: "12px" }}>{str}</p>);
    
    return newText;
  }

  return (
    <div className="bg-bops">
      <div className="bot">
        <Flicking
          viewportTag="div"
          cameraTag="div"
          circular={false}
          plugins={_plugins}
          align={"center"}
          style={{ height: "400px", top: "25vh" }}
        >
          {dataBopak.slice(1).map((e) => (
            <div
              className="card-panel"
              style={{ height: "10rem", width: "18rem", borderRadius: "8px" }}
            >
              <div
                className="card mx-3"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{e.nama}</h5>
                  <NewlineText className="card-text" text={e.ucapan}>
                    
                  </NewlineText>
                </div>
              </div>
            </div>
          ))}
          <ViewportSlot>
            <span className="flicking-arrow-prev"></span>
            <span className="flicking-arrow-next"></span>
          </ViewportSlot>
        </Flicking>
      </div>
    </div>
  );
}

export default App;
