import React from "react";
import CarSearch from "../SearchComponents/CarSearch";
import '../SearchComponents/SearchBar.css';
import './ComparisonSearch.css';

const ComparisonSearch = () => {

    return (
        <div className="Search">
            <CarSearch carHeading = "Car 1"/>
            <button className="glow-on-hover"> Compare Cars </button>
            <CarSearch carHeading = "Car 2" />

        </div>
    );
}

export default ComparisonSearch;