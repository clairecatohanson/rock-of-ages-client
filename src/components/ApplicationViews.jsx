import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../pages/Login.jsx"
import Home from "../pages/Home"
import { RockForm } from "./RockForm.jsx"
import { RockList } from "./RockList.jsx"
import { Register } from "../pages/Register.jsx"

export const ApplicationViews = () => {
  const [rocksState, setRocksState] = useState([
    {
      id: 0,
      name: "",
      type: {
        label: "Volcanic",
      },
      user: {
        first_name: "",
        last_name: "",
      },
    },
  ])

  const fetchRocksFromAPI = async (rock_list_param) => {
    const getOptions = {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rock_token")).token
        }`,
      },
    }

    let response
    if (rock_list_param == "mine") {
      response = await fetch(
        "http://localhost:8000/rocks?owner=current",
        getOptions
      )
    } else {
      response = await fetch("http://localhost:8000/rocks", getOptions)
    }
    const rocks = await response.json()
    setRocksState(rocks)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/:rock_list_param"
            element={
              <RockList rocks={rocksState} fetchRocks={fetchRocksFromAPI} />
            }
          />
          <Route
            path="/create"
            element={<RockForm fetchRocks={fetchRocksFromAPI} />}
          />
          {/* <Route
            path="/mine"
            element={
              <RockList rocks={rocksState} fetchRocks={fetchRocksFromAPI} />
            }
          /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
