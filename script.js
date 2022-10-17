let base_url = "https://api.github.com/repos/jghen/";
let userUrl = "https://api.github.com/users/jghen/repos";

const select = document.querySelector("select");
const textarea = document.querySelector("#text-area");
const textarea2 = document.querySelector("#text-area-2");
const img = document.querySelector("img");
const iframe = document.querySelector(".frame");
const btnFetch = document.querySelector(".btn-fetch");

const getQuery = () => {
  console.log(select.value);
  return select.value;
};
getUrl = () => {
  return `${base_url}${getQuery()}`;
};

const displayInitialData = async (data, code) => {
  data.map((repo, i) => {
    const newEl = document.createElement("option");
    newEl.setAttribute("key", i);
    newEl.setAttribute("value", repo.name);
    newEl.textContent = repo.name;
    document.querySelector("#repos").appendChild(newEl);
  });
  textarea2.textContent = code;
};

const displayData = async (data, code) => {
  const { name, id } = data;
  fetch(`${base_url}${name}/commits`)
    .then((res) => res.json())
    .then((commits) => {
      const stringData = JSON.stringify({ name: name, repo_id: id, commits: commits.length, commit_messages: commits.map((c) => c.commit.message), }, undefined, 2 );
      textarea.textContent = stringData;
      textarea2.textContent = code;
      iframe.setAttribute("src", `https://jghen.github.io/${name}`);
    });
  console.log(data);
};

const fetchCode = `const options = { method: 'GET', }

const fetchData = async (url) => {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    displayData(data, fetchCode);
  } catch (error) {
    console.table(error);
  }
}

btnFetch.addEventListener("click", () => {
  let url = getUrl();
  fetchData(url, options);
});
`;

// fetch request --------------------------------------------------
const options = { method: "GET" };

const fetchInitialData = async (url, options) => {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    console.table(res);
    displayInitialData(data, fetchCode);
  } catch (error) {
    console.table("error: ", error);
  }
};

const fetchData = async (url, options) => {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    console.table(res);
    displayData(data, fetchCode);
  } catch (error) {
    console.table("error: ", error);
  }
};

fetchInitialData(userUrl);

btnFetch.addEventListener("click", () => {
  let url = getUrl();
  fetchData(url, options);
});

select.addEventListener("input", (e) => {
  query = e.target.value;
});
