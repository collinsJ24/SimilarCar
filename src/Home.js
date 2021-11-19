import ComparisonComponent from "./CarComparison/ComparisonComponent";
import Title from "./Title";


const Home = (props) => {

    const setVINDetails = (vin) => {
        props.VIN(vin);
    }

return (
    <div className="App">
    <Title setVINDetails2 = {setVINDetails}/>
    <ComparisonComponent/>
    </div>
)
}

export default Home;