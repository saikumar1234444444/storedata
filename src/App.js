import { useState } from "react";

const App = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [search, setSearch] = useState("");
  const [bio, setBio] = useState({ id: "", name: "", company: "" });

  const getName = (event) => {
    setName(event.target.value);
  };

  const getId = (event) => {
    setId(event.target.value);
  };

  const getCompany = (event) => {
    setCompany(event.target.value);
  };
  const getSearch = (event) => {
    setSearch(event.target.value);
  };

  const submitData = async (event) => {
    event.preventDefault();
    const userDetails = { id, name, company };
    const url = "/submit/";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);

    const data = await response.json();
    console.log(data.status);
    setId("");
    setName("");
    setCompany("");
  };

  //   useEffect(() => {
  //     const getName = async () => {
  //       const response = await fetch("/users/");
  //       const data = await response.json();
  //       console.log(data);
  //     };

  //     getName();
  //   }, []);

  const getDetails = async () => {
    const url = `/users/${search}/`;
    const response = await fetch(url);
    const data = await response.json();

    setBio({
      id: data.id,
      name: data.name,
      company: data.company,
    });
    console.log(bio);
  };

  return (
    <>
      <form onSubmit={submitData}>
        <input
          type="text"
          value={id}
          onChange={getId}
          placeholder="company id"
        />
        <br />
        <input
          type="text"
          value={name}
          onChange={getName}
          placeholder="username"
        />
        <br />
        <input
          type="text"
          value={company}
          onChange={getCompany}
          placeholder="company name"
        />
        <br />
        <button type="submit">submit</button>
      </form>
      <input
        type="text"
        value={search}
        onChange={getSearch}
        placeholder="search by id"
      />
      <br />
      <button type="button" onClick={getDetails}>
        search
      </button>
      {bio.id !== "" && (
        <div>
          <p>company id: {bio.id}</p>
          <p>username: {bio.name}</p>
          <p>company: {bio.company}</p>
        </div>
      )}
    </>
  );
};

export default App;
