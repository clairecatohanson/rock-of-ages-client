import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const RockList = ({ rocks, fetchRocks }) => {
  const { rock_list_param } = useParams()

  useEffect(() => {
    if (rock_list_param) {
      fetchRocks(rock_list_param)
    }
  }, [rock_list_param])

  const handleDelete = async (rockId) => {
    if (rock_list_param) {
      const deleteOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("rock_token")).token
          }`,
        },
      }

      const response = await fetch(
        `http://localhost:8000/rocks/${rockId}`,
        deleteOptions
      )

      if (response.status === 204) {
        await fetchRocks(rock_list_param)
      }
    }
  }

  const displayRocks = () => {
    if (rocks && rocks.length && rock_list_param) {
      return rocks.map((rock) => (
        <div
          key={`key-${rock.id}`}
          className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50"
        >
          <div>
            {rock.name} ({rock.type.label}) weighs {rock.weight} kg
          </div>
          <div>
            In the collection of {rock.user.first_name} {rock.user.last_name}
          </div>
          {rock_list_param === "mine" ? (
            <button
              className="border p-2 mt-4 bg-slate-500 text-white"
              onClick={() => {
                handleDelete(rock.id)
              }}
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      ))
    }

    return <h3>Loading Rocks...</h3>
  }

  return (
    <>
      <h1 className="text-3xl">Rock List</h1>
      {displayRocks()}
    </>
  )
}
