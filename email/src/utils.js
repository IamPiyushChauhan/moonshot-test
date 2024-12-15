export  const getDateStingFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; 
  
    return `${day}/${month}/${year} ${hours}:${minutes}${ampm}`;
};

export const getLocalStorageReadEmailData = () =>{
    const storedData = localStorage.getItem("emailReadData") || "[]";
    const localStorageReadData = JSON.parse(storedData);
    return localStorageReadData;
}

export const setLocalStorageEmailData = (data) =>{
    localStorage.setItem("emailReadData", JSON.stringify(data));
}