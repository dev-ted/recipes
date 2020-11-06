import React, { useState } from 'react';
import Axios from 'axios';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import Recipe from './components/Recipe';
import { v4 as uuidv4 } from 'uuid';
import Alert from './components/Alert'

function App() {

    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [alert, setAlert] = useState("");
    const APP_ID = "4e9f05eb";
    const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";

    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const getData = async () => {
        if(query !== ""){
            const results = await Axios.get(url);
            if(!results.data.more){
                return setAlert("No food with such name");
            }
            setRecipes(results.data.hits);
            console.log(results);
            setAlert("");
            setQuery("");
        }
        else{
            setAlert("please type a food name")
        }
        
    };
    const onChange = e => {
        setQuery(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();
        getData();
    }

    return (
        <div className=" container">
            <div className="App">
            <div className="col-md-6">
            <h1 >Fit n Fab Recipes</h1>
            <form className="search-form" onSubmit={onSubmit}
            >
                {alert !== "" && <Alert alert ={alert} />}
                <input type="text" placeholder="Search food" autoComplete="off"
                    onChange={onChange} value={query} />
                <input type="submit" value="Search" />
            </form>
            <div className="recipes">
                {recipes !== [] &&
                    recipes.map(recipe =>
                        <Recipe key={uuidv4()} recipe={recipe} />)}
            </div>
            </div>
            </div>
           
            
        </div>
    )
}

export default App
